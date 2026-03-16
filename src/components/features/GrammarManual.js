import React, { useState, useMemo } from 'react';
import {
  Shapes, Workflow, Timer, ShieldCheck, Bolt, Crown, Layers,
  Music, Palette, Zap, Telescope, Link2, BrainCircuit, Search, Filter,
  SpellCheck, Type, Quote, ArrowRightLeft
} from 'lucide-react';

const GrammarManual = ({ grammarManual, isDarkMode }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Shapes': return <Shapes size={28}/>;
      case 'Workflow': return <Workflow size={28}/>;
      case 'Timer': return <Timer size={28}/>;
      case 'ShieldCheck': return <ShieldCheck size={28}/>;
      case 'Bolt': return <Bolt size={28}/>;
      case 'Crown': return <Crown size={28}/>;
      case 'Music': return <Music size={28}/>;
      case 'Palette': return <Palette size={28}/>;
      case 'Zap': return <Zap size={28}/>;
      case 'Telescope': return <Telescope size={28}/>;
      case 'Link2': return <Link2 size={28}/>;
      case 'Gemini': return <BrainCircuit size={28}/>;
      case 'SpellCheck': return <SpellCheck size={28}/>;
      case 'Type': return <Type size={28}/>;
      case 'Quote': return <Quote size={28}/>;
      case 'ArrowRightLeft': return <ArrowRightLeft size={28}/>;
      default: return <Layers size={28}/>;
    }
  };

  const grammarArray = useMemo(() => {
    return Object.values(grammarManual);
  }, [grammarManual]);

  const categories = useMemo(() => {
    const cats = new Set(grammarArray.map(item => item.cat));
    return ['Todas', ...Array.from(cats)].sort();
  }, [grammarArray]);

  const filteredRules = useMemo(() => {
    return grammarArray.filter(rule => {
      const matchesSearch =
        rule.regla.toLowerCase().includes(search.toLowerCase()) ||
        (rule.detalles && rule.detalles.some(d => d.toLowerCase().includes(search.toLowerCase())));

      const matchesCategory = selectedCategory === 'Todas' || rule.cat === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [grammarArray, search, selectedCategory]);

  return (
    <section className={`p-4 md:p-8 rounded-[2rem] border-2 h-[75vh] flex flex-col animate-fade-in-up ${isDarkMode ? 'bg-[#1A1A1A] border-[#2D2D2D] shadow-2xl' : 'bg-white border-[#E8DCC4] shadow-lg'}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b pb-4">
        <h2 className={`text-xs font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#BC2424]'}`}>Manual de Maestría</h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar regla..."
              className={`w-full sm:w-64 p-2 pl-9 rounded-full outline-none font-bold text-xs border-2 transition-all ${isDarkMode ? 'bg-[#2D2D2D] border-[#3D3D3D] text-white focus:border-[#D4AF37]' : 'bg-[#FAF7F2] border-slate-100 text-[#2C3E50] focus:border-[#BC2424]'}`}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-slate-300" size={14} />
          </div>

          <div className="relative">
            <select
              className={`w-full sm:w-48 p-2 pl-9 rounded-full outline-none font-bold text-xs border-2 appearance-none cursor-pointer transition-all ${isDarkMode ? 'bg-[#2D2D2D] border-[#3D3D3D] text-white focus:border-[#D4AF37]' : 'bg-[#FAF7F2] border-slate-100 text-[#2C3E50] focus:border-[#BC2424]'}`}
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <Filter className="absolute left-3 top-2.5 text-slate-300" size={14} />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar space-y-4">
        {filteredRules.length === 0 ? (
          <div className="text-center py-20 opacity-50">
            <p className="font-bold">No se encontraron reglas que coincidan con tu búsqueda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredRules.map((data, index) => (
              <div key={index} className={`p-6 rounded-3xl border-2 transition-all group shadow-md ${isDarkMode ? 'bg-[#2D2D2D] border-[#3D3D3D] hover:border-[#D4AF37]' : 'bg-[#FAF7F2] border-[#E8DCC4] hover:border-[#BC2424]'}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl shadow-lg ${isDarkMode ? 'bg-[#D4AF37] text-black' : 'bg-[#BC2424] text-white'}`}>
                    {getIcon(data.icon)}
                  </div>
                  <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full border shadow-inner ${isDarkMode ? 'bg-[#121212] text-[#D4AF37] border-[#3D3D3D]' : 'bg-white text-[#BC2424] border-[#E8DCC4]'}`}>{String(data.cat)}</span>
                </div>
                <h3 className="text-xl font-black mb-2">{String(data.regla)}</h3>
                <div className={`text-sm font-bold mb-4 leading-relaxed italic border-l-4 pl-4 ${isDarkMode ? 'text-gray-300 border-[#D4AF37]' : 'text-slate-700 border-[#BC2424]'}`}>
                  {data.detalles && data.detalles.map((d, i) => (
                    <p key={i}>{String(d)}</p>
                  ))}
                </div>
                {data.ejemplos && data.ejemplos.length > 0 && data.ejemplos.map((ej, idx) => (
                  <div key={idx} className={`p-4 rounded-2xl border-2 text-center shadow-inner transition-all ${isDarkMode ? 'bg-[#121212] border-[#3D3D3D] group-hover:border-[#D4AF37]' : 'bg-white border-[#E8DCC4] group-hover:border-[#BC2424]'}`}>
                     <p className="text-xl font-black mb-1">{ej.jap}</p>
                     <p className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#BC2424]'}`}>{ej.esp}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default GrammarManual;
