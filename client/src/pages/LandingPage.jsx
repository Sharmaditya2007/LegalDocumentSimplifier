import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { loginAsDemo } = useAuth();
  const navigate = useNavigate();

  // 4-Stage Timed Cinematic Reveal Sequence (Moonsworth Style)
  // Stage 1 (0.0s - 1.2s): Pitch black, only the central title fades in
  // Stage 2 (1.2s - 2.4s): Left & Right side crosshairs (+) fade in next to title
  // Stage 3 (2.4s - 3.6s): 4 corner reticles bloom, background glows, and subtitle fades in
  // Stage 4 (3.6s onwards): Interactive CTA buttons fade into view
  const [stage, setStage] = useState(1);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(2), 1200);
    const t2 = setTimeout(() => setStage(3), 2400);
    const t3 = setTimeout(() => setStage(4), 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="relative w-full h-[calc(100vh-80px)] min-h-[580px] flex flex-col items-center justify-center bg-[#030508] text-slate-100 overflow-hidden font-sans select-none px-4">
      
      {/* Background Visuals Bloom (Stage 3+) */}
      <div
        className={`transition-opacity duration-1000 pointer-events-none ${
          stage >= 3 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="lunar-eclipse-arc" />
        <div className="lunar-horizon-ring" />
        <div className="cosmic-grid" />
        <div className="floating-orb absolute top-12 left-1/3 w-[500px] h-[500px] bg-cyan-500/10 blur-[160px] rounded-full" />
        <div className="floating-orb-delayed absolute bottom-12 right-1/3 w-[500px] h-[500px] bg-amberAccent-500/10 blur-[170px] rounded-full" />
      </div>

      {/* Center Cinematic Stage Container */}
      <div className="relative max-w-3xl w-full mx-auto px-8 sm:px-14 py-16 sm:py-20 flex flex-col items-center justify-center text-center z-10">
        
        {/* STAGE 3: 4-Corner Crosshairs (+) */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-700 text-white/50 ${
            stage >= 3 ? 'opacity-60' : 'opacity-0'
          }`}
        >
          {/* Top-Left */}
          <div className="absolute top-0 left-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M11.5 0H12.5V24H11.5V0Z" fill="currentColor" />
              <path d="M24 11.5V12.5L0 12.5L0 11.5L24 11.5Z" fill="currentColor" />
            </svg>
          </div>
          {/* Top-Right */}
          <div className="absolute top-0 right-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M11.5 0H12.5V24H11.5V0Z" fill="currentColor" />
              <path d="M24 11.5V12.5L0 12.5L0 11.5L24 11.5Z" fill="currentColor" />
            </svg>
          </div>
          {/* Bottom-Left */}
          <div className="absolute bottom-0 left-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M11.5 0H12.5V24H11.5V0Z" fill="currentColor" />
              <path d="M24 11.5V12.5L0 12.5L0 11.5L24 11.5Z" fill="currentColor" />
            </svg>
          </div>
          {/* Bottom-Right */}
          <div className="absolute bottom-0 right-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M11.5 0H12.5V24H11.5V0Z" fill="currentColor" />
              <path d="M24 11.5V12.5L0 12.5L0 11.5L24 11.5Z" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Title Area with Left & Right Crosshairs (Stage 2) */}
        <div className="relative w-full flex items-center justify-center">
          
          {/* STAGE 2: Left Side Crosshair */}
          <div
            className={`hidden sm:block absolute left-0 transition-all duration-700 text-white/50 ${
              stage >= 2 ? 'opacity-60 scale-100' : 'opacity-0 scale-75'
            }`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M11.5 0H12.5V24H11.5V0Z" fill="currentColor" />
              <path d="M24 11.5V12.5L0 12.5L0 11.5L24 11.5Z" fill="currentColor" />
            </svg>
          </div>

          {/* STAGE 1: Main Title */}
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-tight font-sans transition-all duration-1000 ${
              stage >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            Building the Future of Legal
          </h1>

          {/* STAGE 2: Right Side Crosshair */}
          <div
            className={`hidden sm:block absolute right-0 transition-all duration-700 text-white/50 ${
              stage >= 2 ? 'opacity-60 scale-100' : 'opacity-0 scale-75'
            }`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M11.5 0H12.5V24H11.5V0Z" fill="currentColor" />
              <path d="M24 11.5V12.5L0 12.5L0 11.5L24 11.5Z" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* STAGE 3: Monospace Subtitle */}
        <p
          className={`mt-6 text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed font-mono transition-all duration-700 ${
            stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          LegalEase AI is a software studio crafting standout tools and experiences for legal clarity with precision, quality, and speed.
        </p>

        {/* STAGE 4: Action CTAs */}
        <div
          className={`mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 transition-all duration-700 ${
            stage >= 4 ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'
          }`}
        >
          <Link
            to="/register"
            className="w-full sm:w-auto px-7 py-3 rounded-lg bg-[#E85D36] hover:bg-[#ff6e47] text-white font-medium text-xs sm:text-sm shadow-glow flex items-center justify-center gap-2 transition-all hover:scale-105 tracking-wide"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={() => {
              loginAsDemo('user');
              navigate('/dashboard');
            }}
            className="w-full sm:w-auto px-7 py-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Instant Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
