/**
 * Legal Reasoning Engine
 * Deep Legal Semantic Intelligence & Asymmetry Analyzer
 *
 * Evaluates individual clauses for:
 * - Clause classification
 * - Obligated vs. Beneficiary vs. Risk-Bearing party dynamics
 * - Contractual asymmetry scoring
 * - Multi-vector exposure profiling (Legal, Financial, Operational, Privacy)
 * - Deep legal reasoning and confidence metrics
 */

const { v4: uuidv4 } = require('uuid');

/**
 * Analyzes the semantic, legal, and risk profile of a contract clause.
 * 
 * @param {Object|string} clause - Clause object or raw clause text string
 * @returns {Object} Legal reasoning and exposure analysis
 */
function analyzeClauseMeaning(clause) {
  // 1. Normalize clause input
  let clauseId = 'cls_' + (uuidv4 ? uuidv4().substring(0, 8) : Math.random().toString(36).substring(2, 10));
  let clauseText = '';

  if (typeof clause === 'string') {
    clauseText = clause.trim();
  } else if (clause && typeof clause === 'object') {
    clauseId = clause.id || clause.clauseId || clause._id || clauseId;
    clauseText = clause.fullText || clause.text || clause.bodyText || clause.clauseText || '';
  }

  if (!clauseText) {
    return {
      clauseId,
      clauseText: '',
      clauseType: 'General Provisions',
      beneficiary: 'Mutual / Both Parties',
      obligatedParty: 'Both Parties',
      riskBearingParty: 'Shared / Neutral',
      asymmetryScore: 0.0,
      exposureProfile: {
        legal: 10,
        financial: 10,
        operational: 10,
        privacy: 5
      },
      reasoning: 'No operative legal language detected in the provided clause.',
      confidence: 0.5
    };
  }

  const lower = clauseText.toLowerCase();

  // 2. Identify Clause Type & Core Classification
  let clauseType = 'Operational & Commercial Terms';
  let beneficiary = 'Mutual / Both Parties';
  let obligatedParty = 'Both Parties';
  let riskBearingParty = 'Shared / Neutral';
  let asymmetryScore = 0.15; // 0.0 (perfectly mutual) to 1.0 (extremely one-sided)
  
  let exposureProfile = {
    legal: 20,
    financial: 20,
    operational: 25,
    privacy: 10
  };

  let reasoning = '';
  let confidence = 0.88;

  // Pattern tests
  const isIndemnity = /indemnif|hold harmless|defend\s+against|indemnity/i.test(lower);
  const isLimitationLiability = /limitation of liability|aggregate liability|consequential damages|indirect damages|in no event shall.*liable|cap on liability|maximum liability/i.test(lower);
  const isTermination = /terminat(ion|e)|cancel(lation)?|for convenience|immediate termination|cure period|material breach/i.test(lower);
  const isAutoRenewal = /auto(matic(ally)?)?\s*renew(al)?|evergreen|successive.*terms|prior written notice.*renew/i.test(lower);
  const isIPOwnership = /intellectual property|work made for hire|assignment of inventions|all right, title and interest|proprietary rights|ownership of deliverables/i.test(lower);
  const isConfidentiality = /confidential(ity)?|non-disclosure|proprietary information|trade secret/i.test(lower);
  const isDataPrivacy = /gdpr|ccpa|personal data|data protection|security breach|pii|subprocessor|data security/i.test(lower);
  const isNonCompete = /non-compete|covenant not to compete|restrictive covenant|restraint of trade/i.test(lower);
  const isNonSolicit = /non-solicit|solicit.*employees|solicit.*customers|poaching/i.test(lower);
  const isPayment = /payment terms|late payment|interest rate|net \d+|invoic(e|ing)|price escalation|fee adjustment/i.test(lower);
  const isAudit = /audit rights|books and records|inspect.*premises|access to logs|accounting records/i.test(lower);
  const isWarranty = /as is|without warranty|disclaims all warranties|merchantability|fitness for a particular purpose|express or implied/i.test(lower);
  const isDispute = /governing law|jurisdiction|arbitration|exclusive venue|waiver of jury trial|class action waiver/i.test(lower);
  const isForceMajeure = /force majeure|acts of god|war, terrorism|unforeseeable circumstances|beyond reasonable control/i.test(lower);
  const isExclusivity = /exclusiv(e|ity)|sole and exclusive|most favored nation|mfn/i.test(lower);

  // Unilateral vs Mutual Indicators
  const isUnilateral = /sole discretion|unilateral(ly)?|at any time without|without liability|at its option|reserves the right/i.test(lower);
  const isCustomerNamed = /customer|client|buyer|licensee|user/i.test(lower);
  const isProviderNamed = /vendor|provider|licensor|supplier|company/i.test(lower);

  // --- Classification & Semantic Reasoning Rules ---

  if (isIndemnity) {
    clauseType = 'Indemnification & Defense of Claims';
    const isUnilateralIndemnity = /customer shall indemnify|client shall defend|user agrees to indemnify|licensee shall hold harmless/i.test(lower) && !/vendor shall indemnify|provider shall indemnify/i.test(lower);

    if (isUnilateralIndemnity) {
      beneficiary = 'Service Provider / Licensor';
      obligatedParty = 'Customer / Licensee';
      riskBearingParty = 'Customer / Licensee';
      asymmetryScore = 0.90;
      exposureProfile = { legal: 95, financial: 90, operational: 45, privacy: 35 };
      reasoning = 'Creates unilateral third-party indemnification, requiring the customer to bear unbounded legal defense fees, settlements, and damage awards without reciprocal protection.';
      confidence = 0.96;
    } else {
      beneficiary = 'Mutual / Both Parties';
      obligatedParty = 'Breaching / Indemnifying Party';
      riskBearingParty = 'At-Fault Party';
      asymmetryScore = 0.35;
      exposureProfile = { legal: 75, financial: 70, operational: 30, privacy: 25 };
      reasoning = 'Standard mutual indemnification covenant allocating third-party infringement and gross negligence liabilities to the responsible party.';
      confidence = 0.92;
    }
  } else if (isLimitationLiability) {
    clauseType = 'Limitation of Liability & Consequential Damages Waiver';
    const isOneSidedCap = /in no event shall (provider|vendor|company|licensor) be liable/i.test(lower) && !/neither party/i.test(lower);
    const hasNominalCap = /fees paid (in|during) the (preceding|prior|last) \d+ months|total fees paid under this agreement|\$100|amount actually paid/i.test(lower);

    if (isOneSidedCap || hasNominalCap) {
      beneficiary = 'Service Provider / Licensor';
      obligatedParty = 'Aggrieved Party / Customer';
      riskBearingParty = 'Customer / Licensee';
      asymmetryScore = 0.85;
      exposureProfile = { legal: 88, financial: 95, operational: 50, privacy: 60 };
      reasoning = 'Caps recoverable damages to nominal past fees while waiving consequential, indirect, and lost profit damages, effectively shielding the vendor from meaningful default liability.';
      confidence = 0.95;
    } else {
      beneficiary = 'Mutual / Both Parties';
      obligatedParty = 'Both Parties';
      riskBearingParty = 'Claiming Party';
      asymmetryScore = 0.40;
      exposureProfile = { legal: 70, financial: 80, operational: 40, privacy: 40 };
      reasoning = 'Bilateral liability limitation capping monetary exposure and disclaiming consequential damages equally for both contracting entities.';
      confidence = 0.91;
    }
  } else if (isAutoRenewal) {
    clauseType = 'Term & Automatic Evergreen Renewal';
    beneficiary = 'Service Provider / Licensor';
    obligatedParty = 'Customer / Licensee';
    riskBearingParty = 'Customer / Licensee';
    asymmetryScore = 0.75;
    exposureProfile = { legal: 50, financial: 85, operational: 65, privacy: 15 };
    reasoning = 'Imposes automatic contractual rollover unless affirmative written cancellation is served within a strict advance window, creating recurring lock-in risk.';
    confidence = 0.94;
  } else if (isTermination) {
    clauseType = 'Termination Rights & Default Remedies';
    if (isUnilateral) {
      beneficiary = 'Terminating / Drafting Party';
      obligatedParty = 'Counterparty';
      riskBearingParty = 'Counterparty';
      asymmetryScore = 0.80;
      exposureProfile = { legal: 80, financial: 65, operational: 85, privacy: 20 };
      reasoning = 'Grants discretionary or unilateral termination privileges to one party without affording equal convenience rights or adequate cure periods to the other.';
      confidence = 0.93;
    } else {
      beneficiary = 'Mutual / Both Parties';
      obligatedParty = 'Both Parties';
      riskBearingParty = 'Breaching Party';
      asymmetryScore = 0.25;
      exposureProfile = { legal: 50, financial: 45, operational: 60, privacy: 20 };
      reasoning = 'Standard mutual termination framework permitting cancellation for uncured material breach, insolvency, or defined commercial triggers.';
      confidence = 0.90;
    }
  } else if (isIPOwnership) {
    clauseType = 'Intellectual Property Ownership & Assignment';
    const isBroadAssignment = /assigns? all right, title|work made for hire|exclusive property of vendor|exclusive property of company/i.test(lower);
    if (isBroadAssignment) {
      beneficiary = 'Licensor / Assignee';
      obligatedParty = 'Assignor / Creator';
      riskBearingParty = 'Assignor / Creator';
      asymmetryScore = 0.78;
      exposureProfile = { legal: 90, financial: 70, operational: 75, privacy: 30 };
      reasoning = 'Transfers proprietary developments, modifications, or derivatives exclusively to one entity, potentially extinguishing residual pre-existing rights.';
      confidence = 0.94;
    } else {
      beneficiary = 'Respective Rights Holders';
      obligatedParty = 'Both Parties';
      riskBearingParty = 'Licensee';
      asymmetryScore = 0.30;
      exposureProfile = { legal: 60, financial: 50, operational: 40, privacy: 20 };
      reasoning = 'Preserves background intellectual property while granting defined, non-exclusive operational usage licenses.';
      confidence = 0.89;
    }
  } else if (isDataPrivacy) {
    clauseType = 'Data Privacy, Security & Breach Notification';
    beneficiary = 'Data Subject / Customer';
    obligatedParty = 'Data Processor / Vendor';
    riskBearingParty = 'Data Processor / Vendor';
    asymmetryScore = 0.45;
    exposureProfile = { legal: 85, financial: 75, operational: 70, privacy: 95 };
    reasoning = 'Mandates technical and organizational safeguards, regulatory compliance (GDPR/CCPA), and strict incident reporting timelines for security breaches.';
    confidence = 0.95;
  } else if (isConfidentiality) {
    clauseType = 'Confidentiality & Non-Disclosure';
    const isUnilateralConf = /recipient shall keep confidential/i.test(lower) && !/each party/i.test(lower);
    if (isUnilateralConf) {
      beneficiary = 'Disclosing Party';
      obligatedParty = 'Receiving Party';
      riskBearingParty = 'Receiving Party';
      asymmetryScore = 0.70;
      exposureProfile = { legal: 70, financial: 50, operational: 45, privacy: 60 };
      reasoning = 'Imposes one-way secrecy covenants with injunctive relief remedies upon the receiving party without reciprocal disclosure protections.';
      confidence = 0.91;
    } else {
      beneficiary = 'Mutual / Both Parties';
      obligatedParty = 'Both Parties';
      riskBearingParty = 'Receiving Party';
      asymmetryScore = 0.20;
      exposureProfile = { legal: 45, financial: 35, operational: 30, privacy: 45 };
      reasoning = 'Bilateral non-disclosure obligations protecting proprietary trade secrets with standard carve-outs for public domain or subpoenaed information.';
      confidence = 0.93;
    }
  } else if (isNonCompete || isNonSolicit) {
    clauseType = isNonCompete ? 'Non-Competition Restrictive Covenant' : 'Non-Solicitation Covenant';
    beneficiary = 'Protected Business / Employer';
    obligatedParty = 'Restricted Party';
    riskBearingParty = 'Restricted Party';
    asymmetryScore = 0.82;
    exposureProfile = { legal: 85, financial: 65, operational: 90, privacy: 15 };
    reasoning = 'Restrains competitive operations, talent recruitment, or counterparty hiring, potentially triggering enforceability challenges under regional restraint-of-trade doctrines.';
    confidence = 0.93;
  } else if (isPayment) {
    clauseType = 'Payment Terms, Pricing & Escalation';
    beneficiary = 'Payee / Service Provider';
    obligatedParty = 'Payer / Customer';
    riskBearingParty = 'Payer / Customer';
    asymmetryScore = isUnilateral ? 0.75 : 0.40;
    exposureProfile = { legal: 40, financial: 85, operational: 50, privacy: 10 };
    reasoning = 'Governs billing cycles, late payment interest fees, invoicing disputes, and discretionary price increase mechanisms.';
    confidence = 0.90;
  } else if (isWarranty) {
    clauseType = 'Warranties & Disclaimer of Guarantees';
    beneficiary = 'Provider / Seller';
    obligatedParty = 'Buyer / Customer';
    riskBearingParty = 'Buyer / Customer';
    asymmetryScore = 0.75;
    exposureProfile = { legal: 80, financial: 70, operational: 65, privacy: 10 };
    reasoning = 'Disclaims express and implied statutory warranties of merchantability and fitness, shifting operational performance risks entirely to the recipient.';
    confidence = 0.92;
  } else if (isAudit) {
    clauseType = 'Audit & Inspection Rights';
    beneficiary = 'Auditing Party';
    obligatedParty = 'Audited Party';
    riskBearingParty = 'Audited Party';
    asymmetryScore = 0.65;
    exposureProfile = { legal: 60, financial: 55, operational: 80, privacy: 50 };
    reasoning = 'Authorizes inspections of operational infrastructure, accounting ledgers, and systems, creating compliance overhead and potential operational disruption.';
    confidence = 0.89;
  } else if (isDispute) {
    clauseType = 'Governing Law, Jurisdiction & Dispute Resolution';
    beneficiary = 'Drafting Party / Local Entity';
    obligatedParty = 'Both Parties';
    riskBearingParty = 'Foreign / Out-of-State Party';
    asymmetryScore = 0.50;
    exposureProfile = { legal: 75, financial: 60, operational: 35, privacy: 10 };
    reasoning = 'Establishes forum selection, choice of applicable law, mandatory arbitration forums, or jury waivers impacting legal defense convenience and cost.';
    confidence = 0.94;
  } else if (isForceMajeure) {
    clauseType = 'Force Majeure & Excused Performance';
    beneficiary = 'Impacted / Non-Performing Party';
    obligatedParty = 'Both Parties';
    riskBearingParty = 'Dependent Party';
    asymmetryScore = 0.30;
    exposureProfile = { legal: 45, financial: 50, operational: 75, privacy: 10 };
    reasoning = 'Suspends contractual obligations during extraordinary external catastrophes without constituting a compensable breach of contract.';
    confidence = 0.90;
  } else if (isExclusivity) {
    clauseType = 'Exclusivity & Restrictive Covenants';
    beneficiary = 'Beneficiary Entity';
    obligatedParty = 'Restricted Entity';
    riskBearingParty = 'Restricted Entity';
    asymmetryScore = 0.85;
    exposureProfile = { legal: 75, financial: 85, operational: 90, privacy: 15 };
    reasoning = 'Precludes engagement with alternative market competitors, creating severe operational dependencies and commercial opportunity costs.';
    confidence = 0.92;
  } else {
    // Default fallback analysis for standard commercial provisions
    clauseType = 'General Commercial Provisions';
    beneficiary = 'Mutual / Both Parties';
    obligatedParty = 'Both Parties';
    riskBearingParty = 'Shared / Neutral';
    asymmetryScore = 0.20;
    exposureProfile = { legal: 25, financial: 25, operational: 30, privacy: 15 };
    reasoning = 'Standard administrative or boiler-plate contractual covenant establishing baseline operational rules and definitions.';
    confidence = 0.85;
  }

  // 3. Fine-tune asymmetry and exposure if severe one-sided phrasing exists
  if (/sole and absolute discretion|waives all claims|irrevocable waiver|unconditional defense/i.test(lower)) {
    asymmetryScore = Math.min(1.0, asymmetryScore + 0.15);
    exposureProfile.legal = Math.min(100, exposureProfile.legal + 10);
    exposureProfile.financial = Math.min(100, exposureProfile.financial + 10);
  }

  return {
    clauseId,
    clauseText,
    clauseType,
    beneficiary,
    obligatedParty,
    riskBearingParty,
    asymmetryScore: Number(asymmetryScore.toFixed(2)),
    exposureProfile: {
      legal: Math.round(exposureProfile.legal),
      financial: Math.round(exposureProfile.financial),
      operational: Math.round(exposureProfile.operational),
      privacy: Math.round(exposureProfile.privacy)
    },
    reasoning,
    confidence: Number(confidence.toFixed(2))
  };
}

/**
 * Analyzes a collection of contract clauses in batch.
 *
 * @param {Array<Object|string>} clauses
 * @returns {Array<Object>} Array of clause reasoning analyses
 */
function analyzeContractClauses(clauses = []) {
  if (!Array.isArray(clauses)) return [];
  return clauses.map(c => analyzeClauseMeaning(c));
}

module.exports = {
  analyzeClauseMeaning,
  analyzeContractClauses
};
