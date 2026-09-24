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
  Activity
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { loginAsDemo } = useAuth();
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedDemoClause, setSelectedDemoClause] = useState('termination');

  const demoClauses = {
    termination: {
      title: '100% Termination Penalty',
      legalese: '"Customer may terminate for convenience prior to expiration only upon payment of 100% of all remaining fees through the full 24-month term."',
      plainEnglish: 'You cannot cancel early without paying for the entire 2-year contract. Even if you cancel on day 30, you owe all 23 remaining months.',
      risk: 'HIGH',
      riskScore: 88,
      advice: 'Negotiate 30-day notice and cap cancellation fees at 1–2 months of service.'
    },
    renewal: {
      title: '60-Day Auto-Renewal + 10% Price Surge',
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
      a: 'No. All uploaded documents are processed securely and never used to train public foundation models.'
    },
    {
      q: 'What file formats are supported?',
      a: 'We support PDF (digital & scanned via OCR), Word (.docx, .doc), and plain text documents up to 25MB.'
    },
    {
      q: 'How does the contract comparison engine work?',
      a: 'It detects semantic differences between contract drafts—highlighting slipped liabilities, altered notice windows, and shifted risks.'
    },
    {
      q: 'Can I ask questions about specific clauses?',
      a: 'Yes. The AI copilot answers questions with direct citations to the relevant sections in your agreement.'
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#07090E] text-slate-100 overflow-hidden font-sans">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-brand-500/10 blur-[130px] pointer-events-none rounded-full" />

      {/* Hero Section */}
      <section className="relative pt-16 pb-16 md:pt-24 md:pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 text-xs font-semibold mb-6 shadow-glow">
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
            <span>AI Legal Document Intelligence</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading max-w-4xl mx-auto">
            Review Contracts in Seconds.{' '}
            <span className="gradient-text-hero">Spot Hidden Risks.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            LegalEase AI turns dense legalese into plain English, flags unfair terms, compares version revisions, and answers questions with verified citations.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              to="/register"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm shadow-glow flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => {
                loginAsDemo('user');
                navigate('/dashboard');
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-slate-700 bg-obsidian-900 hover:bg-obsidian-800 text-slate-200 hover:text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Explore Instant Demo</span>
            </button>
          </div>

          {/* Quick value badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> Free 1-click test contracts</span>
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> No credit card required</span>
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> Private & encrypted</span>
          </div>
        </div>
      </section>

      {/* Interactive Live Clause Sandbox */}
      <section className="py-12 bg-obsidian-950/70 border-y border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
              Interactive Clause Audit Sandbox
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select a clause below to see how AI decodes and analyzes legal risk in real time:
            </p>

            {/* Clause Tabs */}
            <div className="mt-4 inline-flex p-1 rounded-xl bg-obsidian-900 border border-slate-800">
              <button
                onClick={() => setSelectedDemoClause('termination')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedDemoClause === 'termination'
                    ? 'bg-brand-600 text-white shadow-glow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Termination Penalty
              </button>
              <button
                onClick={() => setSelectedDemoClause('renewal')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedDemoClause === 'renewal'
                    ? 'bg-brand-600 text-white shadow-glow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Auto-Renewal Trap
              </button>
              <button
                onClick={() => setSelectedDemoClause('indemnity')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedDemoClause === 'indemnity'
                    ? 'bg-brand-600 text-white shadow-glow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Indemnity Trap
              </button>
            </div>
          </div>

          {/* Sandbox Display Card */}
          <div className="glass-panel rounded-2xl p-5 sm:p-7 border border-slate-700/60 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <span className="font-bold text-sm text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                {demoClauses[selectedDemoClause].title}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                {demoClauses[selectedDemoClause].risk} RISK ({demoClauses[selectedDemoClause].riskScore}/100)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs">
              {/* Raw Clause */}
              <div className="p-4 rounded-xl bg-obsidian-950 border border-slate-800">
                <span className="font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Original Legal Clause:
                </span>
                <p className="font-mono text-slate-300 italic leading-relaxed">
                  {demoClauses[selectedDemoClause].legalese}
                </p>
              </div>

              {/* Plain English Translation & Advice */}
              <div className="p-4 rounded-xl bg-brand-950/30 border border-brand-500/30">
                <span className="font-bold uppercase tracking-wider text-brand-400 block mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Plain-English Meaning:
                </span>
                <p className="text-slate-200 leading-relaxed font-medium">
                  {demoClauses[selectedDemoClause].plainEnglish}
                </p>
                <div className="mt-3 pt-2.5 border-t border-brand-500/20">
                  <span className="font-bold text-amber-400 block mb-0.5">Recommended Redline:</span>
                  <p className="text-slate-300 leading-normal">
                    {demoClauses[selectedDemoClause].advice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
              Key Features
            </h2>
            <p className="mt-2 text-slate-400 text-sm">
              Purpose-built tools to simplify complex legal workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Feature 1 */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 hover:border-brand-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400 mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5 font-heading">Plain-English Translation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Translates convoluted clauses into simple, clear summaries anyone can understand.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 hover:border-rose-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5 font-heading">Automated Risk Scoring</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Scores agreements from 0 to 100, flagging aggressive penalties and one-sided clauses.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 hover:border-purple-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
                <GitCompare className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5 font-heading">Version Diffing</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Compares revisions side-by-side to highlight newly introduced changes and slipped terms.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 hover:border-emerald-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5 font-heading">Citation-Backed Q&A</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ask specific questions and receive verified answers with exact section citations.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 hover:border-amber-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5 font-heading">Deadline Sentinel</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Extracts key renewal notice windows, payment dates, and expiration milestones automatically.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 hover:border-cyan-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5 font-heading">Universal File Support</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Upload PDFs, Word documents, and text files with integrated text parsing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 100% Free & Open Access Banner */}
      <section className="py-16 bg-obsidian-950/60 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-4">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Free Platform — No Hidden Fees, No Subscriptions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            All Features Included Without Any Paywalls
          </h2>
          <p className="mt-2 text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
            Enjoy full access to AI contract summaries, clause risk scoring, side-by-side version comparison, citation copilot, and milestone tracking without paying a dime.
          </p>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-obsidian-900 border border-slate-800">
              <span className="text-emerald-400 text-xs font-bold block mb-1">✓ Unlimited Audits</span>
              <p className="text-[11px] text-slate-400">Analyze any number of contracts.</p>
            </div>
            <div className="p-4 rounded-xl bg-obsidian-900 border border-slate-800">
              <span className="text-emerald-400 text-xs font-bold block mb-1">✓ Full Diff Engine</span>
              <p className="text-[11px] text-slate-400">Compare revisions side-by-side.</p>
            </div>
            <div className="p-4 rounded-xl bg-obsidian-900 border border-slate-800">
              <span className="text-emerald-400 text-xs font-bold block mb-1">✓ AI Citation Q&A</span>
              <p className="text-[11px] text-slate-400">Ask questions with source citations.</p>
            </div>
            <div className="p-4 rounded-xl bg-obsidian-900 border border-slate-800">
              <span className="text-emerald-400 text-xs font-bold block mb-1">✓ Deadline Sentinel</span>
              <p className="text-[11px] text-slate-400">Track notice windows & milestones.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 border-t border-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="glass-panel rounded-xl border border-slate-800 overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-white hover:text-brand-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === index ? 'rotate-180 text-brand-400' : ''}`} />
                </button>
                {activeFaq === index && (
                  <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800 pt-2.5">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Callout */}
      <section className="py-14 border-t border-slate-800 bg-obsidian-950/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            Audit your next contract with confidence.
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Test any contract instantly or try our 1-click sample agreements.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/register"
              className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs shadow-glow transition-all"
            >
              Get Started in 30 Seconds
            </Link>
            <button
              onClick={() => {
                loginAsDemo('user');
                navigate('/dashboard');
              }}
              className="px-5 py-3 rounded-xl border border-slate-700 bg-obsidian-900 hover:bg-obsidian-800 text-slate-200 text-xs font-semibold transition-all"
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
