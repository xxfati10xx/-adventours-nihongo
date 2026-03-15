import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { ToriiIcon } from '../icons/JapaneseIcons';

const Header = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <header className={`p-4 md:p-6 sticky top-0 z-50 flex justify-between items-center border-b-4 transition-colors duration-500 ${isDarkMode ? 'bg-[#1A1A1A] text-[#D4AF37] border-[#2D2D2D] shadow-lg' : 'bg-[#BC2424] text-[#FAF7F2] border-[#8B1A1A] shadow-xl'}`}>
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-xl border-2 transition-colors ${isDarkMode ? 'bg-[#2D2D2D] border-[#D4AF37]' : 'bg-[#FAF7F2] border-[#8B1A1A]'}`}>
          <ToriiIcon className={isDarkMode ? 'text-[#D4AF37]' : 'text-[#BC2424]'} size={28} />
        </div>
        <div>
          <h1 className="text-lg md:text-2xl font-black tracking-widest uppercase leading-none italic">AdventoursCR nihongo</h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-2 rounded-2xl border-2 transition-all active:scale-95 flex items-center justify-center w-11 h-11 ${isDarkMode ? 'bg-[#D4AF37] text-black border-white shadow-md' : 'bg-[#FAF7F2] text-[#BC2424] border-[#8B1A1A]'}`}
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
