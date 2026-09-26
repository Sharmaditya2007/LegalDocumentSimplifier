import React from 'react';

const MinimalLuxuryBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030305]">
      {/* Top Subtle Ambient Light Bleed (Apple Vision Pro style) */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-500/10 via-sky-500/5 to-transparent blur-[160px] rounded-full" />
      
      {/* Soft Center Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-900/10 blur-[200px] rounded-full" />

      {/* Subtle Bottom Ambient Tone */}
      <div className="absolute -bottom-40 right-1/4 w-[600px] h-[500px] bg-slate-900/30 blur-[180px] rounded-full" />
    </div>
  );
};

export default MinimalLuxuryBackground;
