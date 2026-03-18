'use client';
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, collection, onSnapshot, updateDoc, getDocs, query, limit } from 'firebase/firestore';
import { auth, db, appId, MASTER_SEED } from '@/lib/firebase';

import Header from '@/components/layout/Header';
import MobileFooter from '@/components/layout/MobileFooter';
import Mascot from '@/components/layout/Mascot';
import Translator from '@/components/features/Translator';
import Chat from '@/components/features/Chat';
import Dictionary from '@/components/features/Dictionary';
import GrammarManual from '@/components/features/GrammarManual';
import Flashcards from '@/components/features/Flashcards';
import HistoryList from '@/components/features/History';
import Bushido from '@/components/features/Bushido';
import { ArrowRightLeft, MessageCircle, BookA, Layers, Brain, History, Trophy } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState(null);
  const [userStats, setUserStats] = useState({
    xp: 0,
    streak: 0,
    lastActivity: null,
    belt: 'Blanco',
    history: []
  });
  const [userProgress, setUserProgress] = useState({});
  const [dictionary, setDictionary] = useState([]);
  const [grammarManual, setGrammarManual] = useState({});
  const [inputText, setInputText] = useState('Sensei leer libro');
  const [activeTab, setActiveTab] = useState('inicio');
  const [search, setSearch] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hankoVisible, setHankoVisible] = useState(false);
  const [hankoText, setHankoText] = useState('N5');

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
    const initData = async () => {
      // 1. Load from LocalStorage immediately for instant UX
      const cachedVocab = localStorage.getItem('adventours_vocab');
      const cachedGrammar = localStorage.getItem('adventours_grammar');
      const cachedVersion = localStorage.getItem('adventours_version');

      if (cachedVocab) setDictionary(JSON.parse(cachedVocab));
      if (cachedGrammar) setGrammarManual(JSON.parse(cachedGrammar));

      // 2. Wait for user auth before checking server
      if (!user) return;

      const metadataRef = doc(db, 'artifacts', appId, 'public', 'metadata');
      const vocabRef = collection(db, 'artifacts', appId, 'public', 'data', 'vocabulary');
      const grammarRef = collection(db, 'artifacts', appId, 'public', 'data', 'grammar');

      try {
        const metaSnap = await getDoc(metadataRef);
        const serverVersion = metaSnap.exists() ? metaSnap.data().version : '0.0.0';

        // 3. Compare versions using localStorage directly to avoid state lag
        if (serverVersion !== cachedVersion || !cachedVocab) {
          console.log("Sincronizando biblioteca con el servidor (Nueva versión detected o caché vacío)...");

          const [vocabSnap, grammarSnap] = await Promise.all([
            getDocs(vocabRef),
            getDocs(grammarRef)
          ]);

          let finalVocab = [];
          if (vocabSnap.empty) {
            finalVocab = MASTER_SEED.VOCABULARY;
            // Seed if empty (careful with 10k items, better in chunks/background)
            MASTER_SEED.VOCABULARY.forEach(item => {
              const id = (item.romaji || item.esp).replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
              setDoc(doc(vocabRef, id), item);
            });
          } else {
            finalVocab = vocabSnap.docs.map(d => d.data());
          }
          setDictionary(finalVocab);
          localStorage.setItem('adventours_vocab', JSON.stringify(finalVocab));

          let finalGrammar = {};
          if (grammarSnap.empty) {
            finalGrammar = MASTER_SEED.GRAMMAR;
            Object.entries(MASTER_SEED.GRAMMAR).forEach(([key, val]) => {
              setDoc(doc(grammarRef, key), val);
            });
          } else {
            grammarSnap.docs.forEach(d => { finalGrammar[d.id] = d.data(); });
          }
          setGrammarManual(finalGrammar);
          localStorage.setItem('adventours_grammar', JSON.stringify(finalGrammar));

          localStorage.setItem('adventours_version', serverVersion || APP_VERSION);

          if (!metaSnap.exists()) {
            await setDoc(metadataRef, { version: APP_VERSION, last_updated: new Date().toISOString() });
          }
        } else {
          console.log("Biblioteca cargada localmente. Ahorro de lecturas Firebase: 100%.");
        }
      } catch (err) {
        console.error("Error sincronizando datos:", err);
      }
    };

    if (!user) return;

    const userDocRef = doc(db, 'artifacts', appId, 'users', user.uid);
    const progressRef = collection(db, 'artifacts', appId, 'users', user.uid, 'progress');

    const unsubUser = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();

        // Streak Logic
        const now = new Date();
        const last = data.lastActivity ? new Date(data.lastActivity) : null;
        let newStreak = data.streak || 0;

        if (last) {
          const diffDays = Math.floor((now - last) / (1000 * 60 * 60 * 24));
          if (diffDays === 1) {
             // Streak continues (but only increment if it's a new day, we'll do this on action)
          } else if (diffDays > 1) {
            newStreak = 0; // Streak broken
            updateDoc(userDocRef, { streak: 0 });
          }
        }

        setUserStats(prev => ({ ...prev, ...data, streak: newStreak }));
      } else {
        setDoc(userDocRef, {
          xp: 0,
          streak: 0,
          lastActivity: new Date().toISOString(),
          belt: 'Blanco',
          history: []
        });
      }
    });

    // Only fetch a subset of progress to avoid 10k docs issue
    const fetchProgress = async () => {
      const q = query(progressRef, limit(100)); // Limit for performance, real SRS would use date queries
      const snapshot = await getDocs(q);
      const progress = {};
      snapshot.docs.forEach(doc => { progress[doc.id] = doc.data(); });
      setUserProgress(progress);
    };
    fetchProgress();

    return () => { unsubVocab(); unsubGrammar(); unsubUser(); };
  }, [user]);

  const saveHistory = async (original, translation, uniqueRules) => {
    if (!user) return;
    const userDocRef = doc(db, 'artifacts', appId, 'users', user.uid);
    const historyItem = {
      original,
      oracion: translation,
      uniqueRules,
      timestamp: new Date().toISOString()
    };

    // Maintain only last 20
    const newHistory = [...(userStats.history || []), historyItem].slice(-20);

    const now = new Date();
    const last = userStats.lastActivity ? new Date(userStats.lastActivity) : null;
    let newStreak = userStats.streak || 0;

    if (!last || Math.floor((now - last) / (1000 * 60 * 60 * 24)) === 1) {
      newStreak += 1;
    }

    await updateDoc(userDocRef, {
      history: newHistory,
      xp: (userStats.xp || 0) + 10,
      streak: newStreak,
      lastActivity: now.toISOString()
    });
  };

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
      let match = currentDict.find(d => d.romaji && d.romaji.toLowerCase() === word);
      if (!match) {
        match = currentDict.find(d => d.claves && d.claves.some(c => String(c).toLowerCase() === word));
      }

      if (match) {
        const technicalTypes = ["Negocios", "Leyes", "Ingeniería", "Medicina", "Tecnología", "Ciencia"];
        const isTechnical = technicalTypes.includes(match.tipo) || technicalTypes.includes(match.categoria);

        const item = { ...match, status: 'found', isTechnical };
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

    if (verbs.length > 0) oracionFinal.push(verbs[0]);
    else if (subjects.length > 0 || objects.length > 0) {
      oracionFinal.push("desu");
      desglose.push({ romaji: "desu", esp: "Ser/Estar", tipo: "GRAMATICA", status: 'found' });
      reglasAplicadas.push({ id: 'N5-DESU', title: 'Cópula DESU', desc: 'Termina oraciones afirmativas.' });
    }

    const uniqueRules = Array.from(new Set(reglasAplicadas.map(a => a.title)))
      .map(title => reglasAplicadas.find(a => a.title === title));

    const finalOracion = oracionFinal.join(" ") + (oracionFinal.length > 0 ? "。" : "");
    return { oracion: finalOracion, desglose, uniqueRules };
  }, [inputText, dictionary]);

  const generateLocalResponse = (input) => {
    const cleanInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[.,!?¿¡]/g, "");
    const inputWords = cleanInput.split(/\s+/).filter(w => w.length > 0);

    const foundWords = dictionary.filter(d =>
      inputWords.some(word => d.claves && d.claves.some(c => String(c).toLowerCase() === word))
    ).slice(0, 5);

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
    if (foundWords.length > 0) response += "**Vocabulario:**\n" + foundWords.map(w => `- ${w.esp}: ${w.romaji}`).join("\n") + "\n\n";
    if (foundGrammar.length > 0) response += "**Sabiduría Gramatical:**\n" + foundGrammar.map(g => `- ${g.regla}: ${g.detalles[0]}`).join("\n");
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

    // Strategy: Try Gemini first, fallback to DeepSeek if available, finally Local Response
    try {
      if (!geminiKey) throw new Error("No Gemini Key");

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`, {
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
      if (!response.ok) throw new Error("DeepSeek Error");
      const data = await response.json();
      return data.choices?.[0]?.message?.content;
    } catch (e) {
      console.warn("Direct DeepSeek fallback failed", e);
    }

    try {
      let aiResponse;
      try {
        aiResponse = await tryGeminiVertex(generativeModel);
      } catch (e20) {
        console.warn("Gemini 2.0 Vertex failed", e20);
        try {
          aiResponse = await tryGeminiVertex(generativeModelFallback);
        } catch (e15) {
          console.warn("Gemini 1.5 Vertex fallback failed", e15);
        }
      }

      if (!response.ok) throw new Error("Gemini API Error");

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', text: data.candidates?.[0]?.content?.parts?.[0]?.text || "Moushiwake..." }]);
    } catch (geminiError) {
      console.warn("Gemini falló, intentando DeepSeek...", geminiError);

      try {
        if (!deepseekKey) throw new Error("No DeepSeek Key");

        // Assuming DeepSeek Chat API (OpenAI compatible)
        const response = await fetch("https://api.deepseek.com/chat/completions", {
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
            ]
          })
        });

        if (!response.ok) throw new Error("DeepSeek API Error");

        const data = await response.json();
        setMessages(prev => [...prev, { role: 'assistant', text: data.choices?.[0]?.message?.content || "Moushiwake..." }]);
      } catch (deepseekError) {
        console.warn("DeepSeek también falló o no está configurado. Usando motor local.", deepseekError);
        const localMsg = generateLocalResponse(userMsg);
        setMessages(prev => [...prev, { role: 'assistant', text: localMsg }]);
      }
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const [petals, setPetals] = useState([]);
  useEffect(() => {
    setPetals([...Array(15)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      width: Math.random() * 10 + 5,
      height: Math.random() * 8 + 4,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 10
    })));
  }, []);

  const triggerHanko = (text) => {
    setHankoText(text);
    setHankoVisible(true);
    setTimeout(() => setHankoVisible(false), 3000);
  };

  useEffect(() => {
    if (result.oracion && result.oracion.length > 5 && !result.oracion.includes('?')) {
      triggerHanko("N5");
    }
  }, [result.oracion]);

  return (
    <div className={`min-h-screen font-sans theme-transition relative overflow-x-hidden pb-24 md:pb-8 ${isDarkMode ? 'bg-[#121212] text-[#E0E0E0]' : 'bg-[#FAF7F2] text-[#2C3E50]'}`}>

      <div className="fixed inset-0 pointer-events-none z-0">
        {petals.map((p) => (
          <div
            key={p.id}
            className="sakura-petal"
            style={{
              left: `${p.left}vw`,
              width: `${p.width}px`,
              height: `${p.height}px`,
              animation: `sakura-fall ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`
            }}
          />
        ))}
      </div>

      <div className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-700 ${isDarkMode ? 'opacity-[0.05]' : 'opacity-[0.03]'}`} style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M0 50 C 0 25, 25 0, 50 0 C 75 0, 100 25, 100 50 C 100 75, 75 100, 50 100 C 25 100, 0 75, 0 50 Z M 10 50 C 10 70, 30 90, 50 90 C 70 90, 90 70, 90 50 C 90 30, 70 10, 50 10 C 30 10, 10 30, 10 50 Z' fill='${isDarkMode ? '%23D4AF37' : '%23bc2424'}' /%3E%3C/svg%3E")`, backgroundSize: '60px 60px' }}></div>

      {hankoVisible && (
        <div className="fixed top-32 right-8 z-[100] animate-hanko pointer-events-none">
          <div className="hanko-stamp flex flex-col items-center justify-center">
            <span className="text-[10px] leading-none mb-1 opacity-60">SENSEI</span>
            <span className="leading-none">{hankoText}</span>
          </div>
        </div>
      )}

      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <Mascot isDarkMode={isDarkMode} activeTab={activeTab} />

      <main className="max-w-4xl mx-auto p-4 md:p-8 space-y-6 relative z-10">

        <div className="hidden md:flex justify-center flex-wrap gap-3 py-2">
          {[
            { id: 'inicio', Icon: ArrowRightLeft, label: 'Traductor' },
            { id: 'chat', Icon: MessageCircle, label: 'Maestro' },
            { id: 'diccionario', Icon: BookA, label: 'Librería' },
            { id: 'flashcards', Icon: Brain, label: 'Estudio' },
            { id: 'gramatica', Icon: Layers, label: 'Manual' },
            { id: 'bushido', Icon: Trophy, label: 'Bushido' },
            { id: 'historial', Icon: History, label: 'Radio' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border-b-4 ${
                activeTab === tab.id
                  ? (isDarkMode ? 'bg-jp-sun text-black border-black/20 shadow-lg' : 'bg-jp-red text-white border-jp-red-dark shadow-lg')
                  : (isDarkMode ? 'bg-[#242444] text-slate-400 border-black' : 'bg-white text-slate-400 border-slate-100 hover:border-jp-red hover:text-jp-red')
              }`}
            >
              <tab.Icon size={16} /> {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'inicio' && <Translator inputText={inputText} setInputText={setInputText} result={result} isDarkMode={isDarkMode} saveHistory={saveHistory} />}
        {activeTab === 'chat' && <Chat messages={messages} chatInput={chatInput} setChatInput={setChatInput} handleChat={handleChat} isTyping={isTyping} chatEndRef={chatEndRef} isDarkMode={isDarkMode} />}
        {activeTab === 'diccionario' && <Dictionary dictionary={dictionary} search={search} setSearch={setSearch} isDarkMode={isDarkMode} />}
        {activeTab === 'flashcards' && <Flashcards user={user} dictionary={dictionary} userProgress={userProgress} isDarkMode={isDarkMode} userStats={userStats} />}
        {activeTab === 'gramatica' && <GrammarManual grammarManual={grammarManual} isDarkMode={isDarkMode} />}
        {activeTab === 'bushido' && <Bushido userStats={userStats} isDarkMode={isDarkMode} />}
        {activeTab === 'historial' && <HistoryList userStats={userStats} isDarkMode={isDarkMode} />}
      </main>

      <MobileFooter activeTab={activeTab} setActiveTab={setActiveTab} isDarkMode={isDarkMode} />
    </div>
  );
}
