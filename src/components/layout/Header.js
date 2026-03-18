import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { ToriiIcon } from '../icons/JapaneseIcons';

const Header = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <header className={`p-4 md:p-6 sticky top-0 z-50 transition-all duration-500 ${isDarkMode ? 'bg-[#1A1A2E]/80' : 'bg-[#FF8080]/90'} backdrop-blur-md`}>
      <div className={`max-w-4xl mx-auto flex justify-between items-center p-3 rounded-[2rem] border-b-4 ${isDarkMode ? 'bg-[#242444] border-[#3D3D5C] text-jp-sun' : 'bg-white border-[#E66666] text-jp-red'}`}>
        <div className="flex items-center gap-3 ml-2">
          <div className={`p-2 rounded-2xl transition-colors ${isDarkMode ? 'bg-[#1A1A2E] text-jp-sun' : 'bg-jp-red-light text-white'}`}>
            <ToriiIcon size={24} />
          </div>
          <h1 className="text-sm md:text-xl font-black tracking-wider uppercase italic leading-none">
            Adventours<span className={isDarkMode ? 'text-white' : 'text-jp-red-dark'}>CR</span> Nihongo
          </h1>
        </div>

        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`mr-2 p-2 rounded-2xl transition-all active:scale-90 flex items-center justify-center w-10 h-10 border-b-4 ${isDarkMode ? 'bg-[#1A1A2E] text-jp-sun border-[#000]' : 'bg-jp-sun text-jp-red-dark border-[#E6B800]'}`}
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
