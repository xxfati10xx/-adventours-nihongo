import React from 'react';
import { History as HistoryIcon, Zap } from 'lucide-react';

const HistoryList = ({ userStats, isDarkMode }) => {
  const history = userStats.history || [];

  return (
    <section className={`p-4 md:p-8 rounded-[2rem] border-2 flex flex-col h-[70vh] animate-fade-in-up ${isDarkMode ? 'bg-[#1A1A1A] border-[#2D2D2D] shadow-2xl' : 'bg-white border-[#E8DCC4] shadow-lg'}`}>
      <h2 className={`text-xs font-black uppercase tracking-[0.3em] mb-4 border-b pb-2 ${isDarkMode ? 'text-[#D4AF37] border-gray-700' : 'text-[#BC2424] border-rose-50'}`}>Historial de Radiografías</h2>

      <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar space-y-4">
        {history.length === 0 ? (
          <div className="text-center py-20 opacity-50">
            <HistoryIcon size={48} className="mx-auto mb-4 opacity-20" />
            <p className="font-bold uppercase text-[10px] tracking-widest">Aún no hay frases diseccionadas.</p>
          </div>
        ) : (
          [...history].reverse().map((item, i) => (
            <div key={i} className={`p-6 rounded-3xl border-2 transition-all shadow-md ${isDarkMode ? 'bg-[#2D2D2D] border-[#3D3D3D]' : 'bg-[#FAF7F2] border-[#E8DCC4]'}`}>
              <div className="flex justify-between items-start mb-4">
                <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-full border ${isDarkMode ? 'bg-[#121212] text-[#D4AF37] border-[#3D3D3D]' : 'bg-white text-[#BC2424] border-[#E8DCC4]'}`}>
                  {new Date(item.timestamp).toLocaleDateString()}
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-xl font-black">{item.oracion}</p>
                <p className="text-sm font-bold text-gray-400 italic">"{item.original}"</p>
              </div>

              {item.uniqueRules && item.uniqueRules.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.uniqueRules.map((rule, idx) => (
                    <div key={idx} className={`flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-black uppercase ${isDarkMode ? 'bg-[#121212] text-[#D4AF37]' : 'bg-white text-[#BC2424]'}`}>
                      <Zap size={10} /> {rule.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default HistoryList;
