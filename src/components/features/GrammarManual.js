import React, { useState } from 'react';
import { Layers, Search, ChevronRight, Zap } from 'lucide-react';

const GrammarManual = ({ grammarManual, isDarkMode }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('N5');

  const categories = ['N5', 'N4', 'N3', 'N2', 'N1'];

  const rulesArray = Object.entries(grammarManual).map(([id, data]) => ({ id, ...data }));
  const filteredRules = rulesArray.filter(r =>
    (r.nivel === selectedCategory || (!r.nivel && selectedCategory === 'N5')) &&
    (r.regla.toLowerCase().includes(search.toLowerCase()) ||
     r.detalles?.some(d => d.toLowerCase().includes(search.toLowerCase())))
  );

  return (
    <section className={`p-6 md:p-8 card-bubble flex flex-col h-[75vh] animate-pop-in relative overflow-hidden transition-all ${isDarkMode ? 'bg-[#242444] border-jp-sun' : 'bg-white border-[#F0EAD6]'}`}>
      <div className={`p-4 border-b-4 flex items-center justify-between mb-6 ${isDarkMode ? 'border-[#3D3D5C]' : 'border-slate-50'}`}>
        <h2 className={`text-xs font-black uppercase tracking-[0.4em] ${isDarkMode ? 'text-jp-sun' : 'text-jp-purple-dark'}`}>Manual de Gramática N5-N1</h2>
        <Layers className={isDarkMode ? 'text-jp-sun' : 'text-jp-purple'} size={24} />
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 mb-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all active:scale-95 flex items-center gap-2 border-b-4 ${
              selectedCategory === cat
                ? (isDarkMode ? 'bg-jp-sun text-black border-black/20 shadow-lg' : 'bg-jp-purple text-white border-jp-purple-dark shadow-lg')
                : (isDarkMode ? 'bg-[#1A1A2E] text-slate-400 border-black' : 'bg-white text-slate-400 border-slate-100 shadow-sm hover:border-jp-purple')
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Buscar una regla..."
          className={`w-full p-6 pl-16 rounded-[2rem] outline-none font-black text-sm shadow-inner border-b-8 transition-all ${
            isDarkMode
              ? 'bg-[#1A1A2E] border-black text-white focus:border-jp-sun'
              : 'bg-jp-purple-light border-jp-purple text-jp-ink focus:border-jp-red'
          }`}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Search className={`absolute left-6 top-6 ${isDarkMode ? 'text-jp-sun' : 'text-jp-purple-dark'}`} size={24} />
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
        {filteredRules.length > 0 ? (
          filteredRules.map((rule, i) => (
            <div
              key={i}
              className={`p-6 rounded-[2rem] border-b-8 transition-all group hover:-translate-y-1 ${
                isDarkMode
                  ? 'bg-[#1A1A2E] border-black text-white hover:border-jp-sun shadow-xl'
                  : 'bg-white border-slate-100 hover:border-jp-purple shadow-md'
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-4 rounded-[1.5rem] border-b-4 ${isDarkMode ? 'bg-[#242444] border-black text-jp-sun' : 'bg-jp-purple-light border-jp-purple text-jp-purple-dark'}`}>
                  <Zap size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black tracking-tight">{rule.regla}</h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Nivel {selectedCategory}</p>
                </div>
              </div>

              <div className="space-y-4">
                {rule.detalles?.map((detalle, idx) => (
                  <div key={idx} className={`p-5 rounded-[2rem] text-sm font-bold leading-relaxed border-b-4 ${isDarkMode ? 'bg-[#242444] border-black' : 'bg-slate-50 border-slate-100 shadow-inner'}`}>
                    <div className="flex items-start gap-3">
                      <ChevronRight className={isDarkMode ? 'text-jp-sun' : 'text-jp-purple'} size={18} />
                      <p>{detalle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-10 opacity-30">
            <Layers size={80} className="mb-4" />
            <p className="font-black uppercase tracking-widest text-sm">No se encontraron pergaminos...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default GrammarManual;
