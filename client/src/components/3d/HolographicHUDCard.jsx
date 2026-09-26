import React from 'react';
import Card3DTilt from './Card3DTilt';

const HolographicHUDCard = ({
  children,
  className = '',
  hudTag = 'SYS.2035',
  status = 'ONLINE',
  maxTilt = 8,
  glowColor = 'amber',
  ...props
}) => {
  return (
    <Card3DTilt maxTilt={maxTilt} scale={1.01} className={`relative ${className}`} {...props}>
      <div className="relative glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 bg-obsidian-950/85 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden group">
        
        {/* 4-Corner Reticle Crosshairs */}
        <div className="absolute top-3 left-3 text-white/30 font-mono text-[9px] pointer-events-none select-none">
          + [{hudTag}]
        </div>
        <div className="absolute top-3 right-3 text-emerald-400 font-mono text-[9px] pointer-events-none select-none flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {status}
        </div>
        <div className="absolute bottom-3 left-3 text-white/20 font-mono text-[8px] pointer-events-none select-none">
          LOC.0x84F
        </div>
        <div className="absolute bottom-3 right-3 text-white/20 font-mono text-[8px] pointer-events-none select-none">
          SEC.TLS3
        </div>

        {/* Dynamic Holographic Scanline Overlay */}
        <div className="hud-scanline absolute inset-0 pointer-events-none opacity-40" />

        {/* Main Content Container with Layered 3D Depth */}
        <div className="relative z-10">{children}</div>

        {/* Bottom Ambient Glow Line */}
        <div className="absolute bottom-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-amberAccent-500/40 to-transparent group-hover:via-cyan-400/60 transition-colors" />
      </div>
    </Card3DTilt>
  );
};

export default HolographicHUDCard;
