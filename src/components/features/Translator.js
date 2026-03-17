import React from 'react';
import { Info, Zap } from 'lucide-react';
import { SakuraIcon } from '../icons/JapaneseIcons';

const Translator = ({ inputText, setInputText, result, isDarkMode }) => {
  const [draggedItem, setDraggedItem] = React.useState(null);
  const [placedItems, setPlacedItems] = React.useState([]);
  const [errorIndex, setErrorIndex] = React.useState(null);

  // Filter out grammar particles and missing items for the puzzle
  const puzzleItems = React.useMemo(() => {
    return result.desglose
      .filter(item => item.status === 'found' && item.tipo !== 'GRAMATICA' && item.romaji !== "")
      .sort(() => Math.random() - 0.5);
  }, [result.desglose]);

  const expectedOrder = React.useMemo(() => {
    return result.desglose
      .filter(item => item.status === 'found' && item.tipo !== 'GRAMATICA' && item.romaji !== "")
      .map(item => item.romaji);
  }, [result.desglose]);

  React.useEffect(() => {
    setPlacedItems([]);
  }, [inputText]);

  const handleDrop = (e) => {
    e.preventDefault();
    if (!draggedItem) return;

    const nextExpected = expectedOrder[placedItems.length];
    if (draggedItem.romaji === nextExpected) {
      setPlacedItems([...placedItems, draggedItem.romaji]);
      setErrorIndex(null);
    } else {
      setErrorIndex(puzzleItems.findIndex(item => item.romaji === draggedItem.romaji));
      setTimeout(() => setErrorIndex(null), 500);
    }
    setDraggedItem(null);
  };

  return (
    <section className={`p-4 md:p-8 rounded-[2rem] border-2 theme-transition animate-fade-in-up ${isDarkMode ? 'bg-[#1A1A1A] border-[#2D2D2D] shadow-2xl' : 'bg-white border-[#E8DCC4] shadow-md'}`}>
      <textarea
        className={`w-full p-4 md:p-6 rounded-2xl mb-6 outline-none transition-all text-xl md:text-3xl font-medium shadow-inner min-h-[120px] ${isDarkMode ? 'bg-[#121212] border-[#2D2D2D] text-white focus:border-[#D4AF37]' : 'bg-[#FAF7F2] border-slate-100 text-[#2C3E50] focus:border-[#BC2424]'}`}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Introduce tu frase..."
      />

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className={`p-6 md:p-10 rounded-3xl text-center mb-6 border-2 shadow-xl relative overflow-hidden transition-colors ${isDarkMode ? 'bg-[#2D2D2D] border-[#D4AF37]' : 'bg-gradient-to-br from-[#FAF7F2] to-[#F3EEE5] border-[#E8DCC4]'} ${placedItems.length === expectedOrder.length && expectedOrder.length > 0 ? 'kintsugi-glow' : ''}`}
      >
        <div className={`absolute top-4 right-4 opacity-10 ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#BC2424]'}`}><SakuraIcon size={40}/></div>
        <p className={`text-[10px] font-black uppercase mb-2 tracking-[0.3em] ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#BC2424]'}`}>Área de Disección</p>

        {expectedOrder.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-2 min-h-[3rem] items-center">
            {placedItems.map((romaji, idx) => (
              <span key={idx} className={`text-2xl md:text-4xl font-black tracking-tight animate-fade-in-up ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#BC2424]'}`}>
                {romaji}{idx < expectedOrder.length - 1 ? "" : ""}
              </span>
            ))}
            {placedItems.length < expectedOrder.length && (
              <div className="w-12 h-1 bg-slate-200 rounded-full animate-pulse mx-2"></div>
            )}
            {placedItems.length === expectedOrder.length && (
              <span className="text-2xl md:text-4xl font-black tracking-tight animate-fade-in-up">。</span>
            )}
          </div>
        ) : (
          <p className="text-2xl md:text-4xl font-black tracking-tight leading-tight opacity-20">Esperando frase...</p>
        )}
      </div>

      {puzzleItems.length > 0 && placedItems.length < expectedOrder.length && (
        <div className="mb-8 p-4 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200">
           <p className="text-[9px] font-black uppercase tracking-widest text-center mb-4 opacity-50">Ordena los bloques de la radiografía:</p>
           <div className="flex flex-wrap justify-center gap-3">
             {puzzleItems
               .filter(item => !placedItems.includes(item.romaji))
               .map((item, idx) => (
               <div
                 key={idx}
                 draggable
                 onDragStart={() => setDraggedItem(item)}
                 className={`px-4 py-2 rounded-xl border-2 cursor-grab active:cursor-grabbing font-black text-sm transition-all shadow-sm ${errorIndex === idx ? 'vibrate-red' : (isDarkMode ? 'bg-[#121212] border-[#2D2D2D] text-white hover:border-[#D4AF37]' : 'bg-white border-[#E8DCC4] hover:border-[#BC2424]')}`}
               >
                 {item.romaji}
               </div>
             ))}
           </div>
        </div>
      )}

      {result.uniqueRules.length > 0 && (
        <div className="mb-6 space-y-3">
          <p className={`text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#BC2424]'}`}><Info size={16}/> Análisis Gramatical:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {result.uniqueRules.map((rule, idx) => (
              <div key={idx} className={`p-4 rounded-xl flex items-center gap-4 shadow-md border-l-4 transition-colors ${isDarkMode ? 'bg-[#2D2D2D] border-[#D4AF37]' : 'bg-[#FAF7F2] border-[#BC2424]'}`}>
                <Zap size={16} className={isDarkMode ? 'text-[#D4AF37]' : 'text-[#BC2424]'}/>
                <div className="text-left">
                  <p className={`text-[12px] font-black leading-tight mb-0.5 ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#2C3E50]'}`}>{rule.title}</p>
                  <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{rule.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3 justify-center">
        {result.desglose.map((item, i) => (
          <div key={i} className={`p-4 rounded-2xl border-2 flex flex-col items-center min-w-[100px] flex-1 transition-all transform hover:scale-105 shadow-sm ${item.status === 'missing' ? (isDarkMode ? 'bg-red-900/20 border-red-900' : 'bg-rose-50 border-rose-100') : (isDarkMode ? 'bg-[#121212] border-[#2D2D2D] hover:border-[#D4AF37]' : 'bg-white border-[#E8DCC4] hover:border-[#BC2424]')}`}>
            <span className={`text-[8px] font-black uppercase mb-1 tracking-widest ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#BC2424]'}`}>{String(item.tipo || 'DESCONOCIDO')}</span>
            <span className="font-black text-lg md:text-xl">{item.romaji === "" ? "—" : String(item.romaji || "???")}</span>
            <span className="text-[10px] text-gray-400 font-bold italic text-center mt-1">{String(item.esp)}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Translator;
