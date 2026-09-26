import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Shield,
  GitCompare,
  FileText,
  ChevronRight,
  CheckCircle2,
  Lock,
  ArrowUpRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LuxuryCrystalHero from '../components/3d/LuxuryCrystalHero';

const LandingPage = () => {
  const { loginAsDemo } = useAuth();
  const navigate = useNavigate();
  const [activeClause, setActiveClause] = useState(0);

  const sampleClauses = [
    {
      title: 'Uncapped Liability & Indemnity',
      type: 'Critical Risk Detected',
      riskBadge: 'High Risk',
      riskColor: 'text-rose-400 border-rose-500/20 bg-rose-500/10',
      legalese:
        '“Contractor shall unconditionally indemnify, defend, and hold harmless Company and its affiliates from and against any and all claims, liabilities, losses, damages, and expenses without limitation, arising from any breach or alleged omission, notwithstanding any statutory caps.”',
      plainEnglish:
        'You are required to pay unlimited damages and legal fees for any claim against the client, with zero financial cap protecting your business.',
      recommendation: 'Insert a standard mutual liability cap limited to 12 months of paid contract fees.'
    },
    {
      title: 'Automatic 24-Month Lock-In Renewal',
      type: 'Hidden Lock-In Clause',
      riskBadge: 'Warning',
      riskColor: 'text-amber-400 border-amber-500/20 bg-amber-500/10',
      legalese:
        '“This Agreement shall automatically renew for successive twenty-four (24) month terms unless either party provides written non-renewal notice via certified postal mail no later than one hundred eighty (180) days prior to term expiration.”',
      plainEnglish:
        'If you do not send physical certified mail 6 months before expiration, the agreement automatically locks you in for 2 additional years.',
      recommendation: 'Reduce the notice window to 30 days and permit email notification.'
    },
    {
      title: 'Worldwide Post-Termination Non-Compete',
      type: 'Restrictive Covenant',
      riskBadge: 'High Risk',
      riskColor: 'text-rose-400 border-rose-500/20 bg-rose-500/10',
      legalese:
        '“For a period of thirty-six (36) months following termination, Consultant shall not directly or indirectly engage with, advise, or invest in any entity operating within the broader technology sector globally.”',
      plainEnglish:
        'You are prohibited from working with or advising any technology company worldwide for 3 full years after leaving.',
      recommendation: 'Strike out the clause or limit scope strictly to direct competitors within your geographic region.'
    }
  ];

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-white/20 selection:text-white pb-32">
      
      {/* =========================================================================
          HERO SECTION: Pure Luxury Centerpiece & Massive Minimal Typography
          ========================================================================= */}
      <section className="relative max-w-7xl mx-auto px-6 sm:px-8 pt-20 lg:pt-28 flex flex-col items-center text-center">
        
        {/* Subtle Minimal Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full pill-luxury mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          <span className="text-xs tracking-wide text-slate-300 font-medium">
            Legal Intelligence 2035
          </span>
        </div>

        {/* Massive Bold Headline */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white max-w-4xl leading-[1.05]">
          Contracts. <br />
          <span className="text-metallic">Clarified.</span>
        </h1>

        {/* Minimal Subhead */}
        <p className="mt-8 text-lg sm:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed">
          Autonomous AI that uncovers liability traps, strips away legalese, and delivers instant plain-English certainty.
        </p>

        {/* Action CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-4 rounded-full btn-luxury-primary text-sm flex items-center justify-center gap-2"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={() => {
              loginAsDemo('user');
              navigate('/dashboard');
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-full btn-luxury-secondary text-sm flex items-center justify-center gap-2"
          >
            <span>Interactive Demo</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Centerpiece: Floating Translucent Glass Crystal Sculpture */}
        <div className="w-full max-w-4xl mt-4">
          <LuxuryCrystalHero />
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: 3 CORE PILLARS (Linear / Apple Luxury Cards)
          ========================================================================= */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="glass-luxury glass-luxury-hover p-8 sm:p-10 rounded-3xl flex flex-col justify-between min-h-[320px]">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white tracking-tight mb-3">
                Risk Sentinel
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Automatically identifies uncapped indemnities, one-sided termination clauses, and hidden liability traps before you sign.
              </p>
            </div>
            <div className="pt-6 text-xs text-slate-500 font-medium">
              Zero Liability Exposure
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-luxury glass-luxury-hover p-8 sm:p-10 rounded-3xl flex flex-col justify-between min-h-[320px]">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white tracking-tight mb-3">
                Executive Synthesis
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Transforms 50-page complex legal documents into crystal-clear plain English executive briefs in seconds.
              </p>
            </div>
            <div className="pt-6 text-xs text-slate-500 font-medium">
              100% Plain English
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-luxury glass-luxury-hover p-8 sm:p-10 rounded-3xl flex flex-col justify-between min-h-[320px]">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-6">
                <GitCompare className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white tracking-tight mb-3">
                Semantic Redline Diff
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Compare contract revisions side-by-side to immediately detect sneaky additions, deletions, or altered obligations.
              </p>
            </div>
            <div className="pt-6 text-xs text-slate-500 font-medium">
              Granular Version Tracking
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: INTERACTIVE CLAUSE INSPECTOR (Clean & Minimal)
          ========================================================================= */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 mt-36">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            See the intelligence in action.
          </h2>
          <p className="mt-4 text-base text-slate-400">
            Select an example clause below to experience real-time neural breakdown and risk mitigation.
          </p>
        </div>

        {/* Clause Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {sampleClauses.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveClause(idx)}
              className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all ${
                activeClause === idx
                  ? 'bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                  : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Inspector Panel */}
        <div className="glass-luxury p-8 sm:p-12 rounded-3xl border border-white/[0.08]">
          <div className="flex items-center justify-between pb-6 border-b border-white/[0.06] mb-8">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-white">
                {sampleClauses[activeClause].title}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${sampleClauses[activeClause].riskColor}`}>
                {sampleClauses[activeClause].riskBadge}
              </span>
            </div>
            <span className="text-xs text-slate-500 hidden sm:inline">
              Instant AI Analysis
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Raw Legalese */}
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold block mb-3">
                Original Contract Clause
              </span>
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-sm text-slate-300 leading-relaxed font-serif italic">
                {sampleClauses[activeClause].legalese}
              </div>
            </div>

            {/* Plain English & Action */}
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-indigo-400 font-semibold block mb-3">
                  Plain-English Translation
                </span>
                <div className="p-6 rounded-2xl bg-indigo-500/[0.04] border border-indigo-500/20 text-sm text-slate-200 leading-relaxed">
                  {sampleClauses[activeClause].plainEnglish}
                </div>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold block mb-3">
                  Recommended Action
                </span>
                <div className="p-4 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20 text-xs text-emerald-200 leading-relaxed">
                  {sampleClauses[activeClause].recommendation}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: ELEGANT ENTERPRISE CALL TO ACTION
          ========================================================================= */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 mt-40 text-center">
        <div className="glass-luxury p-12 sm:p-16 rounded-3xl border border-white/[0.08] relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
              Never sign blind again.
            </h2>
            <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
              Join thousands of professionals who analyze, review, and negotiate contracts with absolute confidence.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-4 rounded-full btn-luxury-primary text-sm flex items-center justify-center gap-2"
              >
                <span>Get Started for Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-400" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-slate-400" />
                <span>Enterprise Grade Privacy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
