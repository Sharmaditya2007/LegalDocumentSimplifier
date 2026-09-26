import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

const CinematicCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is touch/mobile
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsMobile(true);
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setCoords({ x: Math.round(mouseX), y: Math.round(mouseY) });

      // Immediate position for center dot
      gsap.set(dot, { x: mouseX, y: mouseY });

      // Check if hovering a button or link
      const target = e.target;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('.card-3d')
      ) {
        setIsHoveringClickable(true);
      } else {
        setIsHoveringClickable(false);
      }
    };

    const handleMouseDown = () => {
      gsap.to([dot, ring], { scale: 0.7, duration: 0.15 });
    };

    const handleMouseUp = () => {
      gsap.to([dot, ring], { scale: 1, duration: 0.25, ease: 'back.out(2)' });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Smooth inertia loop for outer ring
    let animId;
    const loop = () => {
      animId = requestAnimationFrame(loop);
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;
      gsap.set(ring, { x: ringX, y: ringY });
    };
    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Center Laser Reticle Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-cyan-400 pointer-events-none z-[99999] shadow-[0_0_10px_#00d2ff]"
      />

      {/* Trailing Inertia HUD Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -ml-5 -mt-5 rounded-full pointer-events-none z-[99998] transition-all duration-300 border ${
          isHoveringClickable
            ? 'w-14 h-14 -ml-7 -mt-7 border-amberAccent-400/80 bg-amberAccent-500/10 shadow-[0_0_20px_rgba(235,184,126,0.5)]'
            : 'w-10 h-10 border-cyan-400/40 shadow-[0_0_12px_rgba(0,210,255,0.25)]'
        }`}
      >
        {/* Subtle Crosshair Ticks */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-1.5 bg-cyan-400/60" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-1.5 bg-cyan-400/60" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-[1px] bg-cyan-400/60" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-[1px] bg-cyan-400/60" />
      </div>
    </>
  );
};

export default CinematicCursor;
