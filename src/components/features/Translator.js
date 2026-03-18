import React, { useState, useMemo, useEffect } from 'react';
import { Info, Zap, Save, ChevronRight } from 'lucide-react';
import { SakuraIcon } from '../icons/JapaneseIcons';

const Translator = ({ inputText, setInputText, result, isDarkMode, saveHistory }) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSave = () => {
    saveHistory(inputText, result.oracion, result.uniqueRules);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 2000);
  };

  return (
    <div className="space-y-6 animate-pop-in">
      <section className={`p-6 md:p-8 card-bubble relative overflow-hidden ${isDarkMode ? 'bg-[#242444]' : 'bg-white'}`}>
        <div className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full opacity-10 ${isDarkMode ? 'bg-jp-sun' : 'bg-jp-red'}`} />

        <label className={`block text-[10px] font-black uppercase tracking-[0.2em] mb-3 ml-2 ${isDarkMode ? 'text-jp-sun' : 'text-jp-red'}`}>Ingresa tu frase:</label>
        <textarea
          className={`w-full p-6 rounded-[2rem] outline-none transition-all text-xl md:text-3xl font-black shadow-inner min-h-[140px] border-b-8 ${
            isDarkMode
              ? 'bg-[#1A1A2E] border-[#000] text-white focus:border-jp-sun'
              : 'bg-jp-sky-light border-jp-sky text-jp-ink focus:border-jp-red'
          }`}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Escribe aquí..."
        />
      </section>

      <div className={`p-8 md:p-12 card-bubble text-center relative overflow-hidden transition-all ${
        isDarkMode
          ? 'bg-[#242444] border-jp-sun text-white'
          : 'bg-white border-jp-red text-jp-ink shadow-[0_12px_0_#FFB3B3]'
      }`}>
        <div className={`absolute -top-4 -left-4 opacity-10 animate-float ${isDarkMode ? 'text-jp-sun' : 'text-jp-red'}`}><SakuraIcon size={80}/></div>

        <p className={`text-[10px] font-black uppercase mb-4 tracking-[0.4em] ${isDarkMode ? 'text-jp-sun' : 'text-jp-red'}`}>Tu Traducción</p>
        <p className="text-3xl md:text-6xl font-black tracking-tighter leading-tight drop-shadow-sm">{result.oracion || "..."}</p>

        {result.oracion && (
          <button
            onClick={handleSave}
            className={`mt-8 px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 mx-auto transition-all active:scale-95 ${
              isSuccess
                ? 'btn-bubble-mint'
                : 'btn-bubble-red'
            }`}
          >
            {isSuccess ? '¡Guardado!' : 'Guardar Progreso'}
            <Save size={16} />
          </button>
        )}
      </div>

      {result.uniqueRules.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.uniqueRules.map((rule, idx) => (
            <div key={idx} className={`p-5 rounded-[2rem] flex items-center gap-4 card-bubble transition-colors ${isDarkMode ? 'bg-[#242444] border-[#3D3D5C]' : 'bg-jp-sun-light border-jp-sun'}`}>
              <div className={`p-3 rounded-2xl ${isDarkMode ? 'bg-[#1A1A2E]' : 'bg-white'}`}>
                <Zap size={20} className={isDarkMode ? 'text-jp-sun' : 'text-yellow-500'}/>
              </div>
              <div className="text-left">
                <p className={`text-sm font-black uppercase leading-tight ${isDarkMode ? 'text-jp-sun' : 'text-jp-ink'}`}>{rule.title}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{rule.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-4 justify-center py-4">
        {result.desglose.map((item, i) => (
          <div key={i} className={`p-5 rounded-[2rem] border-b-4 flex flex-col items-center min-w-[120px] flex-1 transition-all transform hover:-translate-y-2 shadow-xl ${
            item.status === 'missing'
              ? 'bg-rose-100 border-rose-300 text-rose-800'
              : item.isTechnical
                ? 'bg-jp-purple-light border-jp-purple text-jp-ink'
                : 'bg-white border-jp-sky text-jp-ink'
          }`}>
            <span className={`text-[9px] font-black uppercase tracking-widest mb-2 opacity-60`}>{String(item.tipo || 'DESCONOCIDO')}</span>
            <span className="font-black text-2xl mb-1">{item.romaji === "" ? "—" : String(item.romaji || "???")}</span>
            <span className="text-[11px] font-bold text-slate-400 italic text-center">{String(item.esp)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Translator;
