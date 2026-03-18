import React, { useState } from 'react';
import { Brain, Star, ChevronRight, BookOpen, Layers } from 'lucide-react';

const Flashcards = ({ user, dictionary, userProgress, isDarkMode, userStats }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Take 10 cards for daily session
  const sessionCards = dictionary.slice(0, 10);
  const currentCard = sessionCards[currentIdx];

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIdx < sessionCards.length - 1) {
      setTimeout(() => setCurrentIdx(currentIdx + 1), 200);
    } else {
      setIsComplete(true);
    }
  };

  if (isComplete) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8 animate-pop-in">
        <div className={`p-12 rounded-[4rem] border-b-8 shadow-2xl relative overflow-hidden transition-all ${isDarkMode ? 'bg-[#242444] border-black' : 'bg-white border-[#F0EAD6]'}`}>
          <div className="absolute top-0 right-0 w-40 h-40 -mr-20 -mt-20 bg-jp-sun opacity-10 rounded-full" />
          <Star className={isDarkMode ? 'text-jp-sun' : 'text-yellow-400'} size={80} fill="currentColor" className="mx-auto mb-6 animate-float" />
          <h3 className="text-4xl font-black uppercase tracking-tighter italic mb-4">¡Sesión Completada!</h3>
          <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-8 leading-relaxed">Has fortalecido tu espíritu guerrero. +50 XP Ganados.</p>
          <button
            onClick={() => { setIsComplete(false); setCurrentIdx(0); }}
            className="px-12 py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] transition-all active:scale-95 btn-bubble-red shadow-xl"
          >
            Volver a Entrenar
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="animate-pop-in space-y-8">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-2xl ${isDarkMode ? 'bg-jp-sun text-black shadow-lg' : 'bg-jp-purple text-white shadow-md'}`}>
            <Brain size={24} />
          </div>
          <div>
            <h2 className={`text-xs font-black uppercase tracking-[0.4em] ${isDarkMode ? 'text-jp-sun' : 'text-jp-ink'}`}>Sesión Diaria</h2>
            <p className="text-[10px] font-black uppercase opacity-60 tracking-[0.2em]">{currentIdx + 1} de {sessionCards.length}</p>
          </div>
        </div>

        <div className="w-48 h-3 bg-slate-200 rounded-full overflow-hidden shadow-inner border-b-2 border-slate-300/50">
          <div
            className={`h-full transition-all duration-500 ${isDarkMode ? 'bg-jp-sun' : 'bg-jp-purple'}`}
            style={{ width: `${((currentIdx + 1) / sessionCards.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="perspective-1000 w-full h-[450px] cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`relative w-full h-full transition-all duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>

          {/* Front: Spanish */}
          <div className={`absolute inset-0 backface-hidden card-bubble flex flex-col items-center justify-center p-12 text-center transition-all ${isDarkMode ? 'bg-[#242444] border-black text-white shadow-[0_12px_0_#000]' : 'bg-white border-slate-100 shadow-[0_12px_0_#F0F0F0] text-jp-ink'}`}>
            <BookOpen className={isDarkMode ? 'text-jp-sun opacity-20' : 'text-jp-purple opacity-20'} size={120} />
            <span className={`text-[11px] font-black uppercase tracking-[0.5em] mb-4 opacity-60 ${isDarkMode ? 'text-jp-sun' : 'text-jp-purple-dark'}`}>Significado</span>
            <h3 className="text-5xl md:text-7xl font-black tracking-tighter lowercase leading-none">{currentCard?.esp}</h3>
            <p className="mt-8 text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Toca para revelar</p>
          </div>

          {/* Back: Romaji */}
          <div className={`absolute inset-0 backface-hidden rotate-y-180 card-bubble flex flex-col items-center justify-center p-12 text-center transition-all ${isDarkMode ? 'bg-jp-sun border-jp-sun-dark shadow-[0_12px_0_#E6B800] text-black' : 'bg-jp-purple border-jp-purple-dark shadow-[0_12px_0_#D9B3FF] text-white'}`}>
            <Star className="opacity-20 absolute top-10 right-10 animate-spin-slow" size={60} />
            <span className={`text-[11px] font-black uppercase tracking-[0.5em] mb-4 opacity-70`}>Lectura Romaji</span>
            <h3 className="text-6xl md:text-8xl font-black tracking-tighter italic leading-none">{currentCard?.romaji || "—"}</h3>
            <div className="mt-8 p-4 rounded-3xl bg-white/20 backdrop-blur-sm border-b-2 border-white/30">
              <p className="text-sm font-black uppercase tracking-widest">{currentCard?.tipo || 'General'}</p>
            </div>
          </div>

        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={(e) => { e.stopPropagation(); setIsFlipped(!isFlipped); }}
          className={`flex-1 py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] transition-all active:scale-95 border-b-8 ${isDarkMode ? 'bg-[#242444] border-black text-white' : 'bg-white border-slate-100 text-slate-400 shadow-lg'}`}
        >
          {isFlipped ? 'Ver Significado' : 'Revelar'}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="flex-1 py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] transition-all active:scale-95 btn-bubble-mint shadow-xl"
        >
          Siguiente Palabra
          <ChevronRight size={20} className="inline-block ml-2" />
        </button>
      </div>
    </section>
  );
};

export default Flashcards;
