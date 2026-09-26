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
  Cpu,
  Layers,
  FileText,
  AlertTriangle,
  Scale,
  Search,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { loginAsDemo } = useAuth();
  const navigate = useNavigate();

  // 4-Stage Timed Cinematic Reveal Sequence
  const [stage, setStage] = useState(1);
  const [activeDemoClause, setActiveDemoClause] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(2), 600);
    const t2 = setTimeout(() => setStage(3), 1200);
    const t3 = setTimeout(() => setStage(4), 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const demoClauses = [
    {
      title: 'Indemnification & Unlimited Liability Trap',
      risk: 'Critical Risk',
      riskColor: 'rose',
      legalese: '“Contractor shall indemnify, defend, and hold harmless Company and its affiliates from and against any and all claims, damages, liabilities, losses, costs, and expenses (including reasonable attorneys’ fees), arising without limitation from any breach or alleged omission, notwithstanding any statutory limitations of liability.”',
      plainEnglish: 'You are agreeing to pay all legal fees and unlimited damages for any claim against the company, even if you were only partly or not directly at fault. Your liability is completely uncapped.'
    },
    {
      title: 'Sneaky Auto-Renewal & Notice Lock-in',
      risk: 'High Risk',
      riskColor: 'amber',
      legalese: '“This Agreement shall automatically renew for successive terms of twenty-four (24) months unless either party provides written notice of non-renewal by certified mail no later than one hundred and eighty (180) days prior to expiration.”',
      plainEnglish: 'If you do not send physical certified mail at least 6 months before the contract ends, you are automatically locked in for another 2 full years with no early exit.'
    },
    {
      title: 'Overbroad Worldwide Non-Compete',
      risk: 'High Risk',
      riskColor: 'rose',
      legalese: '“During the term and for a period of thirty-six (36) months thereafter, Employee shall not directly or indirectly engage in, consult for, or invest in any business entity worldwide operating within the general scope of technology services.”',
      plainEnglish: 'You cannot work for, advise, or invest in any tech company anywhere in the world for 3 years after leaving, which is likely legally unenforceable but high risk.'
    }
  ];

  const capabilities = [
    {
      icon: FileSearch,
      title: 'Neural Simplifier',
      desc: 'Transforms dense legalese clauses into plain, crystal-clear English breakdowns with zero jargon.',
      badge: 'Core Engine',
      glow: 'from-amber-500/20 to-transparent',
      borderColor: 'group-hover:border-amberAccent-500/40'
    },
    {
      icon: ShieldAlert,
      title: 'Risk Sentinel',
      desc: 'Autonomous detection of hidden penalties, unilateral terminations, uncapped liabilities, and auto-renewals.',
      badge: 'Risk Analysis',
      glow: 'from-rose-500/20 to-transparent',
      borderColor: 'group-hover:border-rose-500/40'
    },
    {
      icon: GitCompare,
      title: 'Contract Diff Engine',
      desc: 'Side-by-side visual semantic redlining highlighting sneaky additions and sneaky clause modifications.',
      badge: 'Diff Engine',
      glow: 'from-purple-500/20 to-transparent',
      borderColor: 'group-hover:border-purple-500/40'
    },
    {
      icon: MessageSquareText,
      title: 'Citation AI Copilot',
      desc: 'Interactive contract assistant answering specific questions with direct section and paragraph citations.',
      badge: 'Interactive',
      glow: 'from-cyan-500/20 to-transparent',
      borderColor: 'group-hover:border-cyan-500/40'
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'Upload Any Agreement',
      desc: 'Drop your PDF, DOCX, or text agreement with enterprise-grade AES-256 in-transit encryption.',
      icon: FileText
    },
    {
      num: '02',
      title: 'Neural Intelligence Scan',
      desc: 'Autonomous multi-pass AI parses clauses, liability ceilings, hidden obligations, and notice deadlines.',
      icon: Cpu
    },
    {
      num: '03',
      title: 'Actionable Executive Clarity',
      desc: 'Review plain-English summaries, interactive risk heatmaps, side-by-side diffs, and deadline milestones.',
      icon: Sparkles
    }
  ];

  return (
    <div className="relative w-full bg-[#030508] text-slate-100 overflow-x-hidden font-sans">
      
      {/* =========================================================================
          HERO SECTION: 3D SaaS Cinematic Showcase
          ========================================================================= */}
      <section className="relative w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center overflow-hidden select-none px-4 sm:px-6 pt-12 pb-24">
        
        {/* Background Visuals Bloom */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="cosmic-grid" />
          <div className="floating-orb absolute top-8 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 blur-[170px] rounded-full" />
          <div className="floating-orb-delayed absolute bottom-12 right-1/4 w-[550px] h-[550px] bg-amberAccent-500/10 blur-[180px] rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/5 blur-[160px] rounded-full" />
        </div>

        {/* Center Hero Content Container */}
        <div className="relative max-w-4xl w-full mx-auto flex flex-col items-center justify-center text-center z-10">
          
          {/* Top Floating Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(235,184,126,0.15)] mb-6 transition-all duration-700 ${
              stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amberAccent-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amberAccent-500" />
            </span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-300 font-semibold">
              Neural Legal Intelligence 2.0
            </span>
            <span className="text-amberAccent-400 text-xs">• 100% Free</span>
          </div>

          {/* Main Title with Glowing Gradient */}
          <h1
            className={`text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] font-heading transition-all duration-1000 ${
              stage >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            Building the Future of <br />
            <span className="text-shimmer drop-shadow-sm">Legal Clarity</span>
          </h1>

          {/* Monospace Subtitle */}
          <p
            className={`mt-6 text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans transition-all duration-700 ${
              stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            LegalEase AI is an enterprise-grade intelligence platform that simplifies complex agreements, uncovers hidden liability traps, compares revisions, and gives you instant plain-English clarity.
          </p>

          {/* Action CTAs */}
          <div
            className={`mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 w-full sm:w-auto ${
              stage >= 3 ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'
            }`}
          >
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl btn-glow-gold text-obsidian-950 font-bold text-sm shadow-glow-amber flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => {
                loginAsDemo('user');
                navigate('/dashboard');
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 backdrop-blur-md hover:border-amberAccent-500/40"
            >
              <Zap className="w-4 h-4 text-amberAccent-400" />
              <span>Instant Interactive Demo</span>
            </button>
          </div>

          {/* Live Trust Metrics Bar */}
          <div
            className={`mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-mono text-slate-400 transition-all duration-700 ${
              stage >= 4 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span>AES-256 Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amberAccent-400" />
              <span>Instant AI Breakdown</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            3D FLOATING PRODUCT HERO MOCKUP
            ========================================================================= */}
        <div className="relative max-w-5xl w-full mx-auto mt-16 z-20 perspective-container">
          
          {/* Central Main 3D Card */}
          <div className="glass-panel-3d rounded-3xl p-6 sm:p-8 border border-white/15 bg-obsidian-950/80 shadow-[0_30px_70px_rgba(0,0,0,0.9)] backdrop-blur-2xl relative overflow-hidden card-3d">
            
            {/* Top Window Bar */}
            <div className="flex items-center justify-between pb-5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-xs font-mono text-slate-400 ml-3 hidden sm:inline">
                  Enterprise_Master_Services_Agreement_2026.pdf
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  Overall Risk: 72/100 (High Risk)
                </span>
              </div>
            </div>

            {/* Content Preview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              
              {/* Left Column: Plain-English Executive Summary */}
              <div className="md:col-span-2 space-y-4 text-left">
                <div className="flex items-center gap-2 text-xs font-mono text-amberAccent-400 font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Plain-English Neural Summary
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                  This Master Services Agreement contains several standard commercial provisions, but includes <strong className="text-rose-400 font-semibold">unilateral uncapped indemnity obligations</strong> and a <strong className="text-amber-300 font-semibold">hidden 180-day certified mail notice window</strong> for non-renewal. You are also subject to broad exclusivity restrictions.
                </p>

                {/* Key Insights Chips */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-obsidian-900 border border-white/10">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">Contract Type</span>
                    <span className="text-xs font-bold text-white">Commercial SaaS MSA</span>
                  </div>
                  <div className="p-3 rounded-xl bg-obsidian-900 border border-white/10">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">Detected Clauses</span>
                    <span className="text-xs font-bold text-white">18 Clauses Analyzed</span>
                  </div>
                </div>
              </div>

              {/* Right Column: AI Risk Sentinel Breakdown */}
              <div className="p-4 rounded-2xl bg-obsidian-900/90 border border-white/10 text-left space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                    Risk Breakdown
                  </span>
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                </div>
                
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/25">
                    <div className="flex items-center justify-between text-rose-300 font-semibold text-[11px]">
                      <span>Unlimited Indemnity</span>
                      <span className="font-mono text-[10px] text-rose-400">Section 12.2</span>
                    </div>
                    <p className="text-[10px] text-slate-300 mt-1">Requires contractor to cover all legal claims unconditionally.</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25">
                    <div className="flex items-center justify-between text-amber-300 font-semibold text-[11px]">
                      <span>Auto-Renewal Notice</span>
                      <span className="font-mono text-[10px] text-amber-400">Section 4.1</span>
                    </div>
                    <p className="text-[10px] text-slate-300 mt-1">180 days advance written notice required to terminate.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom 3D Ambient Flare */}
            <div className="absolute -bottom-10 left-1/4 right-1/4 h-20 bg-amberAccent-500/20 blur-3xl pointer-events-none rounded-full" />
          </div>

          {/* Floating 3D Badge 1: Top Right */}
          <div className="hidden lg:flex absolute -top-8 -right-8 glass-panel p-4 rounded-2xl border border-rose-500/30 shadow-[0_15px_35px_rgba(244,63,94,0.25)] floating-3d-slow items-center gap-3 bg-obsidian-950/90 z-30">
            <div className="w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-500/40 flex items-center justify-center text-rose-400 shadow-inner">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-mono uppercase text-rose-400 font-bold block">Liability Trap Flagged</span>
              <span className="text-xs font-bold text-white">Unilateral Termination Clause</span>
            </div>
          </div>

          {/* Floating 3D Badge 2: Bottom Left */}
          <div className="hidden lg:flex absolute -bottom-8 -left-8 glass-panel p-4 rounded-2xl border border-cyan-500/30 shadow-[0_15px_35px_rgba(0,210,255,0.2)] floating-3d-medium items-center gap-3 bg-obsidian-950/90 z-30">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-inner">
              <GitCompare className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">Diff Engine Active</span>
              <span className="text-xs font-bold text-white">v1 vs v2: 4 Alterations Detected</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: Interactive Live Clause Decoder Showcase
          ========================================================================= */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 border-t border-white/10 z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-mono text-amberAccent-400 uppercase tracking-widest block mb-2 font-bold">
            [INTERACTIVE_EVALUATION]
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
            Dense Legalese Translated to Plain English
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Click any clause below to test how our neural model instantly exposes hidden traps in plain terms:
          </p>
        </div>

        {/* Clause Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          {demoClauses.map((clause, idx) => (
            <button
              key={idx}
              onClick={() => setActiveDemoClause(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                activeDemoClause === idx
                  ? 'bg-amberAccent-500 text-obsidian-950 font-bold shadow-glow-amber scale-105'
                  : 'bg-obsidian-900 border border-white/10 text-slate-300 hover:text-white hover:border-white/30'
              }`}
            >
              <span>{clause.title}</span>
            </button>
          ))}
        </div>

        {/* Interactive Comparison Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl">
          {/* Left: Original Legalese */}
          <div className="p-6 rounded-2xl bg-obsidian-950 border border-white/10 relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase text-slate-400">Dense Original Text</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-white/5 border border-white/10 text-slate-400">
                  Standard PDF Agreement
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 italic font-mono leading-relaxed">
                {demoClauses[activeDemoClause].legalese}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-slate-500 font-mono">
              Typical reading time: ~3 mins • High complexity
            </div>
          </div>

          {/* Right: Plain-English AI Translation */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amberAccent-500/10 via-obsidian-950 to-obsidian-950 border border-amberAccent-500/30 relative flex flex-col justify-between shadow-[0_0_30px_rgba(235,184,126,0.1)]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase text-amberAccent-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Plain-English Neural Clarity
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                  {demoClauses[activeDemoClause].risk}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                {demoClauses[activeDemoClause].plainEnglish}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-amberAccent-400 font-mono">
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Actionable advice generated
              </span>
              <span className="text-[11px] text-slate-400 font-sans">Time saved: 98%</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: Core Studio Capabilities (3D Bento Grid)
          ========================================================================= */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 border-t border-white/10 z-10">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest block mb-2 font-bold">
            [AI_CAPABILITIES]
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
            Precision Intelligence for Every Contract
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((item, idx) => (
            <div
              key={idx}
              className={`card-3d glass-card p-7 rounded-3xl border border-white/10 transition-all group flex flex-col justify-between relative overflow-hidden ${item.borderColor}`}
            >
              {/* Background ambient corner glow */}
              <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${item.glow} blur-3xl pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity`} />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-inner">
                    <item.icon className="w-6 h-6 text-amberAccent-400" />
                  </div>
                  <span className="text-[10px] font-mono uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 font-bold">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amberAccent-300 transition-colors font-heading">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-mono relative z-10">
                <span className="text-slate-400">Autonomous Neural Engine</span>
                <span className="text-white font-semibold group-hover:text-amberAccent-400 group-hover:translate-x-1 transition-all flex items-center gap-1">
                  Explore <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: 3-Step Execution Workflow
          ========================================================================= */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 border-t border-white/10 z-10">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[11px] font-mono text-purple-400 uppercase tracking-widest block mb-2 font-bold">
            [WORKFLOW]
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
            From Dense Legalese to Clarity in Seconds
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="card-3d p-7 rounded-3xl bg-obsidian-900/70 border border-white/10 relative overflow-hidden group hover:border-amberAccent-500/40"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-mono font-black text-amberAccent-500/30 group-hover:text-amberAccent-500/70 transition-colors">
                  {step.num}
                </span>
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300">
                  <step.icon className="w-4 h-4 text-amberAccent-400" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-heading">
                {step.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: Impact Metrics Grid
          ========================================================================= */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-white/10 z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-6 rounded-2xl glass-card border border-white/10">
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono text-gradient-gold">10,000+</div>
            <div className="text-xs text-slate-400 mt-1 font-mono uppercase">Contracts Decoded</div>
          </div>
          <div className="p-6 rounded-2xl glass-card border border-white/10">
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono text-gradient-cyan">&lt; 2.4s</div>
            <div className="text-xs text-slate-400 mt-1 font-mono uppercase">Inference Speed</div>
          </div>
          <div className="p-6 rounded-2xl glass-card border border-white/10">
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono text-gradient-purple">99.2%</div>
            <div className="text-xs text-slate-400 mt-1 font-mono uppercase">Accuracy Rating</div>
          </div>
          <div className="p-6 rounded-2xl glass-card border border-white/10">
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono text-white">100%</div>
            <div className="text-xs text-slate-400 mt-1 font-mono uppercase">Free Open Access</div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: High-Converting Bottom CTA
          ========================================================================= */}
      <section className="relative max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center border-t border-white/10 z-10">
        <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-white/15 relative overflow-hidden shadow-2xl">
          {/* Radial Mesh Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-amberAccent-500/15 via-transparent to-transparent pointer-events-none" />

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 font-heading relative z-10">
            Ready to decode your legal agreements?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-8 leading-relaxed font-sans relative z-10">
            Join thousands of professionals uncovering hidden risks and saving hours on contract review in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl btn-glow-gold text-obsidian-950 font-bold text-sm shadow-glow-amber flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <span>Start Free Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => {
                loginAsDemo('user');
                navigate('/dashboard');
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white text-sm font-semibold transition-all backdrop-blur-md"
            >
              Launch Instant Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
