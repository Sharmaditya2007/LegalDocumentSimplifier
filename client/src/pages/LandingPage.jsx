import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Scale,
  Sparkles,
  ShieldAlert,
  FileCheck2,
  GitCompare,
  MessageSquare,
  Calendar,
  ArrowRight,
  CheckCircle,
  Zap,
  Lock,
  ChevronDown,
  Check,
  Shield,
  Cpu,
  Terminal,
  Activity,
  Compass,
  Layers,
  Radio
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { loginAsDemo } = useAuth();
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedDemoClause, setSelectedDemoClause] = useState('termination');

  const demoClauses = {
    termination: {
      title: '100% Termination Penalty',
      legalese: '"Customer may terminate for convenience prior to expiration only upon payment of 100% of all remaining fees through the full 24-month term."',
      plainEnglish: 'You cannot cancel early without paying for the entire 2-year contract. If you cancel on day 30, you still owe all 23 remaining months.',
      risk: 'HIGH',
      riskScore: 88,
      advice: 'Negotiate 30-day notice and cap cancellation fees at 1–2 months of service.'
    },
    renewal: {
      title: '60-Day Auto-Renewal + 10% Surge',
      legalese: '"This Agreement shall automatically renew for successive 12-month periods at a 10% fee increase unless Customer provides notice at least sixty (60) days prior."',
      plainEnglish: 'Miss the notice deadline by 1 day and you are locked in for another full year at 10% higher cost.',
      risk: 'HIGH',
      riskScore: 76,
      advice: 'Shorten notice to 30 days and cap annual price increases to CPI (max 3%).'
    },
    indemnity: {
      title: 'Unilateral Indemnity Trap',
      legalese: '"Customer agrees to defend and indemnify Provider from all third-party claims. Provider provides no reciprocal indemnification for IP infringement."',
      plainEnglish: 'You pay Provider’s legal defense if sued, but they do not protect you if their software infringes someone else’s patent.',
      risk: 'CRITICAL',
      riskScore: 94,
      advice: 'Require mutual indemnification and demand vendor IP defense coverage.'
    }
  };

  const faqs = [
    {
      q: 'Will my contracts be used to train AI models?',
      a: 'No. All uploaded documents are processed in private, ephemeral memory and never stored for public AI model training.'
    },
    {
      q: 'What file formats are supported?',
      a: 'We support PDF (digital & OCR scanned), Word (.docx, .doc), and plain text documents.'
    },
    {
      q: 'How does the contract comparison engine work?',
      a: 'It computes semantic AST and clause-level diffs—highlighting modified obligations, new liabilities, and altered deadlines.'
    },
    {
      q: 'Is LegalEase AI truly 100% free?',
      a: 'Yes. All core features including document simplification, risk scoring, version diffs, AI chat copilot, and timeline sentinel are completely free.'
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#030508] text-slate-100 overflow-hidden font-sans">
      {/* 3D Perspective Cosmic Grid & Starfield */}
      <div className="cosmic-grid" />
      <div className="starfield-canvas" />

      {/* Floating Ambient Glowing Orbs */}
      <div className="floating-orb absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="floating-orb-delayed absolute top-1/3 right-1/4 w-[500px] h-[400px] bg-amberAccent-500/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-2/3 left-1/3 w-[450px] h-[350px] bg-purple-600/10 blur-[160px] pointer-events-none rounded-full" />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-28 md:pb-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          
          {/* Behfar-Style Retro HUD Lens Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amberAccent-500/30 bg-amberAccent-500/10 text-amberAccent-400 text-xs font-mono uppercase tracking-widest mb-8 shadow-glow-amber">
            <Radio className="w-3.5 h-3.5 animate-pulse text-amberAccent-400" />
            <span>Neural Legal Intelligence • v2.6 Space Edition</span>
          </div>

          {/* Headline with Retro Sci-Fi Laser Flare */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] font-heading max-w-4xl mx-auto">
            Review Contracts in Seconds.{' '}
            <span className="block mt-2 title-laser-flare gradient-text-amber font-display">
              Spot Hidden Risks.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-8 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            LegalEase AI decodes dense legalese into plain English, flags one-sided liabilities, compares draft revisions, and answers questions with verified clause citations.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-amberAccent-500 hover:bg-amberAccent-400 text-obsidian-950 font-bold text-sm shadow-glow-amber flex items-center justify-center gap-2 transition-all hover:scale-105 font-heading tracking-wide"
            >
              <span>Launch Free Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => {
                loginAsDemo('user');
                navigate('/dashboard');
              }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-white/15 bg-obsidian-900/80 hover:bg-obsidian-800 text-slate-200 hover:text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 font-heading"
            >
              <Zap className="w-4 h-4 text-amberAccent-400" />
              <span>Explore Live Demo</span>
            </button>
          </div>

          {/* Tech Pill Row */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <span className="tech-pill"><Check className="w-3 h-3 text-emerald-400" /> 100% Free Access</span>
            <span className="tech-pill"><Check className="w-3 h-3 text-emerald-400" /> Instant 1-Click Samples</span>
            <span className="tech-pill"><Check className="w-3 h-3 text-emerald-400" /> No Credit Card</span>
            <span className="tech-pill"><Check className="w-3 h-3 text-emerald-400" /> Zero Model Training</span>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16 flex flex-col items-center justify-center gap-2 opacity-60">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">Scroll to Explore</span>
            <div className="w-5 h-8 rounded-full border border-slate-600 flex items-start justify-center p-1">
              <div className="w-1 h-2 rounded-full bg-amberAccent-400 mouse-wheel-anim" />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive HUD Clause Viewfinder Lens */}
      <section id="sandbox" className="py-16 bg-obsidian-950/80 border-y border-white/10 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
              <Compass className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '12s' }} />
              <span>HUD Viewfinder Lens</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
              Interactive Clause Audit Lens
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Select a clause to see the neural analyzer identify risk vectors in real time:
            </p>

            {/* Selector Pills */}
            <div className="mt-6 inline-flex p-1 rounded-full behfar-nav-pill border border-white/10">
              <button
                onClick={() => setSelectedDemoClause('termination')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  selectedDemoClause === 'termination'
                    ? 'bg-amberAccent-500 text-obsidian-950 font-bold shadow-glow-amber'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Termination Penalty
              </button>
              <button
                onClick={() => setSelectedDemoClause('renewal')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  selectedDemoClause === 'renewal'
                    ? 'bg-amberAccent-500 text-obsidian-950 font-bold shadow-glow-amber'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Auto-Renewal Trap
              </button>
              <button
                onClick={() => setSelectedDemoClause('indemnity')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  selectedDemoClause === 'indemnity'
                    ? 'bg-amberAccent-500 text-obsidian-950 font-bold shadow-glow-amber'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Indemnity Trap
              </button>
            </div>
          </div>

          {/* Circular/HUD Display Card */}
          <div className="glow-laser-card hud-scanline rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl relative overflow-hidden">
            {/* HUD Corner Accents */}
            <div className="absolute top-3 left-3 text-[9px] font-mono text-cyan-400/70 uppercase tracking-widest">[HUD_LENS_01]</div>
            <div className="absolute top-3 right-3 text-[9px] font-mono text-amberAccent-400/80 uppercase tracking-widest">[ANALYSIS_ACTIVE]</div>

            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10">
              <span className="font-bold text-base text-white flex items-center gap-2 font-heading">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                {demoClauses[selectedDemoClause].title}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40">
                {demoClauses[selectedDemoClause].risk} RISK ({demoClauses[selectedDemoClause].riskScore}/100)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6 text-xs">
              {/* Raw Clause */}
              <div className="p-5 rounded-2xl bg-obsidian-950/90 border border-white/10">
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 block mb-2">
                  Original Legal Text:
                </span>
                <p className="font-mono text-slate-300 leading-relaxed italic text-xs">
                  {demoClauses[selectedDemoClause].legalese}
                </p>
              </div>

              {/* Plain English Translation & Advice */}
              <div className="p-5 rounded-2xl bg-amberAccent-500/5 border border-amberAccent-500/30">
                <span className="font-mono text-[10px] uppercase tracking-wider text-amberAccent-400 block mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Plain-English Meaning:
                </span>
                <p className="text-slate-100 leading-relaxed font-medium text-xs">
                  {demoClauses[selectedDemoClause].plainEnglish}
                </p>
                <div className="mt-4 pt-3 border-t border-amberAccent-500/20">
                  <span className="font-bold text-amberAccent-400 block mb-1 font-mono text-[11px]">Recommended Negotiation:</span>
                  <p className="text-slate-300 leading-normal text-xs">
                    {demoClauses[selectedDemoClause].advice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Constellation Features Grid */}
      <section id="features" className="py-20 md:py-28 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-amberAccent-400 mb-2">
              <Layers className="w-4 h-4" />
              <span>Core Modules</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
              Platform Features
            </h2>
            <p className="mt-3 text-slate-400 text-sm">
              Engineered for absolute contract clarity and effortless legal risk mitigation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="glass-card rounded-2xl p-6 border border-white/10 hover:border-amberAccent-500/40">
              <div className="w-10 h-10 rounded-xl bg-amberAccent-500/10 border border-amberAccent-500/30 flex items-center justify-center text-amberAccent-400 mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2 font-heading">Plain-English Translation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Transforms convoluted legalese into clean, digestible summaries anyone can understand.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card rounded-2xl p-6 border border-white/10 hover:border-rose-500/40">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2 font-heading">Automated Risk Scoring</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Scores agreements from 0 to 100, spotlighting unfair penalties and one-sided indemnity terms.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card rounded-2xl p-6 border border-white/10 hover:border-cyan-500/40">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                <GitCompare className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2 font-heading">Version Diff Engine</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Compares draft revisions side-by-side to highlight newly introduced changes and slipped terms.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="glass-card rounded-2xl p-6 border border-white/10 hover:border-emerald-500/40">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2 font-heading">Citation-Backed Copilot</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ask precise questions and receive answers linked directly to verified section citations.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="glass-card rounded-2xl p-6 border border-white/10 hover:border-purple-500/40">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2 font-heading">Deadline Sentinel</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Extracts key non-renewal notice windows, payment deadlines, and expiration milestones automatically.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="glass-card rounded-2xl p-6 border border-white/10 hover:border-amberAccent-500/40">
              <div className="w-10 h-10 rounded-xl bg-amberAccent-500/10 border border-amberAccent-500/30 flex items-center justify-center text-amberAccent-400 mb-4">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2 font-heading">Universal File Parsing</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Upload PDFs, Word files (.docx), or plain text with automated structure parsing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 100% Free Platform Guarantee */}
      <section id="free-access" className="py-20 bg-obsidian-950/70 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Free Platform — Zero Subscriptions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            Full Neural Legal Access For Everyone
          </h2>
          <p className="mt-3 text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
            Enjoy full access to contract simplification, clause risk scoring, draft diffing, citation copilot, and milestone tracking without paying a dime.
          </p>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-obsidian-900 border border-white/10">
              <span className="text-emerald-400 text-xs font-bold block mb-1">✓ Unlimited Audits</span>
              <p className="text-[11px] text-slate-400">Analyze any number of agreements.</p>
            </div>
            <div className="p-4 rounded-2xl bg-obsidian-900 border border-white/10">
              <span className="text-emerald-400 text-xs font-bold block mb-1">✓ Full Diff Engine</span>
              <p className="text-[11px] text-slate-400">Compare versions side-by-side.</p>
            </div>
            <div className="p-4 rounded-2xl bg-obsidian-900 border border-white/10">
              <span className="text-emerald-400 text-xs font-bold block mb-1">✓ AI Copilot Q&A</span>
              <p className="text-[11px] text-slate-400">Direct clause citations.</p>
            </div>
            <div className="p-4 rounded-2xl bg-obsidian-900 border border-white/10">
              <span className="text-emerald-400 text-xs font-bold block mb-1">✓ Deadline Sentinel</span>
              <p className="text-[11px] text-slate-400">Track notice windows & dates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-bold text-white font-heading">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="glass-card rounded-2xl border border-white/10 overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-white hover:text-amberAccent-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === index ? 'rotate-180 text-amberAccent-400' : ''}`} />
                </button>
                {activeFaq === index && (
                  <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 border-t border-white/10 bg-obsidian-950 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-white font-heading">
            Audit your next contract with confidence.
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Test any contract instantly or try our 1-click sample agreements.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              to="/register"
              className="px-7 py-3 rounded-full bg-amberAccent-500 hover:bg-amberAccent-400 text-obsidian-950 font-bold text-xs shadow-glow-amber transition-all hover:scale-105 font-heading"
            >
              Get Started Free
            </Link>
            <button
              onClick={() => {
                loginAsDemo('user');
                navigate('/dashboard');
              }}
              className="px-6 py-3 rounded-full border border-white/15 bg-obsidian-900 hover:bg-obsidian-800 text-slate-200 text-xs font-semibold transition-all font-heading"
            >
              Open Interactive Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
