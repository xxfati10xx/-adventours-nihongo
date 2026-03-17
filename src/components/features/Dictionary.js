import React from 'react';
import { Search } from 'lucide-react';

const Dictionary = ({ dictionary, search, setSearch, isDarkMode }) => {
  const [flippedIndex, setFlippedIndex] = React.useState(null);

  return (
    <section className={`p-4 md:p-8 rounded-[2rem] border-2 flex flex-col h-[70vh] animate-fade-in-up theme-transition ${isDarkMode ? 'bg-[#1A1A1A] border-[#2D2D2D] shadow-2xl' : 'bg-white border-[#E8DCC4] shadow-lg'}`}>
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
                    <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                  </div>
                  <p className="text-xl font-black uppercase tracking-tighter text-center">{String(d.esp)}</p>
                  <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-1000 ${isDarkMode ? 'bg-[#D4AF37]' : 'bg-[#BC2424]'}`} style={{ width: `${Math.random() * 60 + 20}%` }}></div>
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
    </section>
  );
};

export default Dictionary;
