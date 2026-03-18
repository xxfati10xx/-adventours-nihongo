import React from 'react';
import { Trophy, Flame, Shield, Award, Star, CheckCircle } from 'lucide-react';

const Bushido = ({ userStats, isDarkMode }) => {
  const { xp = 0, streak = 0, belt = 'Blanco' } = userStats;

  const belts = [
    { name: 'Blanco', minXp: 0, color: 'bg-slate-100 border-slate-300 text-slate-400' },
    { name: 'Amarillo', minXp: 100, color: 'bg-jp-sun border-jp-sun-dark text-jp-ink' },
    { name: 'Naranja', minXp: 300, color: 'bg-orange-400 border-orange-500 text-white' },
    { name: 'Verde', minXp: 600, color: 'bg-jp-mint border-jp-mint-dark text-jp-mint-dark' },
    { name: 'Azul', minXp: 1000, color: 'bg-jp-sky border-jp-sky-dark text-white' },
    { name: 'Marrón', minXp: 2000, color: 'bg-amber-900 border-amber-950 text-white' },
    { name: 'Negro', minXp: 5000, color: 'bg-black border-slate-800 text-jp-sun' }
  ];

  const currentBelt = [...belts].reverse().find(b => xp >= b.minXp) || belts[0];
  const nextBelt = belts[belts.indexOf(currentBelt) + 1];
  const progressToNext = nextBelt
    ? ((xp - currentBelt.minXp) / (nextBelt.minXp - currentBelt.minXp)) * 100
    : 100;

  return (
    <section className={`p-6 md:p-10 card-bubble flex flex-col h-[75vh] animate-pop-in transition-all ${isDarkMode ? 'bg-[#242444] border-jp-sun' : 'bg-white border-[#F0EAD6]'}`}>
      <div className="flex items-center gap-4 mb-8 border-b-4 pb-6 border-slate-50">
        <Trophy className={isDarkMode ? 'text-jp-sun' : 'text-orange-400'} size={32} />
        <h2 className={`text-xs font-black uppercase tracking-[0.4em] ${isDarkMode ? 'text-jp-sun' : 'text-jp-ink'}`}>Camino del Guerrero (Bushido)</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1 overflow-y-auto pr-2 custom-scrollbar">

        {/* Profile Card */}
        <div className={`p-10 rounded-[3rem] border-b-8 flex flex-col items-center text-center space-y-6 relative overflow-hidden transition-all transform hover:scale-[1.02] shadow-xl ${isDarkMode ? 'bg-[#1A1A2E] border-black' : 'bg-[#FAF7F2] border-slate-200'}`}>
          <div className={`w-32 h-32 rounded-full flex items-center justify-center border-b-8 shadow-2xl transition-all animate-float ${currentBelt.color}`}>
            <Shield size={64} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase opacity-60 tracking-[0.4em] mb-2">Rango Actual</p>
            <h3 className="text-4xl font-black uppercase tracking-tighter italic">Cinturón {currentBelt.name}</h3>
          </div>

          <div className="w-full space-y-2">
            <div className="flex justify-between text-[11px] font-black uppercase tracking-widest px-1">
              <span>{xp} XP</span>
              <span>{nextBelt ? `${nextBelt.minXp} XP` : 'MAESTRO'}</span>
            </div>
            <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden shadow-inner border-b-2 border-slate-300/50">
              <div
                className={`h-full transition-all duration-1000 ${isDarkMode ? 'bg-jp-sun' : 'bg-jp-red'}`}
                style={{ width: `${progressToNext}%` }}
              />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-8 rounded-[2.5rem] border-b-8 flex flex-col items-center justify-center text-center transition-all hover:-translate-y-2 ${isDarkMode ? 'bg-[#1A1A2E] border-black shadow-xl' : 'bg-white border-jp-sky shadow-lg'}`}>
            <Flame size={48} className="text-orange-500 mb-3 animate-pulse" />
            <span className="text-4xl font-black">{streak}</span>
            <span className="text-[10px] font-black uppercase opacity-60 mt-1 tracking-widest">Días Racha</span>
          </div>

          <div className={`p-8 rounded-[2.5rem] border-b-8 flex flex-col items-center justify-center text-center transition-all hover:-translate-y-2 ${isDarkMode ? 'bg-[#1A1A2E] border-black shadow-xl' : 'bg-white border-jp-red shadow-lg'}`}>
            <Trophy size={48} className="text-yellow-400 mb-3" />
            <span className="text-4xl font-black">{xp}</span>
            <span className="text-[10px] font-black uppercase opacity-60 mt-1 tracking-widest">Total XP</span>
          </div>

          <div className={`p-8 rounded-[2.5rem] border-b-8 flex flex-col items-center justify-center text-center col-span-2 relative overflow-hidden ${isDarkMode ? 'bg-[#1A1A2E] border-black shadow-xl' : 'bg-jp-sun-light/30 border-jp-sun shadow-lg'}`}>
            <div className="flex gap-2 mb-4">
              <Star size={24} className="text-yellow-400 fill-yellow-400" />
              <Star size={24} className="text-yellow-400 fill-yellow-400" />
              <Star size={24} className="text-yellow-400 fill-yellow-400" />
            </div>
            <p className="text-xs font-black uppercase tracking-[0.2em] italic max-w-[200px] leading-relaxed">"La disciplina es el puente entre metas y logros."</p>
          </div>
        </div>

        {/* Rewards Section */}
        <div className="md:col-span-2 space-y-6 py-6">
          <h4 className="text-[11px] font-black uppercase tracking-[0.4em] opacity-60 flex items-center gap-3 ml-2">
            <Award size={20} className={isDarkMode ? 'text-jp-sun' : 'text-jp-red'}/> Próximos Desafíos
          </h4>
          <div className="space-y-4">
            {[
              { title: 'Primeros Pasos', desc: 'Llega a 100 XP', target: 100, color: 'border-jp-sky' },
              { title: 'Guerrero Constante', desc: 'Racha de 7 días', target: 7, type: 'streak', color: 'border-jp-red' },
              { title: 'Maestro del Saber', desc: 'Sube a 1000 XP', target: 1000, color: 'border-jp-sun' }
            ].map((logro, i) => {
              const val = logro.type === 'streak' ? streak : xp;
              const isLocked = val < logro.target;
              return (
                <div key={i} className={`p-6 rounded-[2.5rem] border-b-8 flex justify-between items-center transition-all ${isLocked ? 'opacity-50 bg-slate-100 grayscale border-slate-200' : `bg-white border-b-jp-red transform hover:scale-[1.02] shadow-md`} ${isDarkMode && !isLocked ? 'bg-[#1A1A2E] border-black' : ''} ${logro.color && !isLocked ? `border-${logro.color}` : ''}`}>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${isLocked ? 'bg-slate-200' : 'bg-jp-red-light/20'}`}>
                      <Award size={20} className={isLocked ? 'text-slate-400' : 'text-jp-red'} />
                    </div>
                    <div>
                      <p className="text-sm font-black uppercase tracking-wider">{logro.title}</p>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">{logro.desc}</p>
                    </div>
                  </div>
                  {isLocked ? <Shield size={20} className="text-slate-300"/> : <div className="p-1 bg-green-500 rounded-full text-white"><CheckCircle size={20} /></div>}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Bushido;
