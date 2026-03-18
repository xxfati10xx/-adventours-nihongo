import React from 'react';
import { ArrowRightLeft, MessageCircle, BookA, Layers, Brain, History, Trophy } from 'lucide-react';

const MobileFooter = ({ activeTab, setActiveTab, isDarkMode }) => {
  const tabs = [
    { id: 'inicio', Icon: ArrowRightLeft, label: 'Traductor', color: 'bg-jp-red' },
    { id: 'chat', Icon: MessageCircle, label: 'Maestro', color: 'bg-jp-sky' },
    { id: 'diccionario', Icon: BookA, label: 'Librería', color: 'bg-jp-mint' },
    { id: 'flashcards', Icon: Brain, label: 'Estudio', color: 'bg-jp-purple' },
    { id: 'gramatica', Icon: Layers, label: 'Manual', color: 'bg-jp-sun' },
    { id: 'bushido', Icon: Trophy, label: 'Bushido', color: 'bg-orange-400' },
    { id: 'historial', Icon: History, label: 'Radio', color: 'bg-slate-400' }
  ];

  return (
    <footer className={`fixed bottom-4 left-4 right-4 md:hidden z-50`}>
      <div className={`flex overflow-x-auto no-scrollbar gap-2 p-3 rounded-[2.5rem] border-b-8 shadow-2xl transition-all ${isDarkMode ? 'bg-[#242444] border-[#1A1A2E]' : 'bg-white border-[#F0EAD6]'}`}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex-shrink-0 min-w-[80px] p-3 rounded-[2rem] transition-all active:scale-95 flex flex-col items-center gap-1 relative overflow-hidden ${
              activeTab === t.id
                ? `${t.color} text-white border-b-4 border-black/20 shadow-lg`
                : 'bg-transparent text-slate-400'
            }`}
          >
            <t.Icon size={22} className={activeTab === t.id ? 'animate-bounce' : ''} />
            <span className="text-[9px] font-black uppercase tracking-tighter">{t.label}</span>
            {activeTab === t.id && (
              <div className="absolute top-0 right-0 w-4 h-4 bg-white/20 rounded-full -mr-1 -mt-1" />
            )}
          </button>
        ))}
      </div>
    </footer>
  );
};

export default MobileFooter;
