import React from 'react';
import { History as HistoryIcon, Clock, ChevronRight, Zap } from 'lucide-react';

const HistoryList = ({ userStats, isDarkMode }) => {
  const { history = [] } = userStats;

  return (
    <section className={`p-6 md:p-8 card-bubble flex flex-col h-[75vh] animate-pop-in relative overflow-hidden transition-all ${isDarkMode ? 'bg-[#242444] border-jp-sun' : 'bg-white border-[#F0EAD6]'}`}>
      <div className={`p-4 border-b-4 flex items-center justify-between mb-6 ${isDarkMode ? 'border-[#3D3D5C]' : 'border-slate-50'}`}>
        <h2 className={`text-xs font-black uppercase tracking-[0.4em] ${isDarkMode ? 'text-jp-sun' : 'text-slate-400'}`}>Últimas Radiografías (Niveles 1-12)</h2>
        <HistoryIcon className={isDarkMode ? 'text-jp-sun' : 'text-slate-300'} size={24} />
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
        {history.length > 0 ? (
          [...history].reverse().map((h, i) => (
            <div
              key={i}
              className={`p-6 rounded-[2.5rem] border-b-8 transition-all group hover:-translate-y-1 ${
                isDarkMode
                  ? 'bg-[#1A1A2E] border-black text-white hover:border-jp-sun shadow-xl'
                  : 'bg-white border-slate-100 hover:border-jp-sky shadow-md'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ${isDarkMode ? 'text-jp-sun' : 'text-jp-ink'}`}>
                  <Clock size={14} />
                  {new Date(h.timestamp).toLocaleDateString()} {new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className={`p-2 rounded-xl border-b-2 ${isDarkMode ? 'bg-[#242444] border-black text-jp-sun' : 'bg-jp-sky-light border-jp-sky text-jp-sky-dark'}`}>
                  <Zap size={14} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-1">Frase Original</span>
                  <p className="text-xl font-black italic tracking-tight">{h.original}</p>
                </div>

                <div className={`p-6 rounded-[2rem] text-center border-b-4 ${isDarkMode ? 'bg-[#242444] border-black' : 'bg-jp-sky-light/30 border-jp-sky'}`}>
                  <span className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 block ${isDarkMode ? 'text-jp-sun' : 'text-jp-sky-dark'}`}>Traducción Japonesa</span>
                  <p className="text-3xl font-black tracking-tighter leading-none">{h.oracion}</p>
                </div>

                {h.uniqueRules && h.uniqueRules.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {h.uniqueRules.map((rule, idx) => (
                      <span key={idx} className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase border-b-2 ${isDarkMode ? 'bg-[#1A1A2E] border-black text-jp-sun' : 'bg-jp-mint-light border-jp-mint text-jp-mint-dark'}`}>
                        {rule.title || rule}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-10 opacity-30">
            <HistoryIcon size={80} className="mb-4" />
            <p className="font-black uppercase tracking-widest text-sm">Aún no hay pergaminos en el archivo...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HistoryList;
