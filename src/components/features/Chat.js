import React from 'react';
import { Sparkles, Send, User } from 'lucide-react';
import { SakuraIcon } from '../icons/JapaneseIcons';

const Chat = ({ messages, chatInput, setChatInput, handleChat, isTyping, chatEndRef, isDarkMode }) => {
  return (
    <section className={`rounded-[3rem] border-b-8 flex flex-col h-[75vh] animate-pop-in overflow-hidden transition-all shadow-2xl ${isDarkMode ? 'bg-[#242444] border-[#1A1A2E]' : 'bg-white border-[#F0EAD6]'}`}>
      <div className={`p-6 border-b-4 flex items-center justify-between transition-colors ${isDarkMode ? 'bg-[#1A1A2E] border-[#3D3D5C]' : 'bg-jp-sky-light border-jp-sky'}`}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-2xl shadow-sm">
            <Sparkles className="text-jp-sky-dark" size={20} />
          </div>
          <h2 className={`text-sm font-black uppercase tracking-[0.4em] ${isDarkMode ? 'text-jp-sun' : 'text-jp-sky-dark'}`}>Sensei AI</h2>
        </div>
        <SakuraIcon className={isDarkMode ? 'text-jp-sun' : 'text-jp-red-light'} size={24} />
      </div>

      <div className={`flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar ${isDarkMode ? 'bg-[#1A1A2E]' : 'bg-[#FAF7F2]'}`}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-pop-in`}>
            <div className={`flex items-end gap-2 max-w-[85%]`}>
              {m.role !== 'user' && (
                <div className={`w-8 h-8 rounded-full border-b-2 flex items-center justify-center flex-shrink-0 ${isDarkMode ? 'bg-jp-sun text-black' : 'bg-jp-sky text-white border-jp-sky-dark'}`}>
                  <Sparkles size={14} />
                </div>
              )}
              <div className={`p-5 rounded-[2rem] text-sm font-bold leading-relaxed border-b-4 ${
                m.role === 'user'
                  ? (isDarkMode ? 'bg-jp-sun text-black border-black/20' : 'bg-jp-red text-white border-jp-red-dark shadow-md')
                  : (isDarkMode ? 'bg-[#242444] text-white border-jp-sun/20' : 'bg-white text-jp-ink border-slate-100 shadow-sm')
              }`}>
                {String(m.text)}
              </div>
              {m.role === 'user' && (
                <div className={`w-8 h-8 rounded-full border-b-2 flex items-center justify-center flex-shrink-0 ${isDarkMode ? 'bg-jp-sky text-black' : 'bg-slate-200 text-slate-500 border-slate-300'}`}>
                  <User size={14} />
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start animate-pulse">
            <div className={`p-4 rounded-[2rem] bg-slate-100 border-b-4 border-slate-200`}>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce delay-75" />
                <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce delay-150" />
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className={`p-6 border-t transition-colors ${isDarkMode ? 'bg-[#1A1A2E] border-[#3D3D5C]' : 'bg-white'}`}>
        <div className="relative group">
          <input
            type="text"
            className={`w-full p-5 pr-16 rounded-[2rem] outline-none font-bold shadow-inner border-4 transition-all text-sm ${
              isDarkMode
                ? 'bg-[#242444] border-[#3D3D5C] text-white focus:border-jp-sun'
                : 'bg-jp-sky-light border-jp-sky text-jp-ink focus:border-jp-red'
            }`}
            placeholder="Pregunta algo al Sensei..."
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleChat()}
          />
          <button
            onClick={handleChat}
            disabled={isTyping}
            className={`absolute right-2 top-2 p-3 rounded-full shadow-lg transition-all active:scale-90 flex items-center justify-center border-b-4 ${
              isDarkMode
                ? 'bg-jp-sun text-black border-black/20 disabled:bg-slate-700'
                : 'bg-jp-red text-white border-jp-red-dark hover:bg-jp-red-dark disabled:bg-slate-300'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Chat;
