import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Zap,
  Check,
  Radio,
  FileText,
  Sparkles,
  Compass
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { loginAsDemo } = useAuth();
  const navigate = useNavigate();

  // 4-Stage Timed Cinematic Reveal Sequence (Moonsworth Style)
  // Stage 1 (0s): Just the bold central title
  // Stage 2 (1.2s): Left & Right side crosshairs (+) appear
  // Stage 3 (2.4s): 4 corner reticles, background visual bloom, and monospace subtitle appear
  // Stage 4 (3.6s): Top navigation, action CTAs, and interactive telemetry card fully unlock
  const [stage, setStage] = useState(1);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

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

  const handleMouseMove = (e) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - card.left) / card.width - 0.5) * 14;
    const y = ((e.clientY - card.top) / card.height - 0.5) * -14;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="relative min-h-[calc(100vh-120px)] flex flex-col items-center justify-center bg-[#030508] text-slate-100 overflow-hidden font-sans py-12 md:py-16 select-none">
      
      {/* Background Visuals Bloom (Stage 3+) */}
      <div
        className={`transition-opacity duration-1000 ${
          stage >= 3 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="lunar-eclipse-arc" />
        <div className="lunar-horizon-ring" />
        <div className="cosmic-grid" />
        <div className="floating-orb absolute top-8 left-1/4 w-[450px] h-[450px] bg-cyan-500/10 blur-[160px] pointer-events-none rounded-full" />
        <div className="floating-orb-delayed absolute top-1/4 right-1/4 w-[480px] h-[450px] bg-amberAccent-500/10 blur-[170px] pointer-events-none rounded-full" />
      </div>

      {/* Main Container */}
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 text-center relative z-10 flex flex-col items-center justify-center">
        
        {/* Geometric Hero Framing Box */}
        <div className="relative w-full py-12 sm:py-20 px-6 sm:px-12 rounded-3xl transition-all duration-700 flex flex-col items-center justify-center">
          
          {/* STAGE 3: 4-Corner Crosshair Reticles (Positioned at Box Corners) */}
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
              stage >= 3 ? 'opacity-50' : 'opacity-0'
            }`}
          >
            <div className="absolute top-2 left-2 text-white">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M10.5 0H11.5V22H10.5V0Z" fill="currentColor" />
                <path d="M22 10.5V11.5L0 11.5L0 10.5L22 10.5Z" fill="currentColor" />
              </svg>
            </div>
            <div className="absolute top-2 right-2 text-white">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M10.5 0H11.5V22H10.5V0Z" fill="currentColor" />
                <path d="M22 10.5V11.5L0 11.5L0 10.5L22 10.5Z" fill="currentColor" />
              </svg>
            </div>
            <div className="absolute bottom-2 left-2 text-white">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M10.5 0H11.5V22H10.5V0Z" fill="currentColor" />
                <path d="M22 10.5V11.5L0 11.5L0 10.5L22 10.5Z" fill="currentColor" />
              </svg>
            </div>
            <div className="absolute bottom-2 right-2 text-white">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M10.5 0H11.5V22H10.5V0Z" fill="currentColor" />
                <path d="M22 10.5V11.5L0 11.5L0 10.5L22 10.5Z" fill="currentColor" />
              </svg>
            </div>
          </div>

          {/* Title Area with Left & Right Side Crosshairs (Stage 2) */}
          <div className="relative w-full flex items-center justify-center my-4">
            
            {/* STAGE 2: Left Crosshair Reticle */}
            <div
              className={`hidden sm:block absolute left-2 md:left-8 transition-all duration-700 text-white ${
                stage >= 2 ? 'opacity-50 scale-100' : 'opacity-0 scale-75'
              }`}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M10.5 0H11.5V22H10.5V0Z" fill="currentColor" />
                <path d="M22 10.5V11.5L0 11.5L0 10.5L22 10.5Z" fill="currentColor" />
              </svg>
            </div>

            {/* STAGE 1: Main Clean Heading */}
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-tight font-sans transition-all duration-1000 ${
                stage >= 1 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
              }`}
            >
              Building the Future of Legal
            </h1>

            {/* STAGE 2: Right Crosshair Reticle */}
            <div
              className={`hidden sm:block absolute right-2 md:right-8 transition-all duration-700 text-white ${
                stage >= 2 ? 'opacity-50 scale-100' : 'opacity-0 scale-75'
              }`}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M10.5 0H11.5V22H10.5V0Z" fill="currentColor" />
                <path d="M22 10.5V11.5L0 11.5L0 10.5L22 10.5Z" fill="currentColor" />
              </svg>
            </div>
          </div>

          {/* STAGE 3: Clean Subtitle */}
          <p
            className={`mt-4 text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed font-sans transition-all duration-700 ${
              stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            LegalEase AI is a software studio crafting standout tools and experiences for contract clarity with precision, quality, and speed.
          </p>

          {/* STAGE 4: Action CTAs */}
          <div
            className={`mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 transition-all duration-700 ${
              stage >= 4 ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
          >
            <Link
              to="/register"
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#E85D36] hover:bg-[#ff6e47] text-white font-medium text-xs sm:text-sm shadow-glow flex items-center justify-center gap-2 transition-all hover:scale-105 tracking-wide"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => {
                loginAsDemo('user');
                navigate('/dashboard');
              }}
              className="w-full sm:w-auto px-7 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Instant Demo</span>
            </button>
          </div>
        </div>

        {/* STAGE 4: 3D HUD Telemetry Showcase Preview Card */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
            transition: 'transform 0.15s ease-out',
          }}
          className={`mt-6 max-w-2xl w-full glow-laser-card hud-scanline p-5 sm:p-6 text-left rounded-2xl border border-white/15 shadow-2xl relative overflow-hidden group cursor-pointer transition-all duration-1000 ${
            stage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
          onClick={() => {
            loginAsDemo('user');
            navigate('/dashboard');
          }}
        >
          <div className="flex items-center justify-between text-[9px] font-mono text-cyan-400/80 uppercase tracking-widest pb-3 border-b border-white/10">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>[AI_PIPELINE: ACTIVE]</span>
            </span>
            <span className="text-amberAccent-400/80">[MODEL: NEURAL_LEGAL_V2]</span>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-amberAccent-500/10 border border-amberAccent-500/30 flex items-center justify-center text-amberAccent-400">
                <FileText className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Standard SaaS Master Agreement</span>
                <span className="text-[10px] text-slate-400 font-mono">24-Month Cloud Term</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40">
              HIGH RISK (78/100)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-xs">
            <div className="p-2.5 rounded-lg bg-obsidian-950/90 border border-white/10">
              <span className="text-[10px] font-mono text-slate-400 block mb-0.5">Detected Penalty:</span>
              <p className="text-slate-200 text-[11px] font-mono">
                "100% early termination damages penalty."
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-amberAccent-500/10 border border-amberAccent-500/30">
              <span className="text-[10px] font-mono text-amberAccent-400 block mb-0.5 flex items-center gap-1">
                <Sparkles className="w-3" /> Plain English:
              </span>
              <p className="text-slate-200 text-[11px] font-medium">
                Cancelling early requires full payment of remaining term.
              </p>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span className="flex items-center gap-1 text-cyan-400">
              <Compass className="w-3 h-3 animate-spin" style={{ animationDuration: '8s' }} /> Click to explore live in interactive dashboard
            </span>
            <span className="text-amberAccent-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
              Launch <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* STAGE 4: Minimal Badges */}
        <div
          className={`mt-8 flex flex-wrap items-center justify-center gap-2.5 transition-all duration-700 ${
            stage >= 4 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="tech-pill"><Check className="w-3 h-3 text-emerald-400" /> Instant Analysis</span>
          <span className="tech-pill"><Check className="w-3 h-3 text-emerald-400" /> 1-Click Samples</span>
          <span className="tech-pill"><Check className="w-3 h-3 text-emerald-400" /> Private & Secure</span>
          <span className="tech-pill"><Check className="w-3 h-3 text-emerald-400" /> 100% Free</span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
