import React from 'react';
import { Trophy, Flame, Shield, Award, Star } from 'lucide-react';

const Bushido = ({ userStats, isDarkMode }) => {
  const { xp = 0, streak = 0, belt = 'Blanco' } = userStats;

  const belts = [
    { name: 'Blanco', minXp: 0, color: 'bg-slate-100 text-slate-400' },
    { name: 'Amarillo', minXp: 100, color: 'bg-yellow-400 text-yellow-900' },
    { name: 'Naranja', minXp: 300, color: 'bg-orange-500 text-white' },
    { name: 'Verde', minXp: 600, color: 'bg-green-600 text-white' },
    { name: 'Azul', minXp: 1000, color: 'bg-blue-600 text-white' },
    { name: 'Marrón', minXp: 2000, color: 'bg-amber-900 text-white' },
    { name: 'Negro', minXp: 5000, color: 'bg-black text-white' }
  ];

  const currentBelt = [...belts].reverse().find(b => xp >= b.minXp) || belts[0];
  const nextBelt = belts[belts.indexOf(currentBelt) + 1];
  const progressToNext = nextBelt
    ? ((xp - currentBelt.minXp) / (nextBelt.minXp - currentBelt.minXp)) * 100
    : 100;

  return (
    <section className={`p-4 md:p-8 rounded-[2rem] border-2 flex flex-col h-[70vh] animate-fade-in-up ${isDarkMode ? 'bg-[#1A1A1A] border-[#2D2D2D] shadow-2xl' : 'bg-white border-[#E8DCC4] shadow-lg'}`}>
      <h2 className={`text-xs font-black uppercase tracking-[0.3em] mb-6 border-b pb-2 ${isDarkMode ? 'text-[#D4AF37] border-gray-700' : 'text-[#BC2424] border-rose-50'}`}>El Camino del Guerrero (Bushido)</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 overflow-y-auto pr-1 custom-scrollbar">

        {/* Profile Card */}
        <div className={`p-8 rounded-[2.5rem] border-4 flex flex-col items-center text-center space-y-4 ${isDarkMode ? 'bg-[#2D2D2D] border-[#D4AF37]' : 'bg-[#FAF7F2] border-[#BC2424]'}`}>
          <div className={`w-24 h-24 rounded-full flex items-center justify-center border-4 shadow-xl mb-2 ${currentBelt.color}`}>
            <Shield size={48} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase opacity-50 tracking-widest">Rango Actual</p>
            <h3 className="text-3xl font-black uppercase tracking-tighter">Cinturón {currentBelt.name}</h3>
          </div>

          <div className="w-full space-y-1">
            <div className="flex justify-between text-[10px] font-black uppercase">
              <span>{xp} XP</span>
              <span>{nextBelt ? `${nextBelt.minXp} XP` : 'MAESTRO'}</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div
                className={`h-full transition-all duration-1000 ${isDarkMode ? 'bg-[#D4AF37]' : 'bg-[#BC2424]'}`}
                style={{ width: `${progressToNext}%` }}
              />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-6 rounded-3xl border-2 flex flex-col items-center justify-center text-center ${isDarkMode ? 'bg-[#121212] border-[#3D3D3D]' : 'bg-white border-slate-100 shadow-sm'}`}>
            <Flame size={32} className="text-orange-500 mb-2" />
            <span className="text-2xl font-black">{streak}</span>
            <span className="text-[8px] font-black uppercase opacity-50">Días de Racha</span>
          </div>

          <div className={`p-6 rounded-3xl border-2 flex flex-col items-center justify-center text-center ${isDarkMode ? 'bg-[#121212] border-[#3D3D3D]' : 'bg-white border-slate-100 shadow-sm'}`}>
            <Trophy size={32} className="text-yellow-500 mb-2" />
            <span className="text-2xl font-black">{xp}</span>
            <span className="text-[8px] font-black uppercase opacity-50">Total XP</span>
          </div>

          <div className={`p-6 rounded-3xl border-2 flex flex-col items-center justify-center text-center col-span-2 ${isDarkMode ? 'bg-[#121212] border-[#3D3D3D]' : 'bg-white border-slate-100 shadow-sm'}`}>
            <div className="flex gap-2 mb-2">
              <Star size={20} className="text-yellow-400 fill-yellow-400" />
              <Star size={20} className="text-yellow-400 fill-yellow-400" />
              <Star size={20} className="text-yellow-400 fill-yellow-400" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest italic">"La disciplina es el puente entre metas y logros."</p>
          </div>
        </div>

        {/* Rewards Section */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="text-[10px] font-black uppercase tracking-widest opacity-50 flex items-center gap-2">
            <Award size={16}/> Próximos Logros
          </h4>
          <div className="space-y-2">
            {[
              { title: 'Primeros Pasos', desc: 'Llega a 100 XP', target: 100 },
              { title: 'Estudiante Constante', desc: 'Racha de 7 días', target: 7, type: 'streak' },
              { title: 'Maestro de Diccionario', desc: 'Consulta 50 términos', target: 50, type: 'vocab' }
            ].map((logro, i) => {
              const val = logro.type === 'streak' ? streak : xp;
              const isLocked = val < logro.target;
              return (
                <div key={i} className={`p-4 rounded-2xl border-2 flex justify-between items-center transition-opacity ${isLocked ? 'opacity-40 grayscale' : ''} ${isDarkMode ? 'bg-[#2D2D2D] border-[#3D3D3D]' : 'bg-white border-slate-50 shadow-sm'}`}>
                  <div>
                    <p className="text-sm font-black uppercase">{logro.title}</p>
                    <p className="text-[10px] font-bold text-gray-400">{logro.desc}</p>
                  </div>
                  {isLocked ? <Shield size={16}/> : <CheckCircle size={16} className="text-green-500" />}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

const CheckCircle = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

export default Bushido;
