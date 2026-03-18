import React from 'react';
import { SakuraIcon } from '../icons/JapaneseIcons';

const Mascot = ({ isDarkMode, activeTab }) => {
  const getMascotMessage = () => {
    switch (activeTab) {
      case 'inicio': return "¡Vamos a traducir algo!";
      case 'chat': return "¿Tienes preguntas?";
      case 'diccionario': return "¡Cuántas palabras!";
      case 'flashcards': return "¡A entrenar la mente!";
      case 'gramatica': return "Las reglas son claves.";
      case 'bushido': return "¡Eres un guerrero!";
      case 'historial': return "Mira tu progreso.";
      default: return "¡Hola, Sensei!";
    }
  };

  return (
    <div className="fixed bottom-32 md:bottom-24 right-4 z-40 flex flex-col items-center">
      <div className={`mb-2 p-3 rounded-[1.5rem] md:rounded-3xl text-[9px] md:text-[10px] font-black uppercase tracking-widest border-2 shadow-lg animate-pop-in relative ${isDarkMode ? 'bg-[#242444] border-[#3D3D5C] text-white' : 'bg-white border-jp-sun text-jp-ink'}`}>
        {getMascotMessage()}
        <div className={`absolute -bottom-1 right-8 w-3 h-3 rotate-45 border-r-2 border-b-2 ${isDarkMode ? 'bg-[#242444] border-[#3D3D5C]' : 'bg-white border-jp-sun'}`} />
      </div>

      <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center border-b-4 mascot-anim shadow-xl ${isDarkMode ? 'bg-[#1A1A2E] border-black text-jp-sun' : 'bg-jp-red-light border-jp-red text-white'}`}>
        <div className="relative">
          <SakuraIcon size={24} className="md:w-8 md:h-8" />
          <div className="absolute -top-1 -right-1 flex gap-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mascot;
