import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Zap,
  ShieldAlert,
  FileSearch,
  GitCompare,
  MessageSquareText,
  CalendarClock,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Lock,
  Cpu
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { loginAsDemo } = useAuth();
  const navigate = useNavigate();

  // 4-Stage Timed Cinematic Reveal Sequence (Moonsworth Style)
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

  const capabilities = [
    {
      icon: FileSearch,
      title: 'Neural Simplifier',
      desc: 'Converts complex legal clauses into plain, crystal-clear English summaries in seconds.',
      badge: 'Core Engine'
    },
    {
      icon: ShieldAlert,
      title: 'Risk Sentinel',
      desc: 'Identifies hidden penalties, indemnities, unilateral terminations, and liability traps.',
      badge: 'Risk Analysis'
    },
    {
      icon: GitCompare,
      title: 'Contract Diff Engine',
      desc: 'Side-by-side visual comparison highlighting sneaky additions and redline alterations.',
      badge: 'Comparison'
    },
    {
      icon: MessageSquareText,
      title: 'Legal AI Copilot',
      desc: 'Interactive document assistant answering specific questions with direct citation links.',
      badge: 'Interactive'
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'Upload Any Contract',
      desc: 'Drop your PDF, DOCX, or text agreement with enterprise-grade encryption.'
    },
    {
      num: '02',
      title: 'Neural Intelligence Scan',
      desc: 'Deep AI scans every paragraph for clauses, risks, deadlines, and ambiguous terms.'
    },
    {
      num: '03',
      title: 'Instant Actionable Clarity',
      desc: 'Review plain-English breakdowns, risk heatmaps, and timeline milestones.'
    }
  ];

  return (
    <div className="relative w-full bg-[#030508] text-slate-100 overflow-x-hidden font-sans">
      
      {/* =========================================================================
          HERO SECTION: 4-Stage Timed Cinematic Reveal (Moonsworth Style)
          ========================================================================= */}
      <section className="relative w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center overflow-hidden select-none px-4 py-16">
        
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

        {/* Center Cinematic Hero Box */}
        <div className="relative max-w-3xl w-full mx-auto px-6 sm:px-14 py-14 sm:py-20 flex flex-col items-center justify-center text-center z-10">
          
          {/* STAGE 3: 4-Corner Crosshairs (+) */}
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-700 text-white/50 ${
              stage >= 3 ? 'opacity-60' : 'opacity-0'
            }`}
          >
            <div className="absolute top-0 left-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M11.5 0H12.5V24H11.5V0Z" fill="currentColor" />
                <path d="M24 11.5V12.5L0 12.5L0 11.5L24 11.5Z" fill="currentColor" />
              </svg>
            </div>
            <div className="absolute top-0 right-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M11.5 0H12.5V24H11.5V0Z" fill="currentColor" />
                <path d="M24 11.5V12.5L0 12.5L0 11.5L24 11.5Z" fill="currentColor" />
              </svg>
            </div>
            <div className="absolute bottom-0 left-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M11.5 0H12.5V24H11.5V0Z" fill="currentColor" />
                <path d="M24 11.5V12.5L0 12.5L0 11.5L24 11.5Z" fill="currentColor" />
              </svg>
            </div>
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
      </section>

      {/* =========================================================================
          SECTION 2: Studio Capabilities (Sleek Product Cards)
          ========================================================================= */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 border-t border-white/10 z-10">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest block mb-2">
            [AI_CAPABILITIES]
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Precision Tools for Complex Agreements
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((item, idx) => (
            <div
              key={idx}
              className="glass-card p-6 rounded-2xl border border-white/10 hover:border-amberAccent-500/40 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amberAccent-500/10 border border-amberAccent-500/30 flex items-center justify-center text-amberAccent-400 group-hover:scale-110 transition-transform">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-amberAccent-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="text-slate-500">Autonomous Neural Engine</span>
                <span className="text-amberAccent-400 font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Explore <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: 3-Step Execution Workflow
          ========================================================================= */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 border-t border-white/10 z-10">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-[11px] font-mono text-amberAccent-400 uppercase tracking-widest block mb-2">
            [WORKFLOW]
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            From Dense Legalese to Clarity in 3 Seconds
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-obsidian-900/60 border border-white/10 relative overflow-hidden"
            >
              <div className="text-3xl font-mono font-bold text-white/10 mb-4">
                {step.num}
              </div>
              <h3 className="text-base font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: Impact Metrics
          ========================================================================= */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-white/10 z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono">10,000+</div>
            <div className="text-xs text-slate-400 mt-1 font-mono">Contracts Decoded</div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-2xl sm:text-3xl font-bold text-amberAccent-400 font-mono">&lt; 2.4s</div>
            <div className="text-xs text-slate-400 mt-1 font-mono">Inference Speed</div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-2xl sm:text-3xl font-bold text-cyan-400 font-mono">99.2%</div>
            <div className="text-xs text-slate-400 mt-1 font-mono">Accuracy Rating</div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono">100%</div>
            <div className="text-xs text-slate-400 mt-1 font-mono">Free Open Access</div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: Bottom CTA & Footer
          ========================================================================= */}
      <section className="relative max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center border-t border-white/10 z-10">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-4">
          Ready to decode your legal agreements?
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-8 leading-relaxed font-sans">
          Join thousands of professionals uncovering hidden risks in seconds. No credit card required.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#E85D36] hover:bg-[#ff6e47] text-white font-medium text-xs sm:text-sm shadow-glow flex items-center justify-center gap-2 transition-all hover:scale-105"
          >
            <span>Start Free Analysis</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={() => {
              loginAsDemo('user');
              navigate('/dashboard');
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white text-xs sm:text-sm font-medium transition-all"
          >
            Launch Instant Demo
          </button>
        </div>

        {/* Minimal Footer */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-4">
          <span>© 2026 LegalEase AI Studio. All rights reserved.</span>
          <div className="flex items-center gap-6 text-slate-400">
            <Link to="/login" className="hover:text-white transition-colors">Sign In</Link>
            <Link to="/register" className="hover:text-white transition-colors">Register</Link>
            <Link to="/dashboard" className="hover:text-white transition-colors">Universe</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
