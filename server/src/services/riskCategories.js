/**
 * Enterprise Legal Risk Taxonomy & Semantic Knowledge Base
 * 30 Enterprise Risk Categories for Contract Intelligence
 */

const ENTERPRISE_RISK_TAXONOMY = [
  {
    id: 'AUTO_RENEWAL',
    category: 'Auto Renewal',
    title: 'Automatic Renewal & Perpetual Rollover',
    severity: 'medium',
    baseWeight: 8,
    affectedParty: 'Customer / Licensee',
    patterns: [
      /automatic(?:ally)?\s+renew(?:al|s|ed)?/i,
      /renew(?:al|s)?\s+unless\s+terminated/i,
      /successive\s+(?:one|1|two|2|three|3|twelve|12)?\s*(?:year|month|annual|term)s?/i,
      /evergreen\s+(?:contract|agreement|clause|term)/i,
      /shall\s+(?:be\s+)?extended\s+automatically/i,
      /prior\s+to\s+the\s+expiration\s+of\s+the\s+(?:initial|current)\s+term/i,
      /failure\s+to\s+provide\s+(?:written\s+)?notice\s+of\s+non-renewal/i,
      /rollover\s+for\s+additional\s+terms/i
    ],
    semanticTriggers: ['automatic renewal', 'successive terms', 'evergreen', 'renew unless cancelled', 'opt out window'],
    whyItMatters: 'Traps the buyer into unplanned annual financial commitments if calendar reminders or rigid non-renewal notice windows are missed.',
    legalImpact: 'The contract automatically extends into consecutive binding terms, preventing budget reallocation and renegotiation.',
    recommendation: 'Replace automatic rollover with an affirmative written renewal clause, or mandate written reminder notice from the vendor 60 days before the deadline.',
    saferAlternative: 'This Agreement shall terminate at the conclusion of the Initial Term unless renewed by mutual written agreement of both Parties at least thirty (30) days prior to expiration.'
  },
  {
    id: 'UNILATERAL_TERMINATION',
    category: 'Unilateral Termination',
    title: 'Unilateral Discretionary Termination',
    severity: 'high',
    baseWeight: 15,
    affectedParty: 'Customer / Licensee',
    patterns: [
      /terminate\s+without\s+notice/i,
      /sole\s+(?:and\s+absolute\s+)?discretion/i,
      /provider\s+may\s+terminate\s+at\s+any\s+time/i,
      /terminate\s+(?:this\s+agreement\s+)?at\s+its\s+(?:sole\s+)?option/i,
      /without\s+cause\s+upon\s+immediate\s+notice/i,
      /without\s+liability\s+or\s+further\s+obligation/i,
      /unilateral(?:ly)?\s+cancel/i,
      /reserve\s+the\s+right\s+to\s+suspend\s+or\s+terminate/i
    ],
    semanticTriggers: ['terminate at discretion', 'cancel without notice', 'sole option to terminate', 'suspend at will'],
    whyItMatters: 'Leaves your business vulnerable to sudden software cutoff, service interruption, and business disruption without cause.',
    legalImpact: 'Grants one party unrestricted power to terminate services immediately while restricting the other party to rigid notice windows.',
    recommendation: 'Demand bilateral termination terms requiring 30 to 60 days prior written notice with a formal 30-day cure period for any curable breach.',
    saferAlternative: 'Either Party may terminate this Agreement upon written notice if the other Party materially breaches any obligation and fails to cure such breach within thirty (30) days of receipt of written notice.'
  },
  {
    id: 'LIABILITY_LIMITATION',
    category: 'Liability Limitation',
    title: 'Disproportionate Aggregate Liability Cap',
    severity: 'high',
    baseWeight: 15,
    affectedParty: 'Customer / Buyer',
    patterns: [
      /limitation\s+of\s+liability/i,
      /total\s+aggregate\s+liability\s+(?:shall\s+not\s+exceed|is\s+limited\s+to)/i,
      /maximum\s+cumulative\s+liability/i,
      /amounts\s+actually\s+paid\s+in\s+the\s+(?:preceding\s+)?(?:three|3|six|6|twelve|12)\s+months/i,
      /aggregate\s+liability\s+arising\s+out\s+of\s+or\s+related\s+to/i,
      /capped\s+at\s+the\s+fees\s+paid/i
    ],
    semanticTriggers: ['aggregate liability capped', 'liability limited to fees paid', 'maximum recovery limit'],
    whyItMatters: 'If the vendor causes a critical data breach or system collapse, monetary recovery is limited to nominal subscription fees.',
    legalImpact: 'Severely curtails financial recovery for direct damages while leaving customer exposure uncapped.',
    recommendation: 'Negotiate a super-cap (e.g., 3x-5x annual contract value) for confidentiality, data protection, and gross negligence breaches.',
    saferAlternative: 'Except for claims arising from gross negligence, willful misconduct, confidentiality breaches, or indemnification obligations, each Party\'s aggregate liability shall not exceed three times (3x) the total fees paid or payable in the 12 months preceding the claim.'
  },
  {
    id: 'LIABILITY_EXCLUSION',
    category: 'Liability Exclusion',
    title: 'Broad Consequential & Indirect Damages Disclaimer',
    severity: 'high',
    baseWeight: 15,
    affectedParty: 'Customer / Buyer',
    patterns: [
      /shall\s+not\s+be\s+liable\s+for/i,
      /excludes?\s+all\s+(?:indirect|consequential|special|punitive|incidental)\s+damages/i,
      /lost\s+profits,\s+lost\s+revenue,\s+or\s+loss\s+of\s+data/i,
      /under\s+no\s+circumstances\s+shall\s+(?:provider|vendor|company)\s+be\s+held\s+responsible/i,
      /waiver\s+of\s+consequential\s+damages/i
    ],
    semanticTriggers: ['no consequential damages', 'excludes lost profits', 'disclaims all indirect damages'],
    whyItMatters: 'Disclaims responsibility for lost revenue, data reconstruction costs, and regulatory fines caused by vendor failures.',
    legalImpact: 'Shields the vendor from the real financial consequences of system downtime, data loss, or security incidents.',
    recommendation: 'Ensure mutual consequential damages waivers have carve-outs for data security breaches, confidentiality violations, and third-party indemnities.',
    saferAlternative: 'Neither party shall be liable for indirect or consequential damages; provided, however, that this exclusion shall not apply to breach of confidentiality, data protection obligations, or third-party indemnification.'
  },
  {
    id: 'ONE_SIDED_INDEMNIFICATION',
    category: 'One-Sided Indemnification',
    title: 'Asymmetric Third-Party Indemnity Obligation',
    severity: 'high',
    baseWeight: 15,
    affectedParty: 'Customer / Licensee',
    patterns: [
      /(?:customer|client|licensee)\s+shall\s+(?:defend,\s+)?indemnify/i,
      /hold\s+harmless\s+(?:provider|vendor|company|licensor)/i,
      /against\s+any\s+and\s+all\s+claims,\s+losses,\s+damages/i,
      /no\s+reciprocal\s+obligation\s+to\s+indemnify/i,
      /unilateral\s+indemnit/i,
      /indemnify,\s+defend\s+and\s+hold\s+harmless/i,
      /solely\s+responsible\s+for\s+any\s+third-party\s+claim/i
    ],
    semanticTriggers: ['customer indemnifies provider', 'no reciprocal indemnity', 'defend and hold harmless vendor'],
    whyItMatters: 'Customer is forced to pay vendor legal fees and judgment debts without receiving reciprocal protection for vendor IP infringement.',
    legalImpact: 'Creates major uncapped financial exposure by shifting third-party litigation costs entirely onto the customer.',
    recommendation: 'Demand reciprocal IP infringement defense and limit customer indemnity strictly to direct gross negligence or breach of license terms.',
    saferAlternative: 'Each Party shall mutually defend, indemnify, and hold harmless the other Party against third-party claims arising from its gross negligence, intentional misconduct, or intellectual property infringement.'
  },
  {
    id: 'DATA_OWNERSHIP_RISK',
    category: 'Data Ownership Risk',
    title: 'Customer Data Appropriation & License Overreach',
    severity: 'high',
    baseWeight: 15,
    affectedParty: 'Customer / Data Owner',
    patterns: [
      /provider\s+may\s+use\s+(?:customer|client)\s+data/i,
      /unrestricted\s+data\s+rights/i,
      /perpetual,?\s+irrevocable\s+(?:royalty-free\s+)?license\s+to\s+(?:use|aggregate|analyze|exploit)\s+data/i,
      /derivatives?\s+of\s+customer\s+data/i,
      /de-identified\s+and\s+aggregated\s+data\s+shall\s+be\s+owned\s+by/i,
      /provider\s+owns\s+all\s+telemetry\s+and\s+usage\s+metrics/i
    ],
    semanticTriggers: ['vendor owns derivative data', 'perpetual license to customer data', 'broad data rights'],
    whyItMatters: 'Vendor may claim ownership or unrestricted derivative rights over your proprietary business records, customer lists, or AI training assets.',
    legalImpact: 'Weakens customer proprietary IP and risks unauthorized downstream data commercialization.',
    recommendation: 'Explicitly affirm that Customer owns all Customer Data, metadata, and derivatives, granting only a temporary operational license.',
    saferAlternative: 'Customer retains sole and exclusive ownership of all right, title, and interest in and to all Customer Data. Provider is granted a limited license solely to deliver Services during the active Term.'
  },
  {
    id: 'DATA_COMMERCIALIZATION_RISK',
    category: 'Data Commercialization Risk',
    title: 'Third-Party Data Monetization & Model Training Rights',
    severity: 'high',
    baseWeight: 15,
    affectedParty: 'Customer / Data Subject',
    patterns: [
      /provider\s+may\s+sell\s+data/i,
      /monetize\s+(?:customer|user)\s+data/i,
      /train\s+(?:machine\s+learning|ai|foundation)\s+models/i,
      /commercialize\s+aggregated\s+insights/i,
      /share\s+data\s+with\s+affiliates\s+and\s+partners\s+for\s+marketing/i,
      /use\s+data\s+to\s+improve\s+third-party\s+products/i
    ],
    semanticTriggers: ['train AI models on data', 'sell customer data', 'monetize telemetry', 'share data with third parties'],
    whyItMatters: 'Exposes sensitive organizational data or confidential prompts to third parties or competitor benchmarking models.',
    legalImpact: 'Risks regulatory non-compliance under GDPR/CCPA and forfeits proprietary algorithmic competitive advantages.',
    recommendation: 'Incorporate a strict zero-data-retention and zero-external-training warranty.',
    saferAlternative: 'Provider warrants that Customer Data will never be sold, commercialized, shared with unauthorized third parties, or used to train public foundation AI models.'
  },
  {
    id: 'CONFIDENTIALITY_RISK',
    category: 'Confidentiality Risk',
    title: 'Short Confidentiality Survival or Loose Standard of Care',
    severity: 'high',
    baseWeight: 15,
    affectedParty: 'Disclosing Party',
    patterns: [
      /no\s+confidentiality\s+obligation/i,
      /disclosure\s+permitted\s+without\s+consent/i,
      /confidentiality\s+(?:shall\s+expire|terminates)\s+(?:immediately\s+)?(?:upon|after)\s+(?:one|1|two|2)?\s*years?/i,
      /unilateral\s+non-disclosure/i,
      /standard\s+of\s+care\s+limited\s+to/i,
      /permitted\s+to\s+disclose\s+to\s+unaffiliated\s+third\s+parties/i
    ],
    semanticTriggers: ['short confidentiality term', 'weak trade secret protection', 'disclosure without consent'],
    whyItMatters: 'Confidential trade secrets and financials become public or unprotected prematurely after contract expiration.',
    legalImpact: 'Forfeits trade secret legal protections under Defend Trade Secrets Act (DTSA) if reasonable protective measures lapse.',
    recommendation: 'Mandate a minimum 5-year confidentiality survival term, with perpetual survival for trade secrets and source code.',
    saferAlternative: 'Confidentiality obligations shall survive termination of this Agreement for five (5) years, and indefinitely for Trade Secrets and proprietary source code.'
  },
  {
    id: 'SERVICE_MODIFICATION_RISK',
    category: 'Service Modification Risk',
    title: 'Unilateral Feature Deprecation & Scope Reduction',
    severity: 'medium',
    baseWeight: 8,
    affectedParty: 'Customer / User',
    patterns: [
      /modify\s+services\s+without\s+notice/i,
      /discontinue\s+services?/i,
      /alter\s+features?\s+(?:at\s+any\s+time|in\s+its\s+sole\s+discretion)/i,
      /provider\s+reserves\s+the\s+right\s+to\s+(?:change|modify|deprecate|retire)/i,
      /without\s+prior\s+notification\s+or\s+liability/i,
      /reduce\s+functionality\s+of\s+the\s+platform/i
    ],
    semanticTriggers: ['modify features without notice', 'discontinue service at discretion', 'deprecate functionality'],
    whyItMatters: 'Vendor can remove critical integrations, core functionality, or SLAs mid-term without price reduction.',
    legalImpact: 'Permits unilateral contract variance and service degradation while holding customer locked into payment terms.',
    recommendation: 'Require 60 days advance written notice before material changes, with right of termination and pro-rata refund.',
    saferAlternative: 'Provider warrants that it shall not materially degrade the core functionality of the Services during the Term without Customer\'s prior written consent.'
  },
  {
    id: 'FORCE_MAJEURE_ABUSE',
    category: 'Force Majeure Abuse',
    title: 'Overbroad Force Majeure & Delayed Performance Excuses',
    severity: 'medium',
    baseWeight: 8,
    affectedParty: 'Customer',
    patterns: [
      /broad\s+exemptions/i,
      /excuse\s+for\s+any\s+reason/i,
      /force\s+majeure\s+(?:includes|shall\s+mean|event)/i,
      /excused\s+from\s+any\s+failure\s+or\s+delay/i,
      /labor\s+disputes,\s+vendor\s+outages,\s+internet\s+failures/i,
      /failure\s+of\s+third-party\s+suppliers/i
    ],
    semanticTriggers: ['broad force majeure', 'excuse outages as force majeure', 'delay excused indefinitely'],
    whyItMatters: 'Excuses routine technical outages, vendor supplier delays, and staffing issues as unforeseen force majeure events.',
    legalImpact: 'Denies customer service credits and contract breach remedies for operational failures.',
    recommendation: 'Exclude cyber incidents and ordinary commercial supplier failures from force majeure; permit termination if event exceeds 30 days.',
    saferAlternative: 'If a genuine Force Majeure event prevents performance for more than thirty (30) consecutive days, either Party may terminate this Agreement with immediate refund of unearned fees.'
  },
  {
    id: 'VENUE_BIAS',
    category: 'Venue Bias',
    title: 'Distant or Inconvenient Litigation Forum',
    severity: 'medium',
    baseWeight: 8,
    affectedParty: 'Out-of-State Party',
    patterns: [
      /venue\s+chosen\s+solely\s+by\s+provider/i,
      /exclusive\s+jurisdiction\s+and\s+venue\s+shall\s+be\s+in/i,
      /exclusive\s+forum\s+in\s+[A-Z][a-zA-Z\s]+/i,
      /waives\s+any\s+objection\s+to\s+inconvenient\s+forum/i,
      /courts\s+located\s+in\s+[A-Z][a-zA-Z\s]+,\s+and\s+no\s+other/i
    ],
    semanticTriggers: ['exclusive venue in provider home state', 'waive forum objections', 'distant litigation forum'],
    whyItMatters: 'Forces you to hire out-of-state counsel and travel to distant jurisdictions to enforce contractual rights or defend claims.',
    legalImpact: 'Significantly increases dispute costs and logistical friction in litigation.',
    recommendation: 'Designate a neutral commercial jurisdiction (Delaware or New York) or defendant\'s principal place of business.',
    saferAlternative: 'Legal proceedings shall be initiated in the defendant Party\'s principal place of business, or in the commercial courts of Delaware.'
  },
  {
    id: 'GOVERNING_LAW_BIAS',
    category: 'Governing Law Bias',
    title: 'Unfavorable State Law Governing Jurisdiction',
    severity: 'medium',
    baseWeight: 8,
    affectedParty: 'Customer / Employee',
    patterns: [
      /governed\s+by\s+the\s+laws\s+of\s+(?:the\s+State\s+of\s+)?[A-Z][a-zA-Z\s]+,\s+without\s+regard/i,
      /governing\s+law\s+shall\s+be/i,
      /construed\s+in\s+accordance\s+with\s+the\s+laws\s+of/i
    ],
    semanticTriggers: ['governing law of unfavorable state', 'choice of law bias'],
    whyItMatters: 'Governing statutory law dictates enforceability of restrictive covenants, liability caps, and consumer protections.',
    legalImpact: 'Applying employer/vendor-favored state law may validate non-competes and strict penalty clauses that would otherwise fail locally.',
    recommendation: 'Select Delaware or New York commercial law with well-established business contract precedent.',
    saferAlternative: 'This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to conflict of laws principles.'
  },
  {
    id: 'EXCESSIVE_PENALTIES',
    category: 'Excessive Penalties',
    title: 'Compounding Late Fees & 100% Acceleration Penalties',
    severity: 'medium',
    baseWeight: 8,
    affectedParty: 'Debtor / Payor',
    patterns: [
      /excessive\s+interest/i,
      /excessive\s+penalties/i,
      /(?:1\.5%|2%|18%|24%)\s+(?:per\s+month|per\s+annum|compounded)/i,
      /late\s+payments?\s+shall\s+accrue\s+interest/i,
      /acceleration\s+of\s+all\s+(?:remaining\s+)?fees/i,
      /100%\s+of\s+all\s+remaining\s+fees/i,
      /liquidated\s+damages\s+equal\s+to\s+the\s+remainder/i
    ],
    semanticTriggers: ['18% annual late interest', '100% acceleration penalty', 'liquidated damages trap'],
    whyItMatters: 'Invoicing delays or administrative processing issues trigger massive compounding interest or accelerated payment of entire multi-year fees.',
    legalImpact: 'Imposes severe contractual liquidated damages exceeding reasonable compensation for delay.',
    recommendation: 'Mandate a 15-day grace period following written past-due notice, and cap late interest at 1.0% per month.',
    saferAlternative: 'Late payments shall accrue interest at 1.0% per month, commencing only after fifteen (15) days written notice of overdue invoice status.'
  },
  {
    id: 'IP_TRANSFER',
    category: 'Intellectual Property Transfer',
    title: 'Involuntary Assignment of Pre-Existing IP & Custom Work',
    severity: 'high',
    baseWeight: 15,
    affectedParty: 'Creator / Customer',
    patterns: [
      /transfer\s+ownership/i,
      /assign\s+ip\s+rights/i,
      /all\s+inventions,\s+discoveries,\s+and\s+developments/i,
      /work\s+made\s+for\s+hire/i,
      /customer\s+hereby\s+assigns\s+all\s+rights/i,
      /inventions?\s+assignment\s+extending\s+beyond/i,
      /provider\s+shall\s+own\s+all\s+customizations,\s+configurations,\s+and\s+feedback/i
    ],
    semanticTriggers: ['customer assigns all IP', 'vendor owns custom developments', 'inventions assignment'],
    whyItMatters: 'Customer inadvertently forfeits ownership of proprietary configurations, internal integrations, and bespoke enhancements.',
    legalImpact: 'Transfers valuable intellectual property assets to the vendor without fair consideration.',
    recommendation: 'Explicitly reserve ownership over all Customer Background IP and bespoke deliverable workflows.',
    saferAlternative: 'Customer retains all right, title, and ownership in all Customer Background IP and custom deliverables created specifically for Customer.'
  },
  {
    id: 'WARRANTY_DISCLAIMER',
    category: 'Warranty Disclaimer',
    title: 'Complete "As-Is" Performance & Uptime Disclaimer',
    severity: 'medium',
    baseWeight: 8,
    affectedParty: 'Customer / Buyer',
    patterns: [
      /as\s+is\s+and\s+as\s+available/i,
      /disclaims\s+all\s+(?:express\s+or\s+implied\s+)?warranties/i,
      /merchantability\s+or\s+fitness\s+for\s+a\s+particular\s+purpose/i,
      /does\s+not\s+warrant\s+uninterrupted\s+or\s+error-free/i,
      /without\s+warranty\s+of\s+any\s+kind/i
    ],
    semanticTriggers: ['as-is software warranty', 'disclaims fitness for purpose', 'no uptime warranty'],
    whyItMatters: 'Vendor disclaims that the software will function correctly, be secure, or remain available for critical business needs.',
    legalImpact: 'Eliminates breach of warranty claims if the service fails completely to perform basic promised functions.',
    recommendation: 'Require express warranties that services will perform materially in accordance with published documentation.',
    saferAlternative: 'Provider warrants that the Services shall perform materially in conformance with the Documentation and industry-standard security practices.'
  },
  {
    id: 'CLASS_ACTION_WAIVER',
    category: 'Class Action Waiver',
    title: 'Mandatory Class Action & Collective Claim Waiver',
    severity: 'medium',
    baseWeight: 8,
    affectedParty: 'Individual Claimants',
    patterns: [
      /waive\s+collective\s+actions/i,
      /class\s+action\s+prohibited/i,
      /waiver\s+of\s+class\s+action/i,
      /waive\s+(?:the\s+right\s+to\s+)?a\s+jury\s+trial/i,
      /only\s+in\s+an\s+individual\s+capacity/i,
      /shall\s+not\s+participate\s+as\s+a\s+class\s+representative/i
    ],
    semanticTriggers: ['waive class action', 'individual arbitration only', 'waive collective lawsuit'],
    whyItMatters: 'Precludes grouping shared claims with other affected customers or employees, increasing litigation costs per claim.',
    legalImpact: 'Restricts procedural avenues for redress to individual dispute actions.',
    recommendation: 'Ensure mutual mediation steps before arbitration and reserve right to small claims court.',
    saferAlternative: 'Parties agree to attempt direct good-faith senior executive negotiations for 30 days prior to initiating formal dispute proceedings.'
  },
  {
    id: 'ARBITRATION_RESTRICTION',
    category: 'Arbitration Restriction',
    title: 'Mandatory Confidential Binding Arbitration Mandate',
    severity: 'medium',
    baseWeight: 8,
    affectedParty: 'Plaintiff / Claimant',
    patterns: [
      /binding\s+arbitration/i,
      /american\s+arbitration\s+association/i,
      /jams\s+comprehensive\s+arbitration/i,
      /arbitrator'?s\s+decision\s+shall\s+be\s+final\s+and\s+binding/i,
      /waive\s+the\s+right\s+to\s+a\s+court\s+trial/i
    ],
    semanticTriggers: ['mandatory binding arbitration', 'waive judicial review', 'private arbitration requirement'],
    whyItMatters: 'Eliminates public court record, jury rights, and judicial appeals, while requiring substantial upfront arbitration filing fees.',
    legalImpact: 'Forfeits formal discovery tools and appellate review mechanisms.',
    recommendation: 'Carve out intellectual property infringement and injunctive relief claims from mandatory arbitration.',
    saferAlternative: 'Either Party may seek preliminary injunctive or equitable relief in any court of competent jurisdiction to protect intellectual property.'
  },
  {
    id: 'EXCLUSIVITY_LOCKIN',
    category: 'Exclusivity Lock-In',
    title: 'Strict Sole-Source Vendor Exclusivity Mandate',
    severity: 'medium',
    baseWeight: 8,
    affectedParty: 'Customer / Buyer',
    patterns: [
      /exclusive\s+provider/i,
      /no\s+competing\s+vendors/i,
      /customer\s+shall\s+not\s+engage\s+(?:any\s+other|third-party)\s+provider/i,
      /sole\s+and\s+exclusive\s+source/i,
      /exclusivity\s+(?:covenant|restriction)/i
    ],
    semanticTriggers: ['exclusive vendor mandate', 'prohibited from using competitors', 'sole source lock in'],
    whyItMatters: 'Bars the enterprise from using alternative backup software or secondary suppliers during supply chain or service crises.',
    legalImpact: 'Creates single-vendor dependency and anti-competitive purchasing constraints.',
    recommendation: 'Remove exclusivity language or tie exclusivity to guaranteed pricing discounts and 99.99% SLA commitments.',
    saferAlternative: 'This Agreement is non-exclusive. Customer explicitly retains the right to procure similar services from other third parties.'
  },
  {
    id: 'NON_COMPETE',
    category: 'Non-Compete',
    title: 'Onerous Post-Termination Non-Compete Covenant',
    severity: 'high',
    baseWeight: 15,
    affectedParty: 'Employee / Contractor',
    patterns: [
      /cannot\s+work\s+with\s+competitors/i,
      /non-compete/i,
      /shall\s+not\s+engage\s+in,\s+advise,\s+invest\s+in/i,
      /during\s+employment\s+and\s+for\s+(?:12|24|36|\d+)\s+months\s+thereafter/i,
      /competitive\s+business\s+within/i,
      /non-competition\s+and\s+non-solicitation/i
    ],
    semanticTriggers: ['24 month non compete', 'cannot work for competitor', 'restrictive covenant on employment'],
    whyItMatters: 'Severely damages future career mobility and ability to earn a living in one\'s specialized industry.',
    legalImpact: 'Extensive multi-year, multi-geography restrictions that may violate FTC and state law guidelines.',
    recommendation: 'Narrow restriction strictly to direct solicitation of specific key customer accounts with paid garden leave.',
    saferAlternative: 'During the term and for six (6) months thereafter, Executive shall not directly solicit active clients of the Company with whom Executive had personal contact.'
  },
  {
    id: 'DATA_RETENTION_RISK',
    category: 'Data Retention Risk',
    title: 'Indefinite Data Retention & Lack of Destruction Rights',
    severity: 'medium',
    baseWeight: 8,
    affectedParty: 'Customer / Regulated Entity',
    patterns: [
      /retain\s+data\s+indefinitely/i,
      /no\s+deletion\s+rights/i,
      /data\s+retention\s+policy/i,
      /provider\s+may\s+retain\s+archival\s+copies/i,
      /not\s+obligated\s+to\s+delete\s+or\s+destroy/i,
      /retained\s+for\s+compliance\s+or\s+backup\s+purposes\s+without\s+time\s+limit/i
    ],
    semanticTriggers: ['retain customer records indefinitely', 'no purge rights', 'vendor keeps backups forever'],
    whyItMatters: 'Leaves enterprise data exposed to lingering data breaches and violates GDPR/CCPA data minimization mandates.',
    legalImpact: 'Creates compliance liabilities under state privacy laws and GDPR Article 17 (Right to Erasure).',
    recommendation: 'Mandate complete certified data destruction or encrypted archive return within 30 days of termination.',
    saferAlternative: 'Within thirty (30) days of termination, Provider shall permanently delete or export all Customer Data and certify destruction in writing.'
  },
  {
    id: 'BROAD_AUDIT_RIGHTS',
    category: 'Broad Audit Rights',
    title: 'Disruptive On-Site Vendor Audit & Inspection Powers',
    severity: 'medium',
    baseWeight: 8,
    affectedParty: 'Customer / Licensee',
    patterns: [
      /audit\s+customer'?s\s+(?:facilities|records|systems)/i,
      /on-site\s+inspection\s+at\s+any\s+time/i,
      /provider\s+may\s+audit\s+without\s+notice/i,
      /customer\s+shall\s+pay\s+all\s+costs\s+of\s+audit/i,
      /unrestricted\s+access\s+to\s+books\s+and\s+records/i
    ],
    semanticTriggers: ['vendor audit at any time', 'customer pays audit costs', 'on site physical audit'],
    whyItMatters: 'Allows vendor to conduct unannounced on-site inspections, inspect unrelated customer records, and bill audit expenses.',
    legalImpact: 'Intrudes on business privacy and creates unexpected fee assessments for minor compliance discrepancies.',
    recommendation: 'Limit audits to once annually during normal business hours with 30 days advance notice, paying costs only if >5% underpayment is found.',
    saferAlternative: 'Provider may audit compliance once per calendar year upon thirty (30) business days advance written notice during regular working hours.'
  },
  {
    id: 'ASSIGNMENT_WITHOUT_CONSENT',
    category: 'Assignment Without Consent',
    title: 'Unilateral Assignment to Third Parties or Competitors',
    severity: 'medium',
    baseWeight: 8,
    affectedParty: 'Customer / Licensee',
    patterns: [
      /assign\s+without\s+consent/i,
      /provider\s+may\s+assign\s+this\s+agreement/i,
      /transfer\s+to\s+any\s+successor\s+or\s+affiliate/i,
      /without\s+the\s+prior\s+written\s+consent\s+of\s+customer/i
    ],
    semanticTriggers: ['unilateral assignment', 'vendor may transfer agreement', 'assign without customer consent'],
    whyItMatters: 'Your confidential contract and data could be transferred to a direct competitor or distressed private equity buyer.',
    legalImpact: 'Forces the customer into a binding contract with an unvetted successor entity.',
    recommendation: 'Require mutual written consent for any assignment, with exception only for bona fide merger/acquisition with solvency guarantees.',
    saferAlternative: 'Neither Party may assign or transfer this Agreement without the prior written consent of the other Party, not to be unreasonably withheld.'
  },
  {
    id: 'CHANGE_OF_CONTROL_RISK',
    category: 'Change-of-Control Risk',
    title: 'Acquisition Triggered Price Escalation or Termination',
    severity: 'medium',
    baseWeight: 8,
    affectedParty: 'Acquired Entity',
    patterns: [
      /change\s+of\s+control/i,
      /merger,\s+acquisition,\s+or\s+sale\s+of\s+assets/i,
      /right\s+to\s+terminate\s+upon\s+change\s+of\s+control/i,
      /renegotiate\s+fees\s+upon\s+acquisition/i
    ],
    semanticTriggers: ['change of control termination', 'price hike on merger', 'acquisition triggers default'],
    whyItMatters: 'If your company is acquired, vendor may terminate software access or demand immediate price multipliers.',
    legalImpact: 'Impedes corporate M&A transactions and creates closing risks during corporate restructurings.',
    recommendation: 'Ensure standard corporate acquisitions do not trigger contract termination or fee escalations.',
    saferAlternative: 'A change of control, merger, or reorganization shall not constitute an assignment or breach of this Agreement.'
  },
  {
    id: 'SLA_WEAKNESSES',
    category: 'SLA Weaknesses',
    title: 'Toothless Service Level Agreement with No Termination Remedies',
    severity: 'medium',
    baseWeight: 8,
    affectedParty: 'Customer / Buyer',
    patterns: [
      /sole\s+and\s+exclusive\s+remedy\s+for\s+downtime/i,
      /sla\s+credits?\s+(?:are\s+capped\s+at|limited\s+to)/i,
      /no\s+right\s+to\s+terminate\s+for\s+chronic\s+outages/i,
      /uptime\s+calculated\s+excluding\s+maintenance/i
    ],
    semanticTriggers: ['SLA credit is sole remedy', 'no termination for chronic downtime', 'downtime penalty capped at 5%'],
    whyItMatters: 'Vendor suffers only minor token credits (e.g., $50) for devastating multi-day business outages.',
    legalImpact: 'Precludes damages recovery or contract cancellation even when service is chronically inoperable.',
    recommendation: 'Include a chronic downtime termination right (e.g., uptime <98% in two consecutive months) with full unearned refund.',
    saferAlternative: 'If System Uptime falls below 99.0% in any two (2) calendar months, Customer may terminate immediately for cause and receive a full pro-rata refund.'
  },
  {
    id: 'REGULATORY_COMPLIANCE_RISK',
    category: 'Regulatory Compliance Risk',
    title: 'Disclaimer of Industry Regulatory Standards (SOC2, HIPAA, PCI)',
    severity: 'high',
    baseWeight: 15,
    affectedParty: 'Customer / Enterprise',
    patterns: [
      /customer\s+is\s+solely\s+responsible\s+for\s+compliance/i,
      /provider\s+makes\s+no\s+representation\s+regarding\s+regulatory/i,
      /not\s+intended\s+for\s+hipaa\s+or\s+pci\s+data/i,
      /disclaims\s+compliance\s+with\s+industry\s+standards/i
    ],
    semanticTriggers: ['disclaims HIPAA/SOC2 compliance', 'customer solely responsible for regulations', 'no compliance warranty'],
    whyItMatters: 'Exposes enterprise to severe regulatory fines and enforcement actions if vendor architecture violates compliance rules.',
    legalImpact: 'Shifts full regulatory liability onto the customer despite vendor being the data processor.',
    recommendation: 'Require provider to execute a Business Associate Agreement (BAA) / DPA and maintain verified SOC 2 Type II compliance.',
    saferAlternative: 'Provider warrants that it maintains SOC 2 Type II certification and will execute standard DPA and BAA addenda upon request.'
  },
  {
    id: 'PRIVACY_COMPLIANCE_RISK',
    category: 'Privacy Compliance Risk',
    title: 'Absence of Mandatory Data Processing Addendum (GDPR/CCPA)',
    severity: 'high',
    baseWeight: 15,
    affectedParty: 'Data Controller',
    patterns: [
      /no\s+dpa\s+or\s+data\s+processing\s+terms/i,
      /cross-border\s+data\s+transfers\s+without\s+safeguards/i,
      /sub-processors\s+appointed\s+without\s+notice/i,
      /disclaims\s+gdpr\s+obligations/i
    ],
    semanticTriggers: ['no GDPR DPA', 'cross border data transfer risk', 'unvetted sub processors'],
    whyItMatters: 'Processing personal data without Standard Contractual Clauses (SCCs) or a DPA violates international privacy laws.',
    legalImpact: 'Exposes your company to GDPR fines of up to 4% of annual global turnover.',
    recommendation: 'Incorporate GDPR/CCPA Data Processing Addendum with Standard Contractual Clauses.',
    saferAlternative: 'The Parties agree that the Data Processing Addendum (DPA) and Standard Contractual Clauses (SCCs) are incorporated by reference herein.'
  },
  {
    id: 'HIDDEN_FEES',
    category: 'Hidden Fees',
    title: 'Opaque Overage Charges & Uncapped Ancillary Billing',
    severity: 'medium',
    baseWeight: 8,
    affectedParty: 'Customer / Payor',
    patterns: [
      /overage\s+rates?\s+billed\s+at/i,
      /additional\s+usage\s+billed\s+without\s+cap/i,
      /administrative\s+fees,\s+support\s+surcharges/i,
      /fees\s+subject\s+to\s+retroactive\s+adjustment/i
    ],
    semanticTriggers: ['hidden overage charges', 'support surcharges', 'uncapped usage rate billing'],
    whyItMatters: 'Unexpected monthly overages and ancillary support charges inflate total contract cost far beyond budgeted amounts.',
    legalImpact: 'Authorizes vendor to levy discretionary ancillary charges without prior budget approvals.',
    recommendation: 'Cap all overage rates at standard contracted unit pricing and require automated threshold warning alerts at 80% usage.',
    saferAlternative: 'No overage charges shall apply unless Provider has notified Customer in writing upon reaching 85% of tier thresholds.'
  },
  {
    id: 'VENDOR_LOCKIN',
    category: 'Vendor Lock-In',
    title: 'Proprietary Format Export Barriers & Transition Impediments',
    severity: 'medium',
    baseWeight: 8,
    affectedParty: 'Customer / User',
    patterns: [
      /data\s+export\s+subject\s+to\s+consulting\s+fees/i,
      /proprietary\s+format\s+only/i,
      /no\s+transition\s+assistance\s+provided/i,
      /data\s+retrieval\s+fee\s+applies\s+upon\s+exit/i
    ],
    semanticTriggers: ['exit barrier', 'proprietary format lock in', 'expensive data export fees'],
    whyItMatters: 'Vendor charges exorbitant consulting fees to release your data upon contract termination, making migration impossible.',
    legalImpact: 'Effectively holds organizational data hostage upon contract cancellation.',
    recommendation: 'Mandate standard machine-readable data export (JSON/CSV/SQL) at zero additional charge upon termination.',
    saferAlternative: 'Upon termination, Provider shall provide standard machine-readable export of all Customer Data within 14 days at no extra cost.'
  },
  {
    id: 'AUTOMATIC_PRICE_INCREASES',
    category: 'Automatic Price Increases',
    title: 'Mandatory Uncapped Price Escalations on Renewal',
    severity: 'medium',
    baseWeight: 8,
    affectedParty: 'Customer / Buyer',
    patterns: [
      /(?:5%|10%|15%|20%)\s+(?:automatic\s+)?(?:fee\s+)?increase/i,
      /prices?\s+shall\s+increase\s+upon\s+renewal/i,
      /subject\s+to\s+annual\s+list\s+price\s+escalation/i,
      /fees\s+will\s+adjust\s+at\s+vendor'?s\s+prevailing\s+rates/i
    ],
    semanticTriggers: ['10% auto price hike', 'annual price escalation', 'rates adjust to list price'],
    whyItMatters: 'Automatic compound rate increases (e.g. 10% annually) double software costs over a short multi-year period.',
    legalImpact: 'Commits the enterprise to unpredictable compounding price hikes without renegotiation leverage.',
    recommendation: 'Cap annual price increases strictly to the Consumer Price Index (CPI) or a maximum ceiling of 3%.',
    saferAlternative: 'Any renewal price increase shall not exceed the lesser of three percent (3.0%) or the annual Consumer Price Index (CPI).'
  },
  {
    id: 'UNLIMITED_FINANCIAL_EXPOSURE',
    category: 'Unlimited Financial Exposure',
    title: 'Uncapped Liability & Full Consequential Damage Exposure',
    severity: 'critical',
    baseWeight: 20,
    affectedParty: 'Customer / Indemnifying Party',
    patterns: [
      /unlimited\s+liability/i,
      /without\s+monetary\s+limitation/i,
      /uncapped\s+indemnity/i,
      /shall\s+bear\s+full\s+financial\s+responsibility\s+for\s+all\s+damages/i,
      /no\s+cap\s+shall\s+apply\s+to\s+customer'?s\s+obligations/i
    ],
    semanticTriggers: ['uncapped liability', 'unlimited financial exposure', 'no cap on customer damages'],
    whyItMatters: 'Exposes the entire balance sheet of your company to ruinous claims, legal fees, and third-party liabilities.',
    legalImpact: 'Removes the primary corporate liability shield, creating existential financial risk.',
    recommendation: 'Ensure all contractual obligations and indemnities are subject to a clear aggregate monetary liability ceiling.',
    saferAlternative: 'Notwithstanding anything to the contrary, neither Party\'s total cumulative liability under this Agreement shall exceed the total contract value.'
  }
];

module.exports = {
  ENTERPRISE_RISK_TAXONOMY
};
