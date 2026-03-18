import React, { useState, useMemo } from 'react';
import { Brain, CheckCircle, XCircle, RotateCcw, Filter } from 'lucide-react';
import { doc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db, appId } from '@/lib/firebase';

const Flashcards = ({ user, dictionary, userProgress, isDarkMode, userStats }) => {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);

  const categories = useMemo(() => {
    const cats = new Set(dictionary.map(item => item.tipo || item.categoria));
    return ['Todas', ...Array.from(cats)].filter(Boolean).sort();
  }, [dictionary]);

  const dailyCards = useMemo(() => {
    let pool = dictionary;
    if (selectedCategory !== 'Todas') {
      pool = dictionary.filter(d => (d.tipo === selectedCategory || d.categoria === selectedCategory));
    }

    // Basic SRS Logic: Sort by difficulty and last seen (simplified for now)
    // In a real app, we'd calculate a 'nextReview' date.
    const sorted = [...pool].sort((a, b) => {
      const progA = userProgress[a.romaji] || { level: 0 };
      const progB = userProgress[b.romaji] || { level: 0 };
      return progA.level - progB.level;
    });

    return sorted.slice(0, 10);
  }, [dictionary, selectedCategory, userProgress]);

  const handleLevelUpdate = async (word, ease) => {
    if (!user) return;
    const currentProgress = userProgress[word] || { level: 0, count: 0 };
    let newLevel = currentProgress.level;

    if (ease === 'easy') newLevel += 1;
    if (ease === 'hard') newLevel = Math.max(0, newLevel - 1);

    const wordId = word.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    await setDoc(doc(db, 'artifacts', appId, 'users', user.uid, 'progress', wordId), {
      level: newLevel,
      lastSeen: new Date().toISOString(),
      count: (currentProgress.count || 0) + 1
    });

    const userDocRef = doc(db, 'artifacts', appId, 'users', user.uid);
    await updateDoc(userDocRef, {
      xp: increment(5),
      lastActivity: new Date().toISOString()
    });

    if (currentCardIndex < dailyCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
    } else {
      setSessionComplete(true);
    }
  };

  const resetSession = () => {
    setCurrentCardIndex(0);
    setShowAnswer(false);
    setSessionComplete(false);
  };

  if (dailyCards.length === 0) {
    return (
      <div className="text-center py-20 opacity-50">
        <p className="font-bold">No hay palabras disponibles en esta categoría.</p>
      </div>
    );
  }

  if (sessionComplete) {
    return (
      <div className={`p-8 rounded-[2rem] border-2 text-center space-y-6 animate-fade-in ${isDarkMode ? 'bg-[#1A1A1A] border-[#D4AF37]' : 'bg-white border-[#BC2424]'}`}>
        <Brain size={64} className={`mx-auto ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#BC2424]'}`} />
        <h2 className="text-2xl font-black uppercase">¡Sesión Completada!</h2>
        <p className="font-bold">Has repasado 10 palabras hoy. Tu camino hacia la maestría continúa.</p>
        <button
          onClick={resetSession}
          className={`px-8 py-3 rounded-full font-black uppercase tracking-widest transition-all border-2 ${isDarkMode ? 'bg-[#D4AF37] text-black border-white' : 'bg-[#BC2424] text-white border-[#8B1A1A]'}`}
        >
          Repetir Sesión
        </button>
      </div>
    );
  }

  const currentCard = dailyCards[currentCardIndex];

  return (
    <section className={`p-4 md:p-8 rounded-[2rem] border-2 flex flex-col min-h-[60vh] animate-fade-in-up ${isDarkMode ? 'bg-[#1A1A1A] border-[#2D2D2D] shadow-2xl' : 'bg-white border-[#E8DCC4] shadow-lg'}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-xs font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#BC2424]'}`}>Entrenamiento Flashcards</h2>
        <div className="relative">
          <select
            className={`p-2 pl-8 rounded-full outline-none font-bold text-[10px] border-2 appearance-none cursor-pointer transition-all ${isDarkMode ? 'bg-[#2D2D2D] border-[#3D3D3D] text-white' : 'bg-[#FAF7F2] border-slate-100 text-[#2C3E50]'}`}
            value={selectedCategory}
            onChange={e => { setSelectedCategory(e.target.value); resetSession(); }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <Filter className="absolute left-2.5 top-2.5 text-slate-400" size={12} />
        </div>
      </div>

      <div className="mb-4 flex justify-between items-center px-2">
        <span className="text-[10px] font-black opacity-50 uppercase">Progreso: {currentCardIndex + 1} / {dailyCards.length}</span>
        <div className="flex gap-1">
          {dailyCards.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${i <= currentCardIndex ? (isDarkMode ? 'bg-[#D4AF37]' : 'bg-[#BC2424]') : 'bg-gray-200'}`} />
          ))}
        </div>
      </div>

      <div
        onClick={() => !showAnswer && setShowAnswer(true)}
        className={`flex-1 flex flex-col items-center justify-center p-8 rounded-3xl border-4 border-dashed cursor-pointer transition-all transform active:scale-95 ${showAnswer ? 'border-transparent' : (isDarkMode ? 'border-[#3D3D3D] hover:border-[#D4AF37]' : 'border-slate-100 hover:border-[#BC2424]')}`}
      >
        <span className={`text-[10px] font-black uppercase mb-4 tracking-widest ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#BC2424]'}`}>{currentCard.tipo || 'Vocabulario'}</span>
        <h3 className="text-4xl md:text-6xl font-black mb-8 text-center">{showAnswer ? currentCard.romaji : currentCard.esp}</h3>
        {!showAnswer && (
          <p className="text-[10px] font-black uppercase opacity-30 animate-pulse">Toca para revelar</p>
        )}
      </div>

      {showAnswer && (
        <div className="mt-8 grid grid-cols-2 gap-4 animate-fade-in-up">
          <button
            onClick={() => handleLevelUpdate(currentCard.romaji, 'hard')}
            className={`flex items-center justify-center gap-2 p-4 rounded-2xl border-2 font-black uppercase tracking-widest transition-all ${isDarkMode ? 'bg-red-900/20 border-red-900 text-red-400 hover:bg-red-900/40' : 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100'}`}
          >
            <XCircle size={20} /> Difícil
          </button>
          <button
            onClick={() => handleLevelUpdate(currentCard.romaji, 'easy')}
            className={`flex items-center justify-center gap-2 p-4 rounded-2xl border-2 font-black uppercase tracking-widest transition-all ${isDarkMode ? 'bg-green-900/20 border-green-900 text-green-400 hover:bg-green-900/40' : 'bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100'}`}
          >
            <CheckCircle size={20} /> Fácil
          </button>
        </div>
      )}
    </section>
  );
};

export default Flashcards;
