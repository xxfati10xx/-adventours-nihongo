import React from 'react';
import { Shapes, Workflow, Timer, ShieldCheck, Bolt, Crown, Layers } from 'lucide-react';

const GrammarManual = ({ grammarManual, isDarkMode }) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Shapes': return <Shapes size={28}/>;
      case 'Workflow': return <Workflow size={28}/>;
      case 'Timer': return <Timer size={28}/>;
      case 'ShieldCheck': return <ShieldCheck size={28}/>;
      case 'Bolt': return <Bolt size={28}/>;
      case 'Crown': return <Crown size={28}/>;
      default: return <Layers size={28}/>;
    }
  };

  return (
    <section className={`p-4 md:p-8 rounded-[2rem] border-2 h-[70vh] overflow-y-auto custom-scrollbar animate-fade-in-up space-y-6 ${isDarkMode ? 'bg-[#1A1A1A] border-[#2D2D2D] shadow-2xl' : 'bg-white border-[#E8DCC4] shadow-lg'}`}>
      <h2 className={`text-xs font-black uppercase tracking-[0.3em] border-b pb-2 ${isDarkMode ? 'text-[#D4AF37] border-gray-700' : 'text-[#BC2424] border-rose-50'}`}>Manual de Maestría</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {Object.entries(grammarManual).map(([key, data]) => (
          <div key={key} className={`p-6 rounded-3xl border-2 transition-all group shadow-md ${isDarkMode ? 'bg-[#2D2D2D] border-[#3D3D3D] hover:border-[#D4AF37]' : 'bg-[#FAF7F2] border-[#E8DCC4] hover:border-[#BC2424]'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl shadow-lg ${isDarkMode ? 'bg-[#D4AF37] text-black' : 'bg-[#BC2424] text-white'}`}>
                {getIcon(data.icon)}
              </div>
              <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full border shadow-inner ${isDarkMode ? 'bg-[#121212] text-[#D4AF37] border-[#3D3D3D]' : 'bg-white text-[#BC2424] border-[#E8DCC4]'}`}>{String(data.cat)}</span>
            </div>
            <h3 className="text-xl font-black mb-2">{String(data.cat)}</h3>
            <p className={`text-sm font-bold mb-4 leading-relaxed italic border-l-4 pl-4 ${isDarkMode ? 'text-gray-300 border-[#D4AF37]' : 'text-slate-700 border-[#BC2424]'}`}>{String(data.regla)}</p>
            {data.ejemplos && data.ejemplos.map((ej, idx) => (
              <div key={idx} className={`p-4 rounded-2xl border-2 text-center shadow-inner transition-all ${isDarkMode ? 'bg-[#121212] border-[#3D3D3D] group-hover:border-[#D4AF37]' : 'bg-white border-[#E8DCC4] group-hover:border-[#BC2424]'}`}>
                 <p className="text-xl font-black mb-1">{ej.jap}</p>
                 <p className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#BC2424]'}`}>{ej.esp}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default GrammarManual;
