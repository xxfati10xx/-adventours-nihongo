import React, { useState } from 'react';
import { Search, Info, X } from 'lucide-react';

const Dictionary = ({ dictionary, search, setSearch, isDarkMode }) => {
  const [selectedWord, setSelectedWord] = useState(null);
  const [flippedIndex, setFlippedIndex] = useState(null);

  return (
    <section className={`p-4 md:p-8 rounded-[2rem] border-2 flex flex-col h-[70vh] animate-fade-in-up theme-transition relative ${isDarkMode ? 'bg-[#1A1A1A] border-[#2D2D2D] shadow-2xl' : 'bg-white border-[#E8DCC4] shadow-lg'}`}>
      <div className="flex justify-between items-center mb-4 border-b pb-2 transition-colors">
        <h2 className={`text-xs font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#BC2424]'}`}>Librería N5-N1</h2>
        <span className="text-[10px] font-bold opacity-50 uppercase">Toca para girar</span>
      </div>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Buscar concepto..."
          className={`w-full p-4 pl-12 rounded-2xl outline-none font-bold text-sm shadow-inner border-2 transition-all ${isDarkMode ? 'bg-[#2D2D2D] border-[#3D3D3D] text-white focus:border-[#D4AF37]' : 'bg-[#FAF7F2] border-slate-100 text-[#2C3E50] focus:border-[#BC2424]'}`}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Search className="absolute left-4 top-4 text-slate-300" size={20} />
      </div>

      <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-max">
        {dictionary
          .filter(d => String(d.esp).toLowerCase().includes(search.toLowerCase()) || String(d.romaji).toLowerCase().includes(search.toLowerCase()))
          .map((d, i) => (
            <div
              key={i}
              className="perspective-1000 h-32 cursor-pointer group active-press"
              onClick={() => setFlippedIndex(flippedIndex === i ? null : i)}
            >
              <div className={`relative w-full h-full transition-transform duration-500 preserve-3d ${flippedIndex === i ? 'rotate-y-180' : ''}`}>

                {/* Front: Spanish */}
                <div className={`absolute inset-0 backface-hidden rounded-2xl border-2 flex flex-col justify-between p-4 transition-colors shadow-md ${isDarkMode ? 'bg-[#121212] border-[#2D2D2D] text-white' : 'bg-white border-[#FAF7F2] text-[#2C3E50]'}`}>
                  <div className="flex justify-between items-start">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${isDarkMode ? 'bg-[#2D2D2D] text-[#D4AF37]' : 'bg-[#FAF7F2] text-[#BC2424]'}`}>{String(d.tipo)}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedWord(d); }}
                      className="p-1 rounded-full hover:bg-slate-100 transition-colors"
                    >
                      <Info size={14} className="text-slate-400" />
                    </button>
                  </div>
                  <p className="text-xl font-black uppercase tracking-tighter text-center">{String(d.esp)}</p>
                  <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-1000 ${isDarkMode ? 'bg-[#D4AF37]' : 'bg-[#BC2424]'}`} style={{ width: `${(i * 13) % 60 + 20}%` }}></div>
                  </div>
                </div>

                {/* Back: Romaji */}
                <div className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border-2 flex flex-col justify-center items-center p-4 transition-colors shadow-xl ${isDarkMode ? 'bg-[#2D2D2D] border-[#D4AF37] text-[#D4AF37]' : 'bg-[#BC2424] border-[#8B1A1A] text-white'}`}>
                   <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-70">LECTURA ROMAJI</p>
                   <p className="text-2xl font-black font-mono tracking-tighter text-center">{String(d.romaji || "—")}</p>
                   <p className="text-[10px] font-bold mt-2 italic opacity-60">Dominio de Bóveda</p>
                </div>

              </div>
            </div>
          ))}
      </div>

      {selectedWord && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className={`w-full max-w-lg p-8 rounded-[2.5rem] border-4 shadow-2xl relative ${isDarkMode ? 'bg-[#1A1A1A] border-[#D4AF37]' : 'bg-white border-[#BC2424]'}`}>
            <button
              onClick={() => setSelectedWord(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={24} className={isDarkMode ? 'text-white' : 'text-slate-500'} />
            </button>

            <div className="flex flex-col items-center text-center space-y-6">
              <div className={`p-6 rounded-3xl shadow-lg ${isDarkMode ? 'bg-[#2D2D2D]' : 'bg-[#FAF7F2]'}`}>
                <span className={`text-[10px] font-black uppercase mb-2 block tracking-[0.2em] ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#BC2424]'}`}>{selectedWord.tipo || 'Término'}</span>
                <h3 className="text-5xl font-black mb-1">{selectedWord.romaji || "—"}</h3>
                <p className="text-xl font-bold text-gray-400 italic">{selectedWord.esp}</p>
              </div>

              <div className="w-full space-y-4">
                <div className={`p-4 rounded-2xl text-left border-l-4 ${isDarkMode ? 'bg-[#121212] border-[#D4AF37]' : 'bg-[#FAF7F2] border-[#BC2424]'}`}>
                  <p className="flex items-center gap-2 text-[10px] font-black uppercase mb-2 opacity-50"><Info size={14}/> Ficha Técnica:</p>
                  <p className="text-sm font-bold leading-relaxed">
                    Este término se utiliza frecuentemente en el ámbito de <span className={isDarkMode ? 'text-[#D4AF37]' : 'text-[#BC2424]'}>{selectedWord.tipo || 'la conversación general'}</span>.
                    Pertenece al grupo <span className="underline">{selectedWord.grupo || 'General'}</span>.
                  </p>
                </div>

                <div className={`p-4 rounded-2xl text-left border-l-4 ${isDarkMode ? 'bg-[#121212] border-[#D4AF37]' : 'bg-[#FAF7F2] border-[#BC2424]'}`}>
                  <p className="flex items-center gap-2 text-[10px] font-black uppercase mb-2 opacity-50">Ejemplo de Uso:</p>
                  {["Negocios", "Leyes", "Ingeniería", "Medicina"].includes(selectedWord.tipo) ? (
                    <>
                      <p className="text-lg font-black italic">"{selectedWord.romaji} no jisshi wa hitsuyo desu."</p>
                      <p className="text-[10px] font-bold text-gray-500 uppercase mt-1">"La implementación de {selectedWord.esp} es necesaria."</p>
                    </>
                  ) : (
                    <>
                      <p className="text-lg font-black italic">"{selectedWord.romaji} o kudasai."</p>
                      <p className="text-[10px] font-bold text-gray-500 uppercase mt-1">"Por favor, deme {selectedWord.esp}."</p>
                    </>
                  )}
                </div>
              </div>

              <button
                onClick={() => setSelectedWord(null)}
                className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest transition-all ${isDarkMode ? 'bg-[#D4AF37] text-black hover:bg-white' : 'bg-[#BC2424] text-white hover:bg-black'}`}
              >
                Cerrar Pergamino
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Dictionary;
