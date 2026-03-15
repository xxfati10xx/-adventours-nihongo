import React from 'react';
import { Sparkles, Send } from 'lucide-react';
import { SakuraIcon } from '../icons/JapaneseIcons';

const Chat = ({ messages, chatInput, setChatInput, handleChat, isTyping, chatEndRef, isDarkMode }) => {
  return (
    <section className={`rounded-[2rem] border-2 flex flex-col h-[70vh] animate-fade-in-up overflow-hidden transition-colors ${isDarkMode ? 'bg-[#1A1A1A] border-[#2D2D2D] shadow-2xl' : 'bg-white border-[#E8DCC4] shadow-lg'}`}>
      <div className={`p-4 md:p-6 border-b-2 flex items-center justify-between transition-colors ${isDarkMode ? 'bg-[#2D2D2D] border-[#3D3D3D]' : 'bg-[#FAF7F2] border-slate-100'}`}>
        <div className="flex items-center gap-3">
          <Sparkles className={isDarkMode ? 'text-[#D4AF37]' : 'text-[#BC2424]'} size={20} />
          <h2 className="text-xs md:text-sm font-black uppercase tracking-[0.3em]">Maestro IA</h2>
        </div>
        <SakuraIcon className={isDarkMode ? 'text-[#D4AF37]' : 'text-rose-300'} size={24} />
      </div>
      <div className={`flex-1 overflow-y-auto p-4 md:p-6 space-y-4 custom-scrollbar ${isDarkMode ? 'bg-[#121212]' : 'bg-white'}`}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-bold shadow-md leading-relaxed ${m.role === 'user' ? (isDarkMode ? 'bg-[#D4AF37] text-black border-b-2 border-[#B8860B]' : 'bg-[#BC2424] text-white border-b-2 border-[#8B1A1A]') : (isDarkMode ? 'bg-[#2D2D2D] text-white border-2 border-[#3D3D3D]' : 'bg-white text-[#2C3E50] border-2 border-[#E8DCC4]')}`}>{String(m.text)}</div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className={`p-4 md:p-6 border-t transition-colors ${isDarkMode ? 'bg-[#1A1A1A] border-[#2D2D2D]' : 'bg-[#FAF7F2]'}`}>
        <div className="relative">
          <input
            type="text"
            className={`w-full p-4 pr-14 rounded-full outline-none font-bold shadow-inner border-2 transition-all text-sm ${isDarkMode ? 'bg-[#2D2D2D] border-[#3D3D3D] text-white focus:border-[#D4AF37]' : 'bg-white border-[#E8DCC4] text-[#2C3E50] focus:border-[#BC2424]'}`}
            placeholder="Escribe al Sensei..."
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleChat()}
          />
          <button
            onClick={handleChat}
            disabled={isTyping}
            className={`absolute right-1.5 top-1.5 p-2.5 rounded-full shadow-lg transition-all active:scale-90 flex items-center justify-center ${isDarkMode ? 'bg-[#D4AF37] text-black disabled:bg-gray-600' : 'bg-[#BC2424] text-white hover:bg-[#8B1A1A] disabled:bg-gray-400'}`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Chat;
