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
  ChevronDown,
  Check,
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
      title: '100% Cancellation Penalty',
      legalese: '"Customer may terminate only upon payment of 100% of all remaining fees through the 24-month term."',
      plainEnglish: 'You cannot cancel early without paying for the entire 2-year contract.',
      risk: 'HIGH',
      riskScore: 88,
      advice: 'Cap cancellation fees at 1 month of service.'
    },
    renewal: {
      title: 'Auto-Renewal Price Surge',
      legalese: '"Automatically renews for 12 months at +10% fee unless notice is given 60 days prior."',
      plainEnglish: 'Miss the 60-day deadline and pay 10% more for another full year.',
      risk: 'HIGH',
      riskScore: 76,
      advice: 'Reduce notice to 30 days and cap increases to 3%.'
    },
    indemnity: {
      title: 'One-Sided Indemnity',
      legalese: '"Customer indemnifies Provider from all claims. Provider provides no reciprocal IP indemnity."',
      plainEnglish: 'You pay their legal bills if sued, but they do not protect your IP.',
      risk: 'CRITICAL',
      riskScore: 94,
      advice: 'Demand mutual indemnification.'
    }
  };

  const faqs = [
    {
      q: 'Is my contract data private?',
      a: 'Yes. Files are processed securely in memory and never used to train public AI models.'
    },
    {
      q: 'Which file formats work?',
      a: 'PDF, Word (.docx), and plain text documents.'
    },
    {
      q: 'How does contract diffing work?',
      a: 'It scans revisions side-by-side to highlight newly added liabilities and altered terms.'
    },
    {
      q: 'Is it completely free?',
      a: 'Yes. All features are 100% free with no paywalls or subscriptions.'
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
      <section className="relative pt-16 pb-16 md:pt-24 md:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          
          {/* HUD Lens Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amberAccent-500/30 bg-amberAccent-500/10 text-amberAccent-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-glow-amber">
            <Radio className="w-3.5 h-3.5 animate-pulse text-amberAccent-400" />
            <span>AI Legal Document Intelligence</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
            Review Contracts in Seconds.{' '}
            <span className="block mt-2 title-laser-flare gradient-text-amber font-display">
              Spot Hidden Risks.
            </span>
          </h1>

          {/* Short Subtitle */}
          <p className="mt-6 text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Translate legalese into plain English, audit liabilities, compare revisions, and ask questions with clause citations.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              to="/register"
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-amberAccent-500 hover:bg-amberAccent-400 text-obsidian-950 font-bold text-xs shadow-glow-amber flex items-center justify-center gap-2 transition-all hover:scale-105 font-heading"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => {
                loginAsDemo('user');
                navigate('/dashboard');
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-full border border-white/15 bg-obsidian-900 hover:bg-obsidian-800 text-slate-200 text-xs font-semibold transition-all flex items-center justify-center gap-2 font-heading"
            >
              <Zap className="w-4 h-4 text-amberAccent-400" />
              <span>Instant Demo</span>
            </button>
          </div>

          {/* Tech Pill Row */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            <span className="tech-pill"><Check className="w-3 h-3 text-emerald-400" /> 100% Free</span>
            <span className="tech-pill"><Check className="w-3 h-3 text-emerald-400" /> 1-Click Samples</span>
            <span className="tech-pill"><Check className="w-3 h-3 text-emerald-400" /> No Card Needed</span>
            <span className="tech-pill"><Check className="w-3 h-3 text-emerald-400" /> Private & Secure</span>
          </div>
        </div>
      </section>

      {/* Clause Audit Lens */}
      <section id="sandbox" className="py-14 bg-obsidian-950/80 border-y border-white/10 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-1.5">
              <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '12s' }} />
              <span>Interactive Lens</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-white font-heading">
              Live Clause Risk Audit
            </h2>

            {/* Selector Pills */}
            <div className="mt-4 inline-flex p-1 rounded-full behfar-nav-pill border border-white/10">
              <button
                onClick={() => setSelectedDemoClause('termination')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedDemoClause === 'termination'
                    ? 'bg-amberAccent-500 text-obsidian-950 font-bold shadow-glow-amber'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Cancellation
              </button>
              <button
                onClick={() => setSelectedDemoClause('renewal')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedDemoClause === 'renewal'
                    ? 'bg-amberAccent-500 text-obsidian-950 font-bold shadow-glow-amber'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Auto-Renewal
              </button>
              <button
                onClick={() => setSelectedDemoClause('indemnity')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedDemoClause === 'indemnity'
                    ? 'bg-amberAccent-500 text-obsidian-950 font-bold shadow-glow-amber'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Indemnity
              </button>
            </div>
          </div>

          {/* Display Card */}
          <div className="glow-laser-card hud-scanline rounded-2xl p-5 sm:p-7 border border-white/15 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/10">
              <span className="font-bold text-sm text-white flex items-center gap-2 font-heading">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                {demoClauses[selectedDemoClause].title}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40">
                {demoClauses[selectedDemoClause].risk} ({demoClauses[selectedDemoClause].riskScore}/100)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs">
              <div className="p-4 rounded-xl bg-obsidian-950/90 border border-white/10">
                <span className="font-mono text-[10px] uppercase text-slate-400 block mb-1">
                  Original Legal Text:
                </span>
                <p className="font-mono text-slate-300 italic text-xs leading-relaxed">
                  {demoClauses[selectedDemoClause].legalese}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amberAccent-500/5 border border-amberAccent-500/30">
                <span className="font-mono text-[10px] uppercase text-amberAccent-400 block mb-1 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Plain English:
                </span>
                <p className="text-slate-100 font-medium text-xs leading-relaxed">
                  {demoClauses[selectedDemoClause].plainEnglish}
                </p>
                <div className="mt-3 pt-2 border-t border-amberAccent-500/20">
                  <span className="text-amberAccent-400 font-bold font-mono text-[10px] block">Advice:</span>
                  <p className="text-slate-300 text-xs mt-0.5">
                    {demoClauses[selectedDemoClause].advice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-16 md:py-20 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
              Key Features
            </h2>
            <p className="mt-2 text-slate-400 text-xs sm:text-sm">
              Automated tools to understand and audit legal documents.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="glass-card rounded-xl p-5 border border-white/10">
              <Sparkles className="w-5 h-5 text-amberAccent-400 mb-3" />
              <h3 className="text-sm font-bold text-white mb-1 font-heading">Plain-English Summaries</h3>
              <p className="text-xs text-slate-400">Simplifies dense legal jargon into plain language.</p>
            </div>

            <div className="glass-card rounded-xl p-5 border border-white/10">
              <ShieldAlert className="w-5 h-5 text-rose-400 mb-3" />
              <h3 className="text-sm font-bold text-white mb-1 font-heading">Risk Scoring (0–100)</h3>
              <p className="text-xs text-slate-400">Detects aggressive terms and unbalanced obligations.</p>
            </div>

            <div className="glass-card rounded-xl p-5 border border-white/10">
              <GitCompare className="w-5 h-5 text-cyan-400 mb-3" />
              <h3 className="text-sm font-bold text-white mb-1 font-heading">Side-by-Side Diff</h3>
              <p className="text-xs text-slate-400">Compares contract versions to spot sneaky additions.</p>
            </div>

            <div className="glass-card rounded-xl p-5 border border-white/10">
              <MessageSquare className="w-5 h-5 text-emerald-400 mb-3" />
              <h3 className="text-sm font-bold text-white mb-1 font-heading">Citation Copilot</h3>
              <p className="text-xs text-slate-400">Ask questions and get answers with exact clause citations.</p>
            </div>

            <div className="glass-card rounded-xl p-5 border border-white/10">
              <Calendar className="w-5 h-5 text-purple-400 mb-3" />
              <h3 className="text-sm font-bold text-white mb-1 font-heading">Deadline Tracking</h3>
              <p className="text-xs text-slate-400">Extracts renewal notice windows and key dates automatically.</p>
            </div>

            <div className="glass-card rounded-xl p-5 border border-white/10">
              <FileCheck2 className="w-5 h-5 text-amberAccent-400 mb-3" />
              <h3 className="text-sm font-bold text-white mb-1 font-heading">Universal Files</h3>
              <p className="text-xs text-slate-400">Supports PDF, Word (.docx), and plain text documents.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 100% Free Guarantee */}
      <section id="free-access" className="py-14 bg-obsidian-950/70 border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Free Platform</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            All Features Included
          </h2>
          <p className="mt-2 text-slate-300 text-xs max-w-md mx-auto">
            Unlimited contract summaries, risk scoring, diffing, and AI Q&A without any paywalls.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-14 border-t border-white/10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-3xl font-bold text-white font-heading text-center mb-6">
            FAQ
          </h2>

          <div className="space-y-2.5">
            {faqs.map((faq, index) => (
              <div key={index} className="glass-card rounded-xl border border-white/10 overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full p-3.5 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-white hover:text-amberAccent-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${activeFaq === index ? 'rotate-180 text-amberAccent-400' : ''}`} />
                </button>
                {activeFaq === index && (
                  <div className="px-3.5 pb-3 text-xs text-slate-300 border-t border-white/5 pt-2">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
