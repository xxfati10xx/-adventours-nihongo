import React from 'react';
import { ArrowRightLeft, MessageCircle, BookA, Layers, Brain, History, Trophy } from 'lucide-react';

const MobileFooter = ({ activeTab, setActiveTab, isDarkMode }) => {
  const tabs = [
    { id: 'inicio', Icon: ArrowRightLeft, label: 'Traductor' },
    { id: 'chat', Icon: MessageCircle, label: 'Maestro' },
    { id: 'diccionario', Icon: BookA, label: 'Librería' },
    { id: 'flashcards', Icon: Brain, label: 'Estudio' },
    { id: 'gramatica', Icon: Layers, label: 'Manual' },
    { id: 'bushido', Icon: Trophy, label: 'Bushido' },
    { id: 'historial', Icon: History, label: 'Radio' }
  ];

  return (
    <footer className={`fixed bottom-0 w-full border-t-4 p-2 pb-6 flex overflow-x-auto custom-scrollbar-hide md:hidden z-50 shadow-2xl rounded-t-[2.5rem] transition-colors ${isDarkMode ? 'bg-[#1A1A1A] border-[#D4AF37]' : 'bg-[#FAF7F2] border-[#BC2424]'}`}>
      <div className="flex min-w-full justify-around px-2">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`p-3 min-w-[70px] rounded-2xl transition-all active:scale-90 flex flex-col items-center gap-1 ${activeTab === t.id ? (isDarkMode ? 'text-black bg-[#D4AF37] shadow-xl' : 'text-[#FAF7F2] bg-[#BC2424] shadow-lg') : 'text-gray-400 opacity-60'}`}
          >
            <t.Icon size={20} />
            <span className="text-[8px] font-bold uppercase tracking-tighter whitespace-nowrap">{t.label}</span>
          </button>
        ))}
      </div>
    </footer>
  );
};

export default MobileFooter;
