/**
 * Comprehensive 15 Risk Categories Definition and Semantic Matchers
 * Enterprise Legal AI Contract Intelligence System
 */

const RISK_CATEGORIES = [
  {
    id: 'AUTO_RENEWAL',
    category: 'Auto Renewal',
    title: 'Automatic Renewal and Rollover Trap',
    severity: 'medium',
    points: 8,
    patterns: [
      /automatic(?:ally)?\s+renew(?:al|s|ed)?/i,
      /renew(?:al|s)?\s+unless\s+terminated/i,
      /successive\s+(?:one|1|two|2|three|3|twelve|12)?\s*(?:year|month|annual|term)s?/i,
      /evergreen\s+(?:contract|agreement|clause|term)/i,
      /shall\s+(?:be\s+)?extended\s+automatically/i,
      /prior\s+to\s+the\s+expiration\s+of\s+the\s+(?:initial|current)\s+term/i,
      /failure\s+to\s+provide\s+(?:written\s+)?notice\s+of\s+non-renewal/i
    ],
    legalImpact: 'The agreement rolls over into consecutive binding terms automatically, risking lock-in and unintended budgetary exposure if non-renewal notice deadlines are missed.',
    recommendation: 'Negotiate an explicit affirmative opt-in renewal mechanism, or shorten the mandatory non-renewal notice window to no more than 30 days prior to term expiration.',
    saferAlternative: 'This Agreement shall terminate at the end of the Initial Term unless both Parties mutually agree in writing to renew at least thirty (30) days prior to expiration.'
  },
  {
    id: 'UNILATERAL_TERMINATION',
    category: 'Unilateral Termination',
    title: 'Unilateral & Immediate Termination Rights',
    severity: 'high',
    points: 15,
    patterns: [
      /terminate\s+without\s+notice/i,
      /sole\s+(?:and\s+absolute\s+)?discretion/i,
      /provider\s+may\s+terminate\s+at\s+any\s+time/i,
      /terminate\s+(?:this\s+agreement\s+)?at\s+its\s+(?:sole\s+)?option/i,
      /without\s+cause\s+upon\s+immediate\s+notice/i,
      /without\s+liability\s+or\s+further\s+obligation/i,
      /unilateral(?:ly)?\s+cancel/i
    ],
    legalImpact: 'The provider retains discretionary power to suspend or terminate services without cause and without sufficient notice, creating critical operational dependency and disruption risk.',
    recommendation: 'Require bilateral, mutual termination rights requiring at least thirty (30) to sixty (60) days prior written notice and a formal 30-day cure period for any curable material breach.',
    saferAlternative: 'Either Party may terminate this Agreement upon written notice if the other Party materially breaches any provision and fails to cure such breach within thirty (30) days of receipt of notice.'
  },
  {
    id: 'LIMITATION_OF_LIABILITY',
    category: 'Limitation of Liability',
    title: 'Disproportionate Liability Cap & Consequential Damages Exclusion',
    severity: 'high',
    points: 15,
    patterns: [
      /shall\s+not\s+be\s+liable\s+for/i,
      /excludes?\s+all\s+(?:indirect|consequential|special|punitive|incidental)\s+damages/i,
      /limitation\s+of\s+liability/i,
      /total\s+aggregate\s+liability\s+(?:shall\s+not\s+exceed|is\s+limited\s+to)/i,
      /maximum\s+cumulative\s+liability/i,
      /amounts\s+actually\s+paid\s+in\s+the\s+(?:preceding\s+)?(?:three|3|six|6|twelve|12)\s+months/i,
      /under\s+no\s+circumstances\s+shall\s+(?:provider|vendor|company)\s+be\s+held\s+responsible/i
    ],
    legalImpact: 'Severely limits provider financial liability to nominal amounts (often past fees paid) while disclaiming all consequential damages, leaving the customer unprotected against severe operational failure or data breaches.',
    recommendation: 'Carve out gross negligence, willful misconduct, confidentiality breaches, data security lapses, and third-party indemnity obligations from the liability limitation cap.',
    saferAlternative: 'Except for gross negligence, willful misconduct, breaches of confidentiality, and indemnification duties, each party\'s total aggregate liability shall be capped at the total fees paid or payable in the 12 months preceding the claim.'
  },
  {
    id: 'INDEMNIFICATION',
    category: 'Indemnification',
    title: 'Asymmetric or Broad Third-Party Indemnification',
    severity: 'high',
    points: 15,
    patterns: [
      /(?:customer|client|licensee)\s+shall\s+(?:defend,\s+)?indemnify/i,
      /hold\s+harmless\s+(?:provider|vendor|company|licensor)/i,
      /against\s+any\s+and\s+all\s+claims,\s+losses,\s+damages/i,
      /no\s+reciprocal\s+obligation\s+to\s+indemnify/i,
      /unilateral\s+indemnit/i,
      /indemnify,\s+defend\s+and\s+hold\s+harmless/i,
      /solely\s+responsible\s+for\s+any\s+third-party\s+claim/i
    ],
    legalImpact: 'Imposes heavy unilateral legal defense and financial indemnification duties on one party without providing reciprocal defense against intellectual property infringement or vendor breach.',
    recommendation: 'Ensure mutual indemnification: require the provider to defend and indemnify you against intellectual property infringement and regulatory non-compliance claims.',
    saferAlternative: 'Provider shall defend and indemnify Customer against any third-party claims alleging that the Services infringe any intellectual property right, patent, or trade secret.'
  },
  {
    id: 'DATA_OWNERSHIP',
    category: 'Data Ownership',
    title: 'Ambiguous Customer Data Rights & Exploitation Claims',
    severity: 'high',
    points: 15,
    patterns: [
      /provider\s+may\s+use\s+(?:customer|client)\s+data/i,
      /provider\s+may\s+sell\s+data/i,
      /unrestricted\s+data\s+rights/i,
      /perpetual,?\s+irrevocable\s+(?:royalty-free\s+)?license\s+to\s+(?:use|aggregate|analyze|exploit)\s+data/i,
      /derivatives?\s+of\s+customer\s+data/i,
      /de-identified\s+and\s+aggregated\s+data\s+shall\s+be\s+owned\s+by/i,
      /provider\s+owns\s+all\s+telemetry\s+and\s+usage\s+metrics/i
    ],
    legalImpact: 'Customer proprietary records and intellectual assets may be claimed, commercialized, or trained upon by the vendor under broad data licensing clauses.',
    recommendation: 'Explicitly state that Customer retains all exclusive rights, title, and ownership in and to all Customer Data, prohibiting any sale, external training, or unapproved transfer.',
    saferAlternative: 'Customer retains all right, title, and interest in and to all Customer Data. Provider receives only a limited, non-exclusive license solely to perform Services during the Term.'
  },
  {
    id: 'CONFIDENTIALITY_RISKS',
    category: 'Confidentiality Risks',
    title: 'Weak Confidentiality Protections or Short Survival Windows',
    severity: 'high',
    points: 15,
    patterns: [
      /no\s+confidentiality\s+obligation/i,
      /disclosure\s+permitted\s+without\s+consent/i,
      /confidentiality\s+(?:shall\s+expire|terminates)\s+(?:immediately\s+)?(?:upon|after)\s+(?:one|1|two|2)?\s*years?/i,
      /unilateral\s+non-disclosure/i,
      /standard\s+of\s+care\s+limited\s+to/i,
      /disclaimer\s+of\s+proprietary\s+rights/i,
      /permitted\s+to\s+disclose\s+to\s+unaffiliated\s+third\s+parties/i
    ],
    legalImpact: 'Inadequate trade secret protections or rapid expiration of confidentiality covenants exposes proprietary business knowledge, financials, and customer lists.',
    recommendation: 'Enact mutual non-disclosure covenants with a minimum 3 to 5-year survival term, and perpetual survival for core trade secrets and source code.',
    saferAlternative: 'Each Party agrees to protect Confidential Information with at least reasonable care. Confidentiality obligations shall survive termination for five (5) years, and indefinitely for Trade Secrets.'
  },
  {
    id: 'SERVICE_MODIFICATION_RIGHTS',
    category: 'Service Modification Rights',
    title: 'Discretionary Feature Deprecation & Unilateral Service Changes',
    severity: 'medium',
    points: 8,
    patterns: [
      /modify\s+services\s+without\s+notice/i,
      /discontinue\s+services?/i,
      /alter\s+features?\s+(?:at\s+any\s+time|in\s+its\s+sole\s+discretion)/i,
      /provider\s+reserves\s+the\s+right\s+to\s+(?:change|modify|deprecate|retire)/i,
      /without\s+prior\s+notification\s+or\s+liability/i,
      /reduce\s+functionality\s+of\s+the\s+platform/i,
      /services\s+are\s+provided\s+on\s+an\s+as-available\s+basis/i
    ],
    legalImpact: 'Allows the vendor to downgrade critical platform capabilities, eliminate key integrations, or deprecate essential modules without price adjustment or termination remedies.',
    recommendation: 'Require at least 90 days prior written notice before material changes, and provide Customer with a termination right and pro-rata refund if core functionality is reduced.',
    saferAlternative: 'Provider shall not materially degrade the core functionality of the Services during the Term. Any material modification requires 60 days advance written notice and right of pro-rata refund.'
  },
  {
    id: 'GOVERNING_LAW_BIAS',
    category: 'Governing Law Bias',
    title: 'Distant Governing Forum & Mandatory Arbitration Disadvantages',
    severity: 'medium',
    points: 8,
    patterns: [
      /venue\s+chosen\s+solely\s+by\s+provider/i,
      /provider-selected\s+jurisdiction/i,
      /exclusive\s+jurisdiction\s+and\s+venue\s+shall\s+be\s+in/i,
      /shall\s+be\s+resolved\s+by\s+binding\s+arbitration\s+in/i,
      /governed\s+by\s+the\s+laws\s+of\s+(?:the\s+State\s+of\s+)?[A-Z][a-zA-Z\s]+,\s+without\s+regard/i,
      /exclusive\s+forum\s+in\s+[A-Z][a-zA-Z\s]+/i,
      /waives\s+any\s+objection\s+to\s+inconvenient\s+forum/i
    ],
    legalImpact: 'Mandating a remote state or foreign jurisdiction significantly escalates litigation overhead, travel expenses, and legal costs while stripping local statutory protections.',
    recommendation: 'Negotiate a neutral jurisdiction (e.g. Delaware or New York) or the defendant\'s principal place of business.',
    saferAlternative: 'This Agreement shall be governed by the laws of the State of Delaware, and any dispute shall be submitted to the courts located in Delaware or resolved mutually.'
  },
  {
    id: 'FORCE_MAJEURE_ABUSE',
    category: 'Force Majeure Abuse',
    title: 'Overbroad Force Majeure & Delayed Performance Excuses',
    severity: 'medium',
    points: 8,
    patterns: [
      /broad\s+exemptions/i,
      /excuse\s+for\s+any\s+reason/i,
      /force\s+majeure\s+(?:includes|shall\s+mean|event)/i,
      /excused\s+from\s+any\s+failure\s+or\s+delay/i,
      /labor\s+disputes,\s+vendor\s+outages,\s+internet\s+failures/i,
      /failure\s+of\s+third-party\s+suppliers/i,
      /beyond\s+the\s+reasonable\s+control\s+of\s+provider/i
    ],
    legalImpact: 'Excessively broad force majeure definitions can be used to excuse routine vendor outages, staffing delays, and systemic performance failures without penalty or SLA credits.',
    recommendation: 'Exclude standard technical maintenance, cybersecurity failures, and staffing shortages from force majeure. Provide termination rights if force majeure persists beyond 30 days.',
    saferAlternative: 'If an authentic Force Majeure event prevents performance for more than thirty (30) consecutive days, either Party may terminate the Agreement without penalty.'
  },
  {
    id: 'PAYMENT_PENALTIES',
    category: 'Payment Penalties',
    title: 'Compounding Late Interest Penalties & Fee Acceleration',
    severity: 'medium',
    points: 8,
    patterns: [
      /excessive\s+interest/i,
      /excessive\s+penalties/i,
      /(?:1\.5%|2%|18%|24%)\s+(?:per\s+month|per\s+annum|compounded)/i,
      /late\s+payments?\s+shall\s+accrue\s+interest/i,
      /acceleration\s+of\s+all\s+(?:remaining\s+)?fees/i,
      /100%\s+of\s+all\s+remaining\s+fees/i,
      /collection\s+costs\s+and\s+attorney'?s\s+fees/i
    ],
    legalImpact: 'High compounding late fees (e.g. 1.5% to 2% monthly / 18-24% annual APR) and immediate acceleration clauses create massive financial exposure over minor billing delays.',
    recommendation: 'Request a standard 10-15 business day cure/grace period following written notice before any late fees apply, and cap late interest at 1.0% per month or the statutory minimum.',
    saferAlternative: 'Late balances shall accrue interest at 1.0% per month (or the maximum permitted by law), commencing only after thirty (30) days formal written notice of past-due status.'
  },
  {
    id: 'IP_TRANSFER',
    category: 'Intellectual Property Transfer',
    title: 'Unintended Intellectual Property Transfer & Work Product Assignment',
    severity: 'high',
    points: 15,
    patterns: [
      /transfer\s+ownership/i,
      /assign\s+ip\s+rights/i,
      /all\s+inventions,\s+discoveries,\s+and\s+developments/i,
      /work\s+made\s+for\s+hire/i,
      /customer\s+hereby\s+assigns\s+all\s+rights/i,
      /inventions?\s+assignment\s+extending\s+beyond/i,
      /provider\s+shall\s+own\s+all\s+customizations,\s+configurations,\s+and\s+feedback/i
    ],
    legalImpact: 'Vague IP clauses may unintentionally forfeit customer proprietary enhancements, bespoke scripts, integrations, and pre-existing business assets to the vendor.',
    recommendation: 'Retain explicit ownership over all Customer Pre-Existing IP, bespoke workflows, and derivative configurations created specifically for Customer.',
    saferAlternative: 'Customer retains exclusive ownership over Customer IP, custom workflows, and data. Provider retains ownership only over its pre-existing core software.'
  },
  {
    id: 'CLASS_ACTION_WAIVER',
    category: 'Class Action Waiver',
    title: 'Mandatory Class Action Waiver & Jury Trial Renunciation',
    severity: 'medium',
    points: 8,
    patterns: [
      /waive\s+collective\s+actions/i,
      /class\s+action\s+prohibited/i,
      /waiver\s+of\s+class\s+action/i,
      /waive\s+(?:the\s+right\s+to\s+)?a\s+jury\s+trial/i,
      /only\s+in\s+an\s+individual\s+capacity/i,
      /no\s+arbitration\s+or\s+claim\s+under\s+this\s+agreement\s+shall\s+be\s+joined/i,
      /shall\s+not\s+participate\s+as\s+a\s+class\s+representative/i
    ],
    legalImpact: 'Eliminates collective bargaining and joint legal actions, forcing each dispute into individual, expensive private arbitration.',
    recommendation: 'Evaluate if class action waiver is acceptable based on commercial leverage and ensure reciprocal jury trial waivers if maintained.',
    saferAlternative: 'Both parties agree to negotiate in good faith for 30 days prior to initiating formal litigation or individual arbitration.'
  },
  {
    id: 'EXCLUSIVITY_CLAUSES',
    category: 'Exclusivity Clauses',
    title: 'Restrictive Vendor Exclusivity & Sourcing Bans',
    severity: 'medium',
    points: 8,
    patterns: [
      /exclusive\s+provider/i,
      /no\s+competing\s+vendors/i,
      /customer\s+shall\s+not\s+engage\s+(?:any\s+other|third-party)\s+provider/i,
      /sole\s+and\s+exclusive\s+source/i,
      /exclusivity\s+(?:covenant|restriction)/i,
      /prohibited\s+from\s+purchasing\s+equivalent\s+services/i
    ],
    legalImpact: 'Precludes your business from engaging secondary or fallback vendors, creating dangerous single-vendor supply chain and uptime risks.',
    recommendation: 'Eliminate exclusivity language to permit multi-vendor redundancy, or tie exclusivity to guaranteed discount thresholds and strict SLA guarantees.',
    saferAlternative: 'This Agreement is non-exclusive. Customer reserves the right to procure similar services from other third-party vendors at its sole discretion.'
  },
  {
    id: 'NON_COMPETE_CLAUSES',
    category: 'Non-Compete Clauses',
    title: 'Onerous Non-Compete & Restrictive Business Covenants',
    severity: 'high',
    points: 15,
    patterns: [
      /cannot\s+work\s+with\s+competitors/i,
      /non-compete/i,
      /shall\s+not\s+engage\s+in,\s+advise,\s+invest\s+in/i,
      /during\s+employment\s+and\s+for\s+(?:12|24|36|\d+)\s+months\s+thereafter/i,
      /competitive\s+business\s+within/i,
      /geographic\s+scope\s+covering/i,
      /non-competition\s+and\s+non-solicitation/i
    ],
    legalImpact: 'Significantly impairs career mobility, business partnerships, or executive hiring by locking individuals or subsidiaries out of entire industry sectors post-termination.',
    recommendation: 'Narrow the scope strictly to direct solicitation of specific accounts, shorten duration to under 6 months, and provide mandatory paid garden leave.',
    saferAlternative: 'During the term and for six (6) months following termination, Executive shall not solicit active clients of the Company directly solicited during the final year of engagement.'
  },
  {
    id: 'DATA_RETENTION_RISKS',
    category: 'Data Retention Risks',
    title: 'Indefinite Data Retention & Lack of Deletion Rights',
    severity: 'medium',
    points: 8,
    patterns: [
      /retain\s+data\s+indefinitely/i,
      /no\s+deletion\s+rights/i,
      /data\s+retention\s+policy/i,
      /provider\s+may\s+retain\s+archival\s+copies/i,
      /not\s+obligated\s+to\s+delete\s+or\s+destroy/i,
      /retained\s+for\s+compliance\s+or\s+backup\s+purposes\s+without\s+time\s+limit/i,
      /right\s+to\s+erasure\s+is\s+excluded/i
    ],
    legalImpact: 'Vendor retains customer confidential records and personally identifiable data indefinitely after contract expiration, violating GDPR/CCPA data minimization principles.',
    recommendation: 'Mandate complete certified data destruction or export within thirty (30) days of contract termination.',
    saferAlternative: 'Within thirty (30) days of termination, Provider shall permanently delete or return all Customer Data and provide written certification of destruction.'
  }
];

module.exports = {
  RISK_CATEGORIES
};
