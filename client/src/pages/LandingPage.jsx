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
  Star
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
      plainEnglish: 'You cannot get out early without paying for the entire 2-year contract upfront. Even if you stop using the software on day 30, you still owe 100% of the remaining 23 months of fees.',
      risk: 'HIGH',
      riskScore: 88,
      advice: 'Negotiate early termination for convenience with 30-day notice and cap cancellation fees at 1-2 months of standard service fees.'
    },
    renewal: {
      title: 'Predatory 60-Day Auto-Renewal + 10% Surge',
      legalese: '"This Agreement shall automatically renew for successive 12-month periods at a 10% fee increase unless Customer provides written notice of non-renewal at least sixty (60) days prior."',
      plainEnglish: 'If you miss the cancellation deadline by just 1 day, you are locked in for another full year with an automatic 10% price bump.',
      risk: 'HIGH',
      riskScore: 76,
      advice: 'Reduce notice window to 30 days and cap annual fee escalation to US CPI or max 3%.'
    },
    indemnity: {
      title: 'Unilateral Indemnity (Liability Trap)',
      legalese: '"Customer agrees to defend and indemnify Provider from all third-party claims. Provider provides no reciprocal indemnification for intellectual property infringement."',
      plainEnglish: 'You must pay Provider’s legal fees if a third-party sues them about your usage, but they will not protect you if their own software infringes someone else’s patent.',
      risk: 'CRITICAL',
      riskScore: 94,
      advice: 'Strike out unilateral terms. Demand mutual indemnification with vendor IP defense.'
    }
  };

  const faqs = [
    {
      q: 'Will my confidential contracts be used to train AI models?',
      a: 'Absolutely not. LegalEase AI operates under enterprise zero-data-retention agreements. Your documents and extracted clauses are encrypted in transit (TLS 1.3) and at rest (AES-256), and are never used to train public foundation models.'
    },
    {
      q: 'What file formats are supported?',
      a: 'We support PDF (both digital and scanned via our integrated OCR layer), DOCX (Microsoft Word), DOC, and plain text/markdown documents up to 25MB each.'
    },
    {
      q: 'How does the Contract Comparison Engine work?',
      a: 'Our comparison engine performs semantic clause alignment. Unlike basic line-diff tools, it understands whether an added sentence increases your liability, alters payment deadlines, or broadens non-compete covenants.'
    },
    {
      q: 'Can I chat with multi-hundred page agreements?',
      a: 'Yes! Our contextual retrieval pipeline indexes long documents and answers specific questions strictly citing the exact section and paragraph numbers for instant attorney verification.'
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background ambient mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-brand-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-28 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-600 dark:text-brand-300 text-xs font-semibold mb-6 shadow-glow">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span>Next-Gen Legal Document Intelligence</span>
            <span className="w-1 h-1 rounded-full bg-brand-400" />
            <span className="text-slate-500 dark:text-slate-400">Enterprise AI</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] max-w-4xl mx-auto">
            Stop Signing Contracts You{' '}
            <span className="gradient-text">Don’t Understand.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            LegalEase AI translates dense legalese into plain English, flags hidden risks and unfair clauses, compares contract versions, and answers questions with verified citations.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-base shadow-glow flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <button
              onClick={() => {
                loginAsDemo('user');
                navigate('/dashboard');
              }}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-white font-semibold text-base backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Explore Instant Demo</span>
            </button>
          </div>

          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-4">
            <span>✓ No credit card required</span>
            <span>✓ Instant 1-click test contracts</span>
            <span>✓ SOC2 compliant</span>
          </p>

          {/* Trust Banner */}
          <div className="mt-16 pt-8 border-t border-slate-200/60 dark:border-slate-800/60 max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-widest font-semibold text-slate-400 dark:text-slate-500">
              Trusted by 10,000+ Founders, General Counsels & Procurement Teams
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all text-xs font-bold tracking-wider text-slate-500">
              <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4" /> VANGUARD CAPITAL</span>
              <span className="flex items-center gap-1.5"><Scale className="w-4 h-4" /> LEXCORP LEGAL</span>
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> TECHSTART ACCELERATOR</span>
              <span className="flex items-center gap-1.5"><Lock className="w-4 h-4" /> CLOUDSCALE GLOBAL</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Live Clause Sandbox */}
      <section className="py-12 bg-slate-100/50 dark:bg-navy-900/40 border-y border-slate-200 dark:border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
              Live Interactive Demonstration
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
              See How LegalEase AI Decodes Real Contracts
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Click any predatory clause below to see the instant AI audit in action:
            </p>

            {/* Sandbox Clause Switcher */}
            <div className="mt-5 inline-flex p-1 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700">
              <button
                onClick={() => setSelectedDemoClause('termination')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  selectedDemoClause === 'termination'
                    ? 'bg-white dark:bg-navy-950 text-brand-600 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                100% Termination Penalty
              </button>
              <button
                onClick={() => setSelectedDemoClause('renewal')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  selectedDemoClause === 'renewal'
                    ? 'bg-white dark:bg-navy-950 text-brand-600 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Auto-Renewal Trap
              </button>
              <button
                onClick={() => setSelectedDemoClause('indemnity')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  selectedDemoClause === 'indemnity'
                    ? 'bg-white dark:bg-navy-950 text-brand-600 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Unilateral Indemnity
              </button>
            </div>
          </div>

          {/* Sandbox Live Card */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 relative shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
                <span className="font-bold text-base text-slate-900 dark:text-white">
                  {demoClauses[selectedDemoClause].title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-500 border border-rose-500/30">
                  {demoClauses[selectedDemoClause].risk} RISK ({demoClauses[selectedDemoClause].riskScore}/100)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Raw Legalese */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Original Contract Text
                </span>
                <p className="text-xs sm:text-sm font-mono text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  {demoClauses[selectedDemoClause].legalese}
                </p>
              </div>

              {/* Plain English Translation */}
              <div className="p-4 rounded-2xl bg-brand-500/5 dark:bg-brand-500/10 border border-brand-500/30">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 block mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Plain-English Explanation
                </span>
                <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-100 leading-relaxed">
                  {demoClauses[selectedDemoClause].plainEnglish}
                </p>
                <div className="mt-4 pt-3 border-t border-brand-500/20">
                  <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 block mb-1">
                    Actionable Legal Recommendation:
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal">
                    {demoClauses[selectedDemoClause].advice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section id="features" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
              Engineered For Modern Business
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
              Every Tool You Need to Audit Contracts with Confidence
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 mt-3">
              Built to save 80% of contract review time and prevent costly legal traps before execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {/* Feature 1 */}
            <div className="glass-card rounded-3xl p-7 border border-slate-200 dark:border-slate-800 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-5">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Plain-English Translation</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Automatically demystifies archaisms and dense legalese into clear, conversational summaries that non-lawyers and founders can understand in seconds.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card rounded-3xl p-7 border border-slate-200 dark:border-slate-800 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-5">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Risk Sentinel Engine</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Flags predatory clauses like 100% early termination penalties, hidden fee hikes, unilateral indemnification, and uncapped liability with severity scores and mitigation advice.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card rounded-3xl p-7 border border-slate-200 dark:border-slate-800 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-5">
                <GitCompare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Contract Comparison Diff</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Upload Version A and Version B. Our semantic diff engine highlights added liabilities, modified compensation, and altered notice windows side-by-side.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="glass-card rounded-3xl p-7 border border-slate-200 dark:border-slate-800 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center mb-5">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Contextual AI Copilot</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Ask specific questions like "What are my obligations if we hit 50k users?" or "Can they increase prices?" and receive exact answers with verifiable section citations.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="glass-card rounded-3xl p-7 border border-slate-200 dark:border-slate-800 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-5">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Obligation & Deadline Sentinel</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Automatically extracts renewal notice cutoff dates, quarterly payment milestones, and expiration days into an interactive cross-document calendar timeline.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="glass-card rounded-3xl p-7 border border-slate-200 dark:border-slate-800 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-5">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Enterprise Privacy & OCR</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Zero data retention mode, optical character recognition for scanned documents, PDF/DOCX multi-format ingestion, and instant export to professional audit reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-slate-100/40 dark:bg-navy-900/30 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
              Simple 3-Step Workflow
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              How LegalEase AI Protects Your Business
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
            <div className="relative glass-card rounded-3xl p-8 border border-slate-200 dark:border-slate-800">
              <span className="text-4xl font-black text-brand-500/20 absolute top-6 right-6 font-mono">01</span>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">Upload Any Agreement</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                Drag and drop your PDF, DOCX, or TXT file. Our system scans native and OCR-based text with instant validation.
              </p>
            </div>

            <div className="relative glass-card rounded-3xl p-8 border border-slate-200 dark:border-slate-800">
              <span className="text-4xl font-black text-brand-500/20 absolute top-6 right-6 font-mono">02</span>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">AI Clause & Risk Audit</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                In under 2 seconds, our Legal Intelligence engine scans every clause, calculates risk severity, and flags unfair terms with counter-proposals.
              </p>
            </div>

            <div className="relative glass-card rounded-3xl p-8 border border-slate-200 dark:border-slate-800">
              <span className="text-4xl font-black text-brand-500/20 absolute top-6 right-6 font-mono">03</span>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">Execute With Total Confidence</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                Review the plain-English breakdown, track renewal deadlines on your timeline, or chat with the AI copilot to negotiate redlines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
              Simple & Transparent Plans
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              Start Free, Scale As You Review
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              Save thousands on outside legal fees with instant document intelligence.
            </p>

            {/* Monthly / Yearly Toggle */}
            <div className="mt-6 inline-flex items-center gap-3 p-1 rounded-xl bg-slate-200/80 dark:bg-slate-800/80">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-white dark:bg-navy-950 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  billingCycle === 'yearly'
                    ? 'bg-white dark:bg-navy-950 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500'
                }`}
              >
                <span>Yearly</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500 text-white font-bold">Save 25%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14 max-w-6xl mx-auto">
            {/* Tier 1: Starter */}
            <div className="glass-card rounded-3xl p-8 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Free Starter</h4>
                <p className="text-xs text-slate-500 mt-1">For individuals and founders reviewing occasional contracts.</p>
                <div className="mt-5 mb-6">
                  <span className="text-4xl font-extrabold font-mono text-slate-900 dark:text-white">$0</span>
                  <span className="text-xs text-slate-400"> / forever</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /> Up to 5 document uploads / mo</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /> Plain-English summaries</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /> Basic risk detection flags</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /> AI Document Chat (20 msgs/doc)</li>
                </ul>
              </div>
              <Link
                to="/register"
                className="mt-8 w-full py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-center text-xs font-semibold text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Sign Up Free
              </Link>
            </div>

            {/* Tier 2: Pro (Featured) */}
            <div className="glass-card rounded-3xl p-8 border-2 border-brand-500 bg-brand-500/[0.03] relative flex flex-col justify-between shadow-2xl">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-glow">
                Most Popular
              </span>
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Professional</h4>
                <p className="text-xs text-slate-500 mt-1">For growing startups, consultants, and law practices.</p>
                <div className="mt-5 mb-6">
                  <span className="text-4xl font-extrabold font-mono text-slate-900 dark:text-white">
                    {billingCycle === 'yearly' ? '$22' : '$29'}
                  </span>
                  <span className="text-xs text-slate-400"> / month</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-500 shrink-0" /> Unlimited document uploads</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-500 shrink-0" /> Full Risk Sentinel & Counter-proposals</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-500 shrink-0" /> Contract Comparison Engine (Side-by-side)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-500 shrink-0" /> Unlimited AI Document Chat</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-500 shrink-0" /> Automated Deadline & Timeline Sentinel</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-500 shrink-0" /> Downloadable Executive Audit Reports</li>
                </ul>
              </div>
              <Link
                to="/register"
                className="mt-8 w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-center text-xs font-semibold text-white shadow-glow transition-all hover:scale-[1.01]"
              >
                Start 14-Day Free Trial
              </Link>
            </div>

            {/* Tier 3: Enterprise */}
            <div className="glass-card rounded-3xl p-8 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Enterprise</h4>
                <p className="text-xs text-slate-500 mt-1">For in-house legal departments and enterprise procurement.</p>
                <div className="mt-5 mb-6">
                  <span className="text-4xl font-extrabold font-mono text-slate-900 dark:text-white">
                    {billingCycle === 'yearly' ? '$79' : '$99'}
                  </span>
                  <span className="text-xs text-slate-400"> / month</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /> Everything in Professional</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /> Admin Dashboard & Role Management</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /> Custom Playbook & Risk Scoring Guidelines</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /> Zero Data Retention Guarantee</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /> Dedicated Account Manager & SLA</li>
                </ul>
              </div>
              <Link
                to="/register"
                className="mt-8 w-full py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-center text-xs font-semibold text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Contact Enterprise Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-100/50 dark:bg-navy-900/30 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
              Proven Results
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Loved by In-House Counsel & Founders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card rounded-3xl p-7 border border-slate-200 dark:border-slate-800">
              <div className="flex gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                "LegalEase AI caught a 100% early termination fee in an enterprise SaaS agreement that would have cost our company $140,000. It paid for itself 1,000 times over in 5 minutes."
              </p>
              <div className="mt-5 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Elena"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">Elena Rostova</h5>
                  <p className="text-[11px] text-slate-400">Chief Operating Officer, TechStart</p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-7 border border-slate-200 dark:border-slate-800">
              <div className="flex gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                "The contract comparison engine is phenomenal. It pinpointed a subtle 24-month non-compete clause slipped into an employment agreement revision that traditional redlining missed."
              </p>
              <div className="mt-5 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80"
                  alt="David"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">David Vance, Esq.</h5>
                  <p className="text-[11px] text-slate-400">Managing Partner, Vance Law LLC</p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-7 border border-slate-200 dark:border-slate-800">
              <div className="flex gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                "Our procurement team reviews 40+ vendor contracts a month. LegalEase AI reduced our turnaround time from 7 days to 20 minutes with zero sacrifice in compliance rigour."
              </p>
              <div className="mt-5 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                  alt="Sarah"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">Sarah Connor</h5>
                  <p className="text-[11px] text-slate-400">Head of Procurement, OmniCorp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Everything You Need to Know
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between text-sm font-semibold text-slate-900 dark:text-white hover:text-brand-500 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {activeFaq === i && (
                  <div className="px-6 pb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final High-Converting CTA Banner */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl gradient-bg p-8 sm:p-14 text-center text-white shadow-glow relative overflow-hidden">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight max-w-2xl mx-auto">
              Never Sign an Unfair Contract Again.
            </h2>
            <p className="mt-4 text-brand-100 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Join thousands of businesses that analyze legal agreements in seconds with LegalEase AI.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-brand-900 font-bold text-sm shadow-lg hover:bg-brand-50 transition-all"
              >
                Start Free Workspace
              </Link>
              <button
                onClick={() => {
                  loginAsDemo('user');
                  navigate('/dashboard');
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-white/30 hover:bg-white/10 text-white font-semibold text-sm transition-all"
              >
                Launch Instant Demo
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
