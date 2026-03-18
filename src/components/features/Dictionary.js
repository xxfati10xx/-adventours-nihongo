import React, { useState } from 'react';
import { Search, Info, X, BookOpen, Star } from 'lucide-react';

const Dictionary = ({ dictionary, search, setSearch, isDarkMode }) => {
  const [selectedWord, setSelectedWord] = useState(null);

  return (
    <section className={`p-6 md:p-8 card-bubble flex flex-col h-[75vh] animate-pop-in relative overflow-hidden transition-all ${isDarkMode ? 'bg-[#242444] border-jp-sun' : 'bg-white border-[#F0EAD6]'}`}>
      <div className={`p-4 border-b-4 flex items-center justify-between mb-6 ${isDarkMode ? 'border-[#3D3D5C]' : 'border-slate-50'}`}>
        <h2 className={`text-xs font-black uppercase tracking-[0.4em] ${isDarkMode ? 'text-jp-sun' : 'text-jp-mint-dark'}`}>Gran Librería N5-N1</h2>
        <BookOpen className={isDarkMode ? 'text-jp-sun' : 'text-jp-mint'} size={24} />
      </div>

      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Buscar una palabra..."
          className={`w-full p-6 pl-16 rounded-[2rem] outline-none font-black text-sm shadow-inner border-b-8 transition-all ${
            isDarkMode
              ? 'bg-[#1A1A2E] border-black text-white focus:border-jp-sun'
              : 'bg-jp-mint-light border-jp-mint text-jp-ink focus:border-jp-red'
          }`}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Search className={`absolute left-6 top-6 ${isDarkMode ? 'text-jp-sun' : 'text-jp-mint-dark'}`} size={24} />
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-max">
        {dictionary
          .filter(d => String(d.esp).toLowerCase().includes(search.toLowerCase()) || String(d.romaji).toLowerCase().includes(search.toLowerCase()))
          .map((d, i) => (
            <div
              key={i}
              onClick={() => setSelectedWord(d)}
              className={`flex justify-between items-center p-4 rounded-[2rem] border-b-4 transition-all group cursor-pointer active:scale-95 hover:-translate-y-1 ${
                isDarkMode
                  ? 'bg-[#1A1A2E] border-black text-white hover:border-jp-sun'
                  : 'bg-white border-slate-100 hover:border-jp-mint shadow-sm'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg border-b-2 transition-all ${
                  isDarkMode
                    ? 'bg-[#242444] text-jp-sun border-black group-hover:bg-jp-sun group-hover:text-black'
                    : 'bg-jp-mint-light text-jp-mint-dark border-jp-mint group-hover:bg-jp-mint group-hover:text-white'
                }`}>
                  {String(d.esp).charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-black text-lg tracking-tight">{String(d.romaji || "—")}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{String(d.esp)}</p>
                </div>
              </div>
              <Star size={16} className={`opacity-0 group-hover:opacity-100 transition-opacity ${isDarkMode ? 'text-jp-sun' : 'text-jp-mint'}`} />
            </div>
          ))}
      </div>

      {selectedWord && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1A1A2E]/80 backdrop-blur-md animate-pop-in">
          <div className={`w-full max-w-lg p-8 rounded-[3rem] border-b-8 shadow-2xl relative ${isDarkMode ? 'bg-[#242444] border-black text-white' : 'bg-white border-[#F0EAD6] text-jp-ink'}`}>
            <button
              onClick={() => setSelectedWord(null)}
              className={`absolute top-6 right-6 p-3 rounded-full hover:bg-slate-100 transition-all active:scale-90 ${isDarkMode ? 'hover:bg-jp-sun/20' : 'hover:bg-jp-red/10'}`}
            >
              <X size={24} className={isDarkMode ? 'text-jp-sun' : 'text-jp-red'} />
            </button>

            <div className="flex flex-col items-center text-center space-y-8 mt-4">
              <div className={`p-8 rounded-[3rem] shadow-inner w-full border-b-4 ${isDarkMode ? 'bg-[#1A1A2E] border-black' : 'bg-jp-mint-light border-jp-mint'}`}>
                <span className={`text-[10px] font-black uppercase mb-3 block tracking-[0.4em] ${isDarkMode ? 'text-jp-sun' : 'text-jp-mint-dark'}`}>{selectedWord.tipo || 'Palabra'}</span>
                <h3 className="text-5xl md:text-6xl font-black mb-2 tracking-tighter">{selectedWord.romaji || "—"}</h3>
                <p className="text-2xl font-black text-slate-400 italic">{selectedWord.esp}</p>
              </div>

              <div className="w-full space-y-4">
                <div className={`p-6 rounded-[2.5rem] text-left border-b-4 ${isDarkMode ? 'bg-[#1A1A2E] border-black' : 'bg-slate-50 border-slate-100'}`}>
                  <p className={`flex items-center gap-2 text-[11px] font-black uppercase mb-3 tracking-widest ${isDarkMode ? 'text-jp-sun' : 'text-slate-400'}`}><Info size={16}/> Información Profesional</p>
                  <p className="text-sm font-bold leading-relaxed">
                    Este término es clave en <span className={isDarkMode ? 'text-jp-sun' : 'text-jp-mint-dark'}>{selectedWord.tipo || 'el día a día'}</span>.
                    Nivel sugerido: <span className="underline font-black">{selectedWord.grupo || 'N5'}</span>.
                  </p>
                </div>

                <div className={`p-6 rounded-[2.5rem] text-left border-b-4 ${isDarkMode ? 'bg-[#1A1A2E] border-black' : 'bg-jp-red-light/10 border-jp-red-light'}`}>
                  <p className={`flex items-center gap-2 text-[11px] font-black uppercase mb-3 tracking-widest ${isDarkMode ? 'text-jp-sun' : 'text-jp-red'}`}>Ejemplo de Práctica</p>
                  <p className="text-xl font-black italic">"{selectedWord.romaji} o tsukaimasu."</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase mt-2 tracking-tighter">"Voy a usar {selectedWord.esp}."</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedWord(null)}
                className="w-full py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] transition-all active:scale-95 btn-bubble-red shadow-xl"
              >
                Continuar Camino
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Dictionary;
