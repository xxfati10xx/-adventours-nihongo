'use client';
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, collection, onSnapshot } from 'firebase/firestore';
import { auth, db, appId, MASTER_SEED } from '@/lib/firebase';

import Header from '@/components/layout/Header';
import MobileFooter from '@/components/layout/MobileFooter';
import Translator from '@/components/features/Translator';
import Chat from '@/components/features/Chat';
import Dictionary from '@/components/features/Dictionary';
import GrammarManual from '@/components/features/GrammarManual';
import { ArrowRightLeft, MessageCircle, BookA, Layers } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState(null);
  const [dictionary, setDictionary] = useState([]);
  const [grammarManual, setGrammarManual] = useState({});
  const [inputText, setInputText] = useState('Sensei leer libro');
  const [activeTab, setActiveTab] = useState('inicio');
  const [search, setSearch] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [messages, setMessages] = useState([{
    role: 'assistant',
    text: 'Sensei, la interfaz ha sido purificada. Un diseño comercial y minimalista para un aprendizaje sin distracciones.'
  }]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await signInAnonymously(auth);
      } catch (err) { console.error("Auth Fail", err); }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const vocabRef = collection(db, 'artifacts', appId, 'public', 'data', 'vocabulary');
    const grammarRef = collection(db, 'artifacts', appId, 'public', 'data', 'grammar');

    const unsubVocab = onSnapshot(vocabRef, (snapshot) => {
      if (snapshot.empty) {
        MASTER_SEED.VOCABULARY.forEach(item => {
          const id = (item.romaji || item.esp).replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
          setDoc(doc(vocabRef, id || Math.random().toString(36).substr(2, 9)), item);
        });
        setDictionary(MASTER_SEED.VOCABULARY);
      } else {
        const data = snapshot.docs.map(doc => doc.data());
        setDictionary(data);
      }
    });

    const unsubGrammar = onSnapshot(grammarRef, (snapshot) => {
      const data = {};
      snapshot.docs.forEach(doc => { data[doc.id] = doc.data(); });
      setGrammarManual(data);
      if (snapshot.empty) {
        Object.entries(MASTER_SEED.GRAMMAR).forEach(([key, val]) => {
          setDoc(doc(grammarRef, key), val);
        });
      }
    });

    return () => { unsubVocab(); unsubGrammar(); };
  }, [user]);

  const result = useMemo(() => {
    const dictMap = new Map();
    MASTER_SEED.VOCABULARY.forEach(item => {
      dictMap.set(item.esp.toLowerCase(), item);
      if (item.romaji) dictMap.set(item.romaji.toLowerCase(), item);
    });
    dictionary.forEach(item => {
        if (item && item.esp) dictMap.set(item.esp.toLowerCase(), item);
        if (item && item.romaji) dictMap.set(item.romaji.toLowerCase(), item);
    });
    const currentDict = Array.from(dictMap.values());

    const cleanText = inputText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[.,!?¿¡]/g, " ");
    const words = cleanText.split(/\s+/).filter(w => w.length > 0);

    let subjects = [];
    let objects = [];
    let verbs = [];
    let desglose = [];
    let reglasAplicadas = [];

    words.forEach((word) => {
      // Try to find an exact match first
      let match = currentDict.find(d => d.romaji && d.romaji.toLowerCase() === word);
      if (!match) {
        match = currentDict.find(d => d.claves && d.claves.some(c => String(c).toLowerCase() === word));
      }

      if (match) {
        const item = { ...match, status: 'found' };
        desglose.push(item);

        if (match.categoria === "Verbos" || match.tipo === "Verbos") {
          verbs.push(match.romaji);
        } else if (match.categoria === "Sustantivo" || ["Negocios", "Leyes", "Cognición", "Tiempo", "Empresa", "Sociedad", "Persona", "Objeto"].includes(match.tipo)) {
          if (subjects.length === 0) {
            subjects.push(match.romaji);
            reglasAplicadas.push({ id: 'N5-WA', title: 'Partícula WA', desc: 'Marca el tema principal.' });
          } else {
            objects.push(match.romaji);
            reglasAplicadas.push({ id: 'N5-O', title: 'Partícula O', desc: 'Marca el objeto directo.' });
          }
        } else {
          objects.push(match.romaji);
        }
      } else {
        if (['la', 'el', 'los', 'las'].includes(word)) {
          desglose.push({ esp: word, tipo: "Articulo", status: 'found', romaji: "" });
        } else if (word === 'y') {
          desglose.push({ romaji: "to", esp: "Conector", tipo: "GRAMATICA", status: 'found' });
        } else {
          desglose.push({ esp: word, status: 'missing' });
          objects.push(`[${word}?]`);
        }
      }
    });

    let oracionFinal = [];
    if (subjects.length > 0) {
      oracionFinal.push(subjects[0]);
      oracionFinal.push("wa");
    }

    if (objects.length > 0) {
      objects.forEach((obj, idx) => {
        oracionFinal.push(obj);
        if (idx === objects.length - 1 && verbs.length > 0) {
          oracionFinal.push("o");
        }
      });
    }

    if (verbs.length > 0) {
      oracionFinal.push(verbs[0]);
    } else if (subjects.length > 0 || objects.length > 0) {
      oracionFinal.push("desu");
      desglose.push({ romaji: "desu", esp: "Ser/Estar", tipo: "GRAMATICA", status: 'found' });
      reglasAplicadas.push({ id: 'N5-DESU', title: 'Cópula DESU', desc: 'Termina oraciones afirmativas.' });
    }

    const uniqueRules = Array.from(new Set(reglasAplicadas.map(a => a.title)))
      .map(title => reglasAplicadas.find(a => a.title === title));

    return { oracion: oracionFinal.join(" ") + (oracionFinal.length > 0 ? "。" : ""), desglose, uniqueRules };
  }, [inputText, dictionary]);

  const generateLocalResponse = (input) => {
    const cleanInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[.,!?¿¡]/g, "");
    const inputWords = cleanInput.split(/\s+/).filter(w => w.length > 0);

    // Search Vocabulary
    const foundWords = dictionary.filter(d =>
      inputWords.some(word => d.claves && d.claves.some(c => String(c).toLowerCase() === word))
    ).slice(0, 5);

    // Search Grammar
    const foundGrammar = Object.values(grammarManual).filter(g =>
      inputWords.some(word =>
        g.regla.toLowerCase().includes(word) ||
        (g.detalles && g.detalles.some(d => d.toLowerCase().includes(word)))
      )
    ).slice(0, 3);

    if (foundWords.length === 0 && foundGrammar.length === 0) {
      return "Sensei medita sobre tus palabras. Mi biblioteca interna no encuentra una conexión directa en este momento, pero te animo a seguir practicando las bases.";
    }

    let response = "He consultado los pergaminos internos. Esto es lo que he encontrado para ti: \n\n";

    if (foundWords.length > 0) {
      response += "**Vocabulario:**\n" + foundWords.map(w => `- ${w.esp}: ${w.romaji}`).join("\n") + "\n\n";
    }

    if (foundGrammar.length > 0) {
      response += "**Sabiduría Gramatical:**\n" + foundGrammar.map(g => `- ${g.regla}: ${g.detalles[0]}`).join("\n");
    }

    response += "\n\n*Nota: La conexión espiritual con Gemini está ausente. Utilizo mi conocimiento local para guiarte.*";
    return response;
  };

  const handleChat = async () => {
    if (!chatInput.trim() || isTyping) return;
    const userMsg = chatInput;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setIsTyping(true);

    const geminiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
    const deepseekKey = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY || "";
    const systemPrompt = "Eres el Gran Maestro de AdventoursCR Nihongo. Responde basándote en 10,000 términos y 1,000 reglas N5-N1. Tono zen comercial.";

    const tryGemini = async (model) => {
      const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMsg }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] }
        })
      });
      if (!resp.ok) throw new Error(`Gemini ${model} Error`);
      const data = await resp.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text;
    };

    const tryDeepSeek = async () => {
      const resp = await fetch("https://api.deepseek.com/chat/completions", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${deepseekKey}`
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userMsg }
          ],
          stream: false
        })
      });
      if (!resp.ok) throw new Error("DeepSeek Error");
      const data = await resp.json();
      return data.choices?.[0]?.message?.content;
    };

    try {
      let aiResponse;
      if (geminiKey) {
        try {
          aiResponse = await tryGemini('gemini-2.0-flash');
        } catch (e20) {
          try {
            aiResponse = await tryGemini('gemini-1.5-flash');
          } catch (e15) {
            console.warn("Gemini fallbacks failed", e15);
          }
        }
      }

      if (!aiResponse && deepseekKey) {
        try {
          aiResponse = await tryDeepSeek();
        } catch (eds) {
          console.warn("DeepSeek fallback failed", eds);
        }
      }

      if (aiResponse) {
        setMessages(prev => [...prev, { role: 'assistant', text: aiResponse }]);
      } else {
        throw new Error("All AI tiers failed");
      }
    } catch (e) {
      const localMsg = generateLocalResponse(userMsg);
      setMessages(prev => [...prev, { role: 'assistant', text: localMsg }]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 relative overflow-x-hidden pb-24 md:pb-8 ${isDarkMode ? 'bg-[#121212] text-[#E0E0E0]' : 'bg-[#FAF7F2] text-[#2C3E50]'}`}>

      <div className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-700 ${isDarkMode ? 'opacity-[0.05]' : 'opacity-[0.03]'}`} style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M0 50 C 0 25, 25 0, 50 0 C 75 0, 100 25, 100 50 C 100 75, 75 100, 50 100 C 25 100, 0 75, 0 50 Z M 10 50 C 10 70, 30 90, 50 90 C 70 90, 90 70, 90 50 C 90 30, 70 10, 50 10 C 30 10, 10 30, 10 50 Z' fill='${isDarkMode ? '%23D4AF37' : '%23bc2424'}' /%3E%3C/svg%3E")`, backgroundSize: '60px 60px' }}></div>

      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <main className="max-w-4xl mx-auto p-4 md:p-8 space-y-6 relative z-10">

        <div className="hidden md:flex justify-end gap-3 py-2">
          {[
            { id: 'inicio', Icon: ArrowRightLeft, label: 'Traductor' },
            { id: 'chat', Icon: MessageCircle, label: 'Maestro' },
            { id: 'diccionario', Icon: BookA, label: 'Librería' },
            { id: 'gramatica', Icon: Layers, label: 'Manual' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-2 rounded-full font-black text-[12px] uppercase tracking-widest transition-all border-2 ${activeTab === tab.id ? (isDarkMode ? 'bg-[#D4AF37] text-black border-white shadow-xl' : 'bg-[#BC2424] text-[#FAF7F2] border-[#8B1A1A] shadow-lg') : (isDarkMode ? 'bg-[#2D2D2D] text-gray-500 border-[#3D3D3D]' : 'bg-white text-slate-400 border-slate-100 hover:bg-[#FDFBF7]')}`}
            >
              <tab.Icon size={16} /> {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'inicio' && <Translator inputText={inputText} setInputText={setInputText} result={result} isDarkMode={isDarkMode} />}
        {activeTab === 'chat' && <Chat messages={messages} chatInput={chatInput} setChatInput={setChatInput} handleChat={handleChat} isTyping={isTyping} chatEndRef={chatEndRef} isDarkMode={isDarkMode} />}
        {activeTab === 'diccionario' && <Dictionary dictionary={dictionary} search={search} setSearch={setSearch} isDarkMode={isDarkMode} />}
        {activeTab === 'gramatica' && <GrammarManual grammarManual={grammarManual} isDarkMode={isDarkMode} />}
      </main>

      <MobileFooter activeTab={activeTab} setActiveTab={setActiveTab} isDarkMode={isDarkMode} />
    </div>
  );
}
