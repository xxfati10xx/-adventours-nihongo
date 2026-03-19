import React, { useState, useRef, useEffect } from 'react';

const Mascot = ({ isDarkMode, activeTab }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });

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

  const handleDragStart = (clientX, clientY) => {
    setIsDragging(true);
    offsetRef.current = {
      x: clientX - position.x,
      y: clientY - position.y,
    };
  };

  const onMouseDown = (e) => handleDragStart(e.clientX, e.clientY);
  const onTouchStart = (e) => handleDragStart(e.touches[0].clientX, e.touches[0].clientY);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - offsetRef.current.x,
        y: e.clientY - offsetRef.current.y,
      });
    };

    const onTouchMove = (e) => {
      if (!isDragging) return;
      setPosition({
        x: e.touches[0].clientX - offsetRef.current.x,
        y: e.touches[0].clientY - offsetRef.current.y,
      });
    };

    const onEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onEnd);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onEnd);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [isDragging]);

  return (
    <div
      ref={dragRef}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'none'
      }}
      className="fixed bottom-32 md:bottom-24 right-4 z-40 flex flex-col items-center select-none"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      <div className={`mb-2 p-3 rounded-[1.5rem] md:rounded-3xl text-[9px] md:text-[10px] font-black uppercase tracking-widest border-2 shadow-lg animate-pop-in relative ${isDarkMode ? 'bg-[#242444] border-[#3D3D5C] text-white' : 'bg-white border-jp-sun text-jp-ink'}`}>
        {getMascotMessage()}
        <div className={`absolute -bottom-1 right-8 w-3 h-3 rotate-45 border-r-2 border-b-2 ${isDarkMode ? 'bg-[#242444] border-[#3D3D5C]' : 'bg-white border-jp-sun'}`} />
      </div>

      {/* Kawaii Fox Mascot */}
      <div className={`w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center border-b-4 mascot-anim shadow-xl transition-all ${isDarkMode ? 'bg-[#1A1A2E] border-black' : 'bg-white border-jp-sun shadow-[0_8px_0_#FFE0B2]'}`}>
        <svg viewBox="0 0 100 100" className="w-10 h-10 md:w-14 md:h-14">
          {/* Ears */}
          <path d="M25 45 L15 15 L45 30 Z" fill="#FF8080" stroke="#FF4D4D" strokeWidth="2" strokeLinejoin="round" />
          <path d="M75 45 L85 15 L55 30 Z" fill="#FF8080" stroke="#FF4D4D" strokeWidth="2" strokeLinejoin="round" />
          {/* Face */}
          <circle cx="50" cy="55" r="35" fill="#FFB3B3" stroke="#FF8080" strokeWidth="2" />
          {/* Eyes */}
          <circle cx="38" cy="52" r="3.5" fill="#2C3E50" />
          <circle cx="62" cy="52" r="3.5" fill="#2C3E50" />
          {/* Cheeks */}
          <circle cx="28" cy="62" r="5" fill="#FF8080" opacity="0.3" />
          <circle cx="72" cy="62" r="5" fill="#FF8080" opacity="0.3" />
          {/* Nose */}
          <path d="M48 62 L52 62 L50 64 Z" fill="#2C3E50" />
          {/* Mouth */}
          <path d="M46 68 Q50 71 54 68" fill="none" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};

export default Mascot;
