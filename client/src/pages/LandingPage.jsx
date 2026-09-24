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
  HelpCircle,
  Zap,
  Lock,
  ChevronDown,
  Building2,
  Users,
  Eye,
  Star,
  Check,
  Shield,
  Layers,
  Search,
  Sliders,
  Cpu,
  Terminal,
  Activity,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { isAuthenticated, loginAsDemo } = useAuth();
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'yearly'
  const [activeFaq, setActiveFaq] = useState(null);

  // Interactive Live Sandbox State
  const [selectedDemoClause, setSelectedDemoClause] = useState('termination');

  const demoClauses = {
    termination: {
      title: 'Aggressive 100% Termination Penalty',
      legalese: '"Customer may terminate for convenience prior to expiration of the Initial Term only upon payment of liquidated damages equal to 100% of all remaining fees through the full 24-month term."',
      plainEnglish: 'You cannot exit early without paying for the entire 2-year contract upfront. Even if you cease using the platform on day 30, you still owe 100% of the remaining 23 months of service fees.',
      risk: 'HIGH',
      riskScore: 88,
      advice: 'Negotiate early termination for convenience with a standard 30-day notice and cap liquidated damages at a maximum of 1–2 months of recurring fees.'
    },
    renewal: {
      title: 'Predatory 60-Day Auto-Renewal + 10% Price Surge',
      legalese: '"This Agreement shall automatically renew for successive 12-month periods at a 10% fee increase unless Customer provides written notice of non-renewal at least sixty (60) days prior."',
      plainEnglish: 'If you miss the cancellation notice deadline by even one day, you are involuntarily locked into another full year with an automatic 10% price escalation.',
      risk: 'HIGH',
      riskScore: 76,
      advice: 'Shorten notice window to 30 days and cap annual fee escalations strictly to US CPI or max 3%.'
    },
    indemnity: {
      title: 'Unilateral Indemnity (One-Sided Liability Trap)',
      legalese: '"Customer agrees to defend, indemnify and hold harmless Provider from all third-party claims. Provider provides no reciprocal indemnification for intellectual property infringement."',
      plainEnglish: 'You bear full financial responsibility for Provider’s legal fees if a third party sues them, while they refuse to defend you if their software infringes an existing patent.',
      risk: 'CRITICAL',
      riskScore: 94,
      advice: 'Strike out unilateral liability. Insist on mutual indemnification with full vendor IP infringement defense.'
    }
  };

  const faqs = [
    {
      q: 'Will my confidential contracts ever be used to train AI models?',
      a: 'Never. LegalEase AI operates under enterprise zero-data-retention standards. All documents and clause embeddings are encrypted in transit (TLS 1.3) and at rest (AES-256), and are never fed into public foundation models.'
    },
    {
      q: 'What contract file formats are supported?',
      a: 'We support PDF (both native digital PDFs and scanned documents via our integrated OCR layer), DOCX (Microsoft Word), DOC, and plain text/markdown documents up to 25MB each.'
    },
    {
      q: 'How does the Contract Comparison Engine differ from standard diffs?',
      a: 'Standard diff tools only check line additions. Our semantic comparison engine analyzes substantive legal risk deltas—detecting if a modified phrasing increases liability, alters cure periods, or broadens indemnity scopes.'
    },
    {
      q: 'Can I chat with multi-hundred-page complex agreements?',
      a: 'Yes. Our contextual citation engine indexes long master services agreements and answers queries while citing the exact section and paragraph numbers for instant attorney validation.'
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#07090E] text-slate-100 overflow-hidden font-sans selection:bg-brand-500/30 selection:text-brand-200">
      {/* Dynamic Ambient Background Spotlights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-brand-600/15 via-purple-600/10 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-[800px] -left-40 w-96 h-96 bg-brand-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-[1400px] -right-40 w-96 h-96 bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 md:pt-32 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Subtle Live Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 text-xs font-semibold mb-8 shadow-glow backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            <span>Next-Gen Legal Intelligence v2.4</span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span className="text-slate-400 font-mono text-[11px]">OCR & Semantic Diff Ready</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] max-w-4xl mx-auto font-heading">
            Stop Signing Contracts You{' '}
            <span className="gradient-text-hero">Don’t Understand.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            LegalEase AI translates dense legalese into plain English, flags hidden liabilities and unfair clauses, compares contract versions, and answers questions with verified citations.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-base shadow-glow flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => {
                loginAsDemo('user');
                navigate('/dashboard');
              }}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl border border-slate-700/80 bg-obsidian-900/80 hover:bg-obsidian-800 text-slate-200 hover:text-white font-semibold text-base backdrop-blur-xl transition-all flex items-center justify-center gap-2 shadow-sm hover:border-brand-500/40"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Explore Instant Demo</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> No credit card required</span>
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> Instant 1-click test contracts</span>
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> Zero-data retention</span>
          </div>

          {/* Enterprise Logo Bar */}
          <div className="mt-16 pt-8 border-t border-slate-800/80 max-w-4xl mx-auto">
            <p className="text-[11px] uppercase tracking-widest font-bold text-slate-400">
              Trusted by forward-thinking Founders, General Counsels & Procurement Teams
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60 hover:opacity-100 transition-all text-xs font-bold tracking-wider text-slate-400">
              <span className="flex items-center gap-2 hover:text-white transition-colors"><Building2 className="w-4 h-4 text-brand-400" /> VANGUARD CAPITAL</span>
              <span className="flex items-center gap-2 hover:text-white transition-colors"><Scale className="w-4 h-4 text-brand-400" /> LEXCORP ADVISORY</span>
              <span className="flex items-center gap-2 hover:text-white transition-colors"><Users className="w-4 h-4 text-brand-400" /> TECHSTART VENTURES</span>
              <span className="flex items-center gap-2 hover:text-white transition-colors"><Lock className="w-4 h-4 text-brand-400" /> CLOUDSCALE GLOBAL</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Live Clause Sandbox */}
      <section className="py-14 bg-obsidian-950/60 border-y border-slate-800/80 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-[11px] font-bold tracking-wider uppercase mb-2">
              <Cpu className="w-3 h-3" /> Live Interactive Sandbox
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
              See How LegalEase AI Decodes Real Contracts
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl mx-auto">
              Select any high-risk clause below to inspect the real-time AI audit:
            </p>

            {/* Sandbox Clause Switcher */}
            <div className="mt-6 inline-flex p-1.5 rounded-2xl bg-obsidian-900 border border-slate-800 shadow-inner">
              <button
                onClick={() => setSelectedDemoClause('termination')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedDemoClause === 'termination'
                    ? 'bg-brand-600 text-white shadow-glow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                100% Termination Penalty
              </button>
              <button
                onClick={() => setSelectedDemoClause('renewal')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedDemoClause === 'renewal'
                    ? 'bg-brand-600 text-white shadow-glow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Auto-Renewal Trap
              </button>
              <button
                onClick={() => setSelectedDemoClause('indemnity')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedDemoClause === 'indemnity'
                    ? 'bg-brand-600 text-white shadow-glow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Unilateral Indemnity
              </button>
            </div>
          </div>

          {/* Sandbox Live Card */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-700/60 relative shadow-2xl overflow-hidden">
            {/* Top Bar of Sandbox */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
                <span className="font-bold text-base text-white">
                  {demoClauses[selectedDemoClause].title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                  {demoClauses[selectedDemoClause].risk} RISK • Score {demoClauses[selectedDemoClause].riskScore}/100
                </span>
              </div>
            </div>

            {/* Split View */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Raw Legalese */}
              <div className="p-5 rounded-2xl bg-obsidian-950/80 border border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-slate-400" /> Original Contract Clause
                  </span>
                  <p className="text-xs sm:text-sm font-mono text-slate-300 leading-relaxed italic bg-obsidian-900/60 p-3.5 rounded-xl border border-slate-800/60">
                    {demoClauses[selectedDemoClause].legalese}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/60 pt-3">
                  <span>Section 14.2 • Liability & Terms</span>
                  <span className="text-rose-400 font-semibold">Flagged by OCR Engine</span>
                </div>
              </div>

              {/* Plain English Translation & Advice */}
              <div className="p-5 rounded-2xl bg-brand-950/30 border border-brand-500/30 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-400 block mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Plain-English Interpretation
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-slate-100 leading-relaxed">
                    {demoClauses[selectedDemoClause].plainEnglish}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-brand-500/20 bg-brand-500/5 p-3 rounded-xl">
                  <span className="text-[11px] font-bold text-amber-400 block mb-1 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" /> Recommended Redline Action:
                  </span>
                  <p className="text-xs text-slate-300 leading-normal">
                    {demoClauses[selectedDemoClause].advice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Bento Grid */}
      <section id="features" className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-bold uppercase tracking-wider mb-3">
              Intelligent Capability Suite
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
              Everything You Need to Audit Contracts in Seconds
            </h2>
            <p className="mt-4 text-slate-400 text-base sm:text-lg">
              Engineered with specialized legal LLMs to transform hours of tedious manual review into instant, verified insights.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1: Plain English */}
            <div className="glass-card rounded-3xl p-7 border border-slate-800 hover:border-brand-500/40 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400 mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-heading">
                  Plain-English Breakdown
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Decodes dense, convoluted legal jargon into clear, readable language so any stakeholder can negotiate with confidence.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs font-semibold text-brand-400 flex items-center gap-1">
                <span>Instant Clause Simplification</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Feature 2: Risk Scoring */}
            <div className="glass-card rounded-3xl p-7 border border-slate-800 hover:border-rose-500/40 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-6 group-hover:scale-110 transition-transform">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-heading">
                  Automated Risk Radar
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Color-coded risk indicators pinpoint predatory indemnity clauses, unilateral termination liabilities, and hidden fees.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs font-semibold text-rose-400 flex items-center gap-1">
                <span>0-100 Risk Scoring</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Feature 3: Version Comparison */}
            <div className="glass-card rounded-3xl p-7 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                  <GitCompare className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-heading">
                  Semantic Version Diffing
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Compare revised draft agreements against originals to catch stealthy redline modifications, deleted protections, and changed dates.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs font-semibold text-purple-400 flex items-center gap-1">
                <span>Side-by-Side Comparison</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Feature 4: Interactive Q&A */}
            <div className="glass-card rounded-3xl p-7 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-heading">
                  Citation-Backed Q&A
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Ask specific questions like "What are my obligations if data is breached?" and receive direct citations referencing exact contract sections.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <span>Source-Verified Answers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Feature 5: Deadline Sentinel */}
            <div className="glass-card rounded-3xl p-7 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-heading">
                  Deadline Sentinel
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Automatically detects payment terms, expiration dates, renewal windows, and compliance milestones to prevent accidental defaults.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs font-semibold text-amber-400 flex items-center gap-1">
                <span>Milestone Extraction</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Feature 6: OCR & Document Support */}
            <div className="glass-card rounded-3xl p-7 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                  <FileCheck2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-heading">
                  Optical Character Engine
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Process scanned hardcopy agreements, blurry smartphone captures, Word documents, and digital PDFs with high-fidelity text extraction.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs font-semibold text-cyan-400 flex items-center gap-1">
                <span>Universal File Ingestion</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Engine Visual Teaser */}
      <section className="py-16 bg-obsidian-900/40 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel rounded-3xl p-8 border border-slate-800 relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-purple-400 tracking-wider uppercase">
                  Semantic Diffing Engine
                </span>
                <h3 className="text-2xl font-bold text-white mt-1 font-heading">
                  Inspect Contract Revisions Side-by-Side
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Catch subtle wording adjustments that dramatically shift legal liability.
                </p>
              </div>
              <Link
                to="/comparisons"
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2 self-start md:self-auto transition-all shadow-glow"
              >
                <span>Launch Comparison Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 font-mono text-xs">
              <div className="p-4 rounded-xl bg-obsidian-950 border border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Original Version (v1.0)
                </span>
                <p className="text-slate-300 leading-relaxed">
                  "Provider shall maintain confidentiality of customer data and shall notify customer within <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1 py-0.5 rounded">24 hours</span> of any unauthorized breach."
                </p>
              </div>
              <div className="p-4 rounded-xl bg-obsidian-950 border border-slate-800">
                <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider block mb-2">
                  Vendor Revised Version (v2.1)
                </span>
                <p className="text-slate-300 leading-relaxed">
                  "Provider shall maintain commercially reasonable efforts regarding confidentiality and shall notify customer <span className="text-rose-400 font-bold bg-rose-500/15 px-1 py-0.5 rounded">as soon as reasonably practicable</span> of any confirmed breach."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Matrix */}
      <section id="pricing" className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-bold uppercase tracking-wider mb-3">
              Simple & Transparent
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
              Predictable Pricing for High-Stakes Legal Review
            </h2>
            <p className="mt-4 text-slate-400 text-base">
              Choose the plan that fits your deal volume. Upgrade or cancel anytime.
            </p>

            {/* Toggle Billing Cycle */}
            <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-2xl bg-obsidian-900 border border-slate-800">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-brand-600 text-white shadow-glow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  billingCycle === 'yearly'
                    ? 'bg-brand-600 text-white shadow-glow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>Annual Billing</span>
                <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Tier */}
            <div className="glass-card rounded-3xl p-8 border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white font-heading">Free Starter</h3>
                <p className="text-xs text-slate-400 mt-1">For freelancers & individuals auditing occasional contracts.</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">$0</span>
                  <span className="text-xs text-slate-400">/ forever</span>
                </div>

                <ul className="mt-8 space-y-3.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>3 Contract Audits per month</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Plain-English Summaries</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Basic Risk Scoring</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-slate-400">
                    <CheckCircle className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    <span>Standard PDF/Word support (max 5MB)</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/register"
                className="mt-8 w-full py-3.5 rounded-xl border border-slate-700 bg-obsidian-900 hover:bg-obsidian-800 text-white font-semibold text-xs text-center transition-all"
              >
                Get Started Free
              </Link>
            </div>

            {/* Pro Plan (Featured) */}
            <div className="glass-panel rounded-3xl p-8 border-2 border-brand-500 relative flex flex-col justify-between shadow-glow bg-gradient-to-b from-brand-950/40 via-obsidian-900/90 to-obsidian-950">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-600 text-white text-[11px] font-bold tracking-wider uppercase shadow-glow">
                Most Popular
              </div>

              <div>
                <h3 className="text-xl font-bold text-white font-heading">Professional</h3>
                <p className="text-xs text-slate-300 mt-1">For founders, growing startups & agency operators.</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">
                    {billingCycle === 'monthly' ? '$39' : '$31'}
                  </span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>

                <ul className="mt-8 space-y-3.5 text-xs text-slate-200">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span><strong>50 Contract Audits</strong> per month</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Side-by-Side Version Diff Engine</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Interactive Citation Q&A Chat</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Deadline Sentinel & Milestones</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>High-Accuracy OCR Ingestion</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/register"
                className="mt-8 w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs text-center transition-all shadow-glow"
              >
                Start 14-Day Free Trial
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="glass-card rounded-3xl p-8 border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white font-heading">Enterprise</h3>
                <p className="text-xs text-slate-400 mt-1">For law firms, corporate legal teams & high-volume procurement.</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">
                    {billingCycle === 'monthly' ? '$149' : '$119'}
                  </span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>

                <ul className="mt-8 space-y-3.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span><strong>Unlimited</strong> Contract Audits</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Custom Playbook & Rule Checkers</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Multi-seat Team Collaboration</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Dedicated Account Manager & SLA</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/register"
                className="mt-8 w-full py-3.5 rounded-xl border border-slate-700 bg-obsidian-900 hover:bg-obsidian-800 text-white font-semibold text-xs text-center transition-all"
              >
                Contact Enterprise Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 bg-obsidian-950/60 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white tracking-tight font-heading">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Everything you need to know about LegalEase AI's security, models, and workflows.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl border border-slate-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm text-white hover:text-brand-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      activeFaq === index ? 'rotate-180 text-brand-400' : ''
                    }`}
                  />
                </button>
                {activeFaq === index && (
                  <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel rounded-3xl p-10 md:p-14 border border-brand-500/40 text-center relative overflow-hidden shadow-2xl bg-gradient-to-b from-brand-950/60 via-obsidian-900 to-obsidian-950">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/20 blur-[100px] pointer-events-none rounded-full" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
              Ready to eliminate contract blindspots?
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
              Join thousands of professionals auditing legal documents faster, safer, and with complete clarity.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm shadow-glow flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <span>Get Started in 30 Seconds</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => {
                  loginAsDemo('user');
                  navigate('/dashboard');
                }}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl border border-slate-700 bg-obsidian-900 hover:bg-obsidian-800 text-slate-200 font-semibold text-sm transition-all"
              >
                Launch Demo Sandbox
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
