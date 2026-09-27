/**
 * Legal Reasoning Engine
 * 
 * Structural Legal Relationship & Contractual Asymmetry Parser
 * 
 * Analyzes clauses through:
 * 1. Subject extraction (Grammatical agent / entity)
 * 2. Deontic modality analysis (Obligation vs. Discretionary Right vs. Prohibition vs. Disclaimer)
 * 3. Transitive action & target extraction (Legal predicate & beneficiary)
 * 4. Beneficiary, Obligated, and Risk-Bearing party resolution
 * 5. Structural Asymmetry scoring
 * 6. Multi-vector exposure profiling (Legal, Financial, Operational, Privacy)
 */

const { v4: uuidv4 } = require('uuid');

// Known legal entity aliases mapped to standardized party roles
const PARTY_ROLES = {
  CUSTOMER_SIDE: ['customer', 'client', 'buyer', 'licensee', 'subscriber', 'user', 'purchaser'],
  VENDOR_SIDE: ['vendor', 'provider', 'supplier', 'licensor', 'company', 'contractor', 'seller', 'consultant'],
  RECEIVING_SIDE: ['receiving party', 'recipient'],
  DISCLOSING_SIDE: ['disclosing party', 'discloser'],
  MUTUAL: ['either party', 'both parties', 'each party', 'the parties', 'neither party']
};

/**
 * 1. Extract Grammatical Subject / Primary Actor
 */
function extractSubject(sentence) {
  const s = sentence.trim();

  // Check mutual first
  for (const p of PARTY_ROLES.MUTUAL) {
    const rx = new RegExp(`\\b${p}\\b`, 'i');
    if (rx.test(s)) return { raw: p, role: 'MUTUAL', normalized: 'Either Party (Mutual)' };
  }

  // Look for subject position before modal auxiliary verbs (shall, may, must, agrees, etc.)
  const modalSubjectMatch = s.match(/^\s*(?:(?:in the event|if|where)\s+[^,]+,\s*)?([a-z0-9\s,\/\(\)]+?)\s+(?:shall\s+not|shall|must\s+not|must|may\s+not|may|agrees?\s+to|will\s+not|will|is\s+required\s+to|reserves?\s+the\s+right\s+to|has\s+the\s+right\s+to|warrants?|disclaims?|hereby\s+assigns?|indemnifies?)\b/i);

  if (modalSubjectMatch && modalSubjectMatch[1]) {
    const candidate = modalSubjectMatch[1].trim().toLowerCase();

    for (const v of PARTY_ROLES.VENDOR_SIDE) {
      if (candidate.includes(v)) return { raw: candidate, role: 'VENDOR', normalized: 'Vendor / Provider' };
    }
    for (const c of PARTY_ROLES.CUSTOMER_SIDE) {
      if (candidate.includes(c)) return { raw: candidate, role: 'CUSTOMER', normalized: 'Customer / Client' };
    }
    if (candidate.includes('receiving party') || candidate.includes('recipient')) {
      return { raw: candidate, role: 'RECEIVING', normalized: 'Receiving Party' };
    }
    if (candidate.includes('disclosing party') || candidate.includes('discloser')) {
      return { raw: candidate, role: 'DISCLOSING', normalized: 'Disclosing Party' };
    }
  }

  // Heuristic fallback for general mention
  for (const c of PARTY_ROLES.CUSTOMER_SIDE) {
    if (new RegExp(`\\b${c}\\b`, 'i').test(s)) return { raw: c, role: 'CUSTOMER', normalized: 'Customer / Client' };
  }
  for (const v of PARTY_ROLES.VENDOR_SIDE) {
    if (new RegExp(`\\b${v}\\b`, 'i').test(s)) return { raw: v, role: 'VENDOR', normalized: 'Vendor / Provider' };
  }

  return { raw: 'parties', role: 'MUTUAL', normalized: 'Mutual / Both Parties' };
}

/**
 * 2. Deontic Modality & Action Intent Extraction
 */
function extractModalAndAction(sentence) {
  const s = sentence.toLowerCase();

  // Deontic force identification
  let modality = 'NEUTRAL'; // OBLIGATION | RIGHT | PROHIBITION | DISCLAIMER | CAP | CONDITIONAL
  if (/shall\s+not|must\s+not|may\s+not|will\s+not|is\s+prohibited\s+from/i.test(s)) {
    modality = 'PROHIBITION';
  } else if (/shall|must|will|is\s+required\s+to|agrees?\s+to|is\s+obligated\s+to|covenants\s+to/i.test(s)) {
    modality = 'OBLIGATION';
  } else if (/may|has\s+the\s+right\s+to|reserves?\s+the\s+right\s+to|at\s+its\s+(?:sole\s+)?(?:discretion|option)|is\s+entitled\s+to/i.test(s)) {
    modality = 'RIGHT';
  } else if (/in\s+no\s+event\s+shall|disclaims?|as\s+is|without\s+warranty|waives?/i.test(s)) {
    modality = 'DISCLAIMER';
  }

  // Action / Legal predicate identification
  let legalAction = 'GENERAL_COVENANT';
  if (/indemnif|hold\s+harmless|defend\s+against/i.test(s)) {
    legalAction = 'INDEMNIFY';
  } else if (/terminat|cancel|expire/i.test(s)) {
    legalAction = 'TERMINATE';
  } else if (/limit(?:ation)?\s+(?:of\s+)?liabilit|aggregate\s+liability|damages\s+cap|maximum\s+liability/i.test(s)) {
    legalAction = 'LIMIT_LIABILITY';
  } else if (/auto(?:matic(?:ally)?)?\s*renew|evergreen|successive\s+terms/i.test(s)) {
    legalAction = 'AUTO_RENEW';
  } else if (/assign(?:s|ment)?|work\s+made\s+for\s+hire|intellectual\s+property|proprietary\s+rights|ownership\s+of\s+deliverables/i.test(s)) {
    legalAction = 'ASSIGN_IP';
  } else if (/confidential|trade\s+secret|non-disclosure/i.test(s)) {
    legalAction = 'CONFIDENTIALITY';
  } else if (/pay|invoice|fee|price\s+increase|escalat/i.test(s)) {
    legalAction = 'PAYMENT';
  } else if (/audit|inspect|books\s+and\s+records/i.test(s)) {
    legalAction = 'AUDIT';
  } else if (/non-compete|non-solicit|restrictive\s+covenant/i.test(s)) {
    legalAction = 'RESTRICT_COMPETITION';
  } else if (/data\s+protection|gdpr|ccpa|security\s+breach|personal\s+data/i.test(s)) {
    legalAction = 'DATA_PROTECTION';
  }

  // Conditionality / Balance Modifiers
  const isUnilateral = /at\s+any\s+time|without\s+cause|in\s+its\s+sole\s+discretion|unilaterally|without\s+liability|sole\s+option/i.test(s);
  const hasNoticeOrCure = /\b\d+\s*days(?:\s+prior|\s+advance)?\s+notice|\bcure\s+period|\bmaterial\s+breach/i.test(s);

  return {
    modality,
    legalAction,
    isUnilateral,
    hasNoticeOrCure
  };
}

/**
 * 3. Beneficiary & Target Resolution
 */
function extractTargetAndBeneficiary(sentence, subject, modalAction) {
  const s = sentence.toLowerCase();
  const { legalAction, modality, isUnilateral } = modalAction;

  // Case A: Indemnification Relationship
  if (legalAction === 'INDEMNIFY') {
    // Check direct grammatical target of indemnification: "indemnify [Target]"
    const targetMatch = s.match(/(?:indemnify|defend|hold\s+harmless)\s+([a-z0-9\s,\/\(\)]+?)(?:\s+from|\s+against|\s+and\s+its|\s+with\s+respect|$)/i);
    const targetText = targetMatch ? targetMatch[1].trim() : '';

    let beneficiaryRole = 'OTHER';
    if (PARTY_ROLES.VENDOR_SIDE.some(v => targetText.includes(v))) {
      beneficiaryRole = 'VENDOR';
    } else if (PARTY_ROLES.CUSTOMER_SIDE.some(c => targetText.includes(c))) {
      beneficiaryRole = 'CUSTOMER';
    } else {
      // Invert subject if target text is implicit
      beneficiaryRole = subject.role === 'CUSTOMER' ? 'VENDOR' : (subject.role === 'VENDOR' ? 'CUSTOMER' : 'MUTUAL');
    }

    const beneficiary = beneficiaryRole === 'VENDOR' ? 'Vendor / Provider' : (beneficiaryRole === 'CUSTOMER' ? 'Customer / Client' : 'Mutual / Both Parties');
    const obligatedParty = subject.normalized;
    const riskBearingParty = subject.role === 'MUTUAL' ? 'Shared / Neutral' : subject.normalized;

    return { beneficiary, obligatedParty, riskBearingParty, beneficiaryRole };
  }

  // Case B: Termination Rights
  if (legalAction === 'TERMINATE') {
    if (subject.role === 'MUTUAL') {
      return {
        beneficiary: 'Mutual / Both Parties',
        obligatedParty: 'Both Parties',
        riskBearingParty: 'Shared / Neutral',
        beneficiaryRole: 'MUTUAL'
      };
    }

    if (modality === 'RIGHT') {
      const beneficiary = subject.normalized;
      const counterRole = subject.role === 'VENDOR' ? 'CUSTOMER' : 'VENDOR';
      const riskBearingParty = counterRole === 'CUSTOMER' ? 'Customer / Client' : 'Vendor / Provider';
      return { beneficiary, obligatedParty: riskBearingParty, riskBearingParty, beneficiaryRole: subject.role };
    }
  }

  // Case C: Limitation of Liability
  if (legalAction === 'LIMIT_LIABILITY') {
    if (subject.role === 'VENDOR' || s.includes('provider shall not be liable') || s.includes('vendor shall not be liable')) {
      return {
        beneficiary: 'Vendor / Provider',
        obligatedParty: 'Customer / Client',
        riskBearingParty: 'Customer / Client',
        beneficiaryRole: 'VENDOR'
      };
    }
    if (subject.role === 'MUTUAL' || s.includes('neither party')) {
      return {
        beneficiary: 'Mutual / Both Parties',
        obligatedParty: 'Both Parties',
        riskBearingParty: 'Claiming Party',
        beneficiaryRole: 'MUTUAL'
      };
    }
  }

  // Case D: General Obligations (Default resolution)
  if (modality === 'OBLIGATION' || modality === 'PROHIBITION') {
    const counterRole = subject.role === 'CUSTOMER' ? 'VENDOR' : (subject.role === 'VENDOR' ? 'CUSTOMER' : 'MUTUAL');
    const beneficiary = counterRole === 'VENDOR' ? 'Vendor / Provider' : (counterRole === 'CUSTOMER' ? 'Customer / Client' : 'Mutual / Both Parties');
    return {
      beneficiary,
      obligatedParty: subject.normalized,
      riskBearingParty: subject.role === 'MUTUAL' ? 'Shared / Neutral' : subject.normalized,
      beneficiaryRole: counterRole
    };
  }

  if (modality === 'RIGHT') {
    const counterRole = subject.role === 'CUSTOMER' ? 'VENDOR' : (subject.role === 'VENDOR' ? 'CUSTOMER' : 'MUTUAL');
    const riskBearingParty = counterRole === 'CUSTOMER' ? 'Customer / Client' : (counterRole === 'VENDOR' ? 'Vendor / Provider' : 'Shared / Neutral');
    return {
      beneficiary: subject.normalized,
      obligatedParty: riskBearingParty,
      riskBearingParty,
      beneficiaryRole: subject.role
    };
  }

  return {
    beneficiary: 'Mutual / Both Parties',
    obligatedParty: 'Both Parties',
    riskBearingParty: 'Shared / Neutral',
    beneficiaryRole: 'MUTUAL'
  };
}

/**
 * 4. Structural Asymmetry & Exposure Profile Calculation
 */
function computeStructuralAsymmetryAndExposure(subject, modalAction, targetData) {
  const { legalAction, modality, isUnilateral, hasNoticeOrCure } = modalAction;
  const { beneficiaryRole } = targetData;

  let asymmetryScore = 0.20; // 0.00 (Balanced) to 1.00 (Severe Imbalance)
  let clauseType = 'Operational & Commercial Terms';
  let exposureProfile = { legal: 20, financial: 20, operational: 25, privacy: 15 };
  let reasoningDetails = [];

  switch (legalAction) {
    case 'INDEMNIFY':
      clauseType = 'Indemnification & Third-Party Claims Allocation';
      if (subject.role === 'CUSTOMER' && beneficiaryRole === 'VENDOR') {
        asymmetryScore = 0.88;
        exposureProfile = { legal: 95, financial: 92, operational: 45, privacy: 35 };
        reasoningDetails.push('Customer assumes unilateral third-party defense and indemnification burdens, shielding Vendor from downstream financial and legal liabilities without reciprocal indemnity.');
      } else if (subject.role === 'VENDOR' && beneficiaryRole === 'CUSTOMER') {
        asymmetryScore = 0.18;
        exposureProfile = { legal: 25, financial: 30, operational: 20, privacy: 25 };
        reasoningDetails.push('Vendor provides affirmative indemnification to Customer against infringement or breach claims, allocating primary liability to the service provider.');
      } else {
        asymmetryScore = 0.35;
        exposureProfile = { legal: 60, financial: 55, operational: 30, privacy: 30 };
        reasoningDetails.push('Bilateral indemnification obligations allocating third-party liabilities mutually based on respective breach or negligence.');
      }
      break;

    case 'TERMINATE':
      clauseType = 'Termination Rights & Cancellation Lifecycle';
      if (isUnilateral && subject.role === 'VENDOR') {
        asymmetryScore = 0.85;
        exposureProfile = { legal: 80, financial: 70, operational: 90, privacy: 15 };
        reasoningDetails.push('Vendor holds unilateral, at-will termination privileges without mandatory notice, posing severe operational continuity and switching risks for Customer.');
      } else if (subject.role === 'MUTUAL' && hasNoticeOrCure) {
        asymmetryScore = 0.12;
        exposureProfile = { legal: 30, financial: 35, operational: 40, privacy: 10 };
        reasoningDetails.push('Bilateral convenience termination governed by balanced advance written notice periods, preserving mutual procedural fairness.');
      } else if (isUnilateral) {
        asymmetryScore = 0.75;
        exposureProfile = { legal: 70, financial: 60, operational: 80, privacy: 15 };
        reasoningDetails.push('Unilateral cancellation right lacking reciprocal termination rights or adequate transition periods.');
      } else {
        asymmetryScore = 0.30;
        exposureProfile = { legal: 45, financial: 40, operational: 50, privacy: 10 };
        reasoningDetails.push('Standard termination framework conditioned on breach or defined lifecycle events.');
      }
      break;

    case 'LIMIT_LIABILITY':
      clauseType = 'Limitation of Liability & Damages Exclusion';
      if (beneficiaryRole === 'VENDOR') {
        asymmetryScore = 0.82;
        exposureProfile = { legal: 85, financial: 95, operational: 50, privacy: 60 };
        reasoningDetails.push('Vendor damages are strictly capped while consequential and indirect damages are waived, shifting catastrophic failure risks to Customer.');
      } else {
        asymmetryScore = 0.40;
        exposureProfile = { legal: 65, financial: 70, operational: 35, privacy: 35 };
        reasoningDetails.push('Mutual damages limitation capping aggregate liability equally across both contracting parties.');
      }
      break;

    case 'AUTO_RENEW':
      clauseType = 'Term & Automatic Evergreen Renewal';
      asymmetryScore = 0.72;
      exposureProfile = { legal: 45, financial: 80, operational: 60, privacy: 10 };
      reasoningDetails.push('Mandatory automatic renewal mechanism imposing ongoing recurring financial obligations unless timely cancellation is served.');
      break;

    case 'ASSIGN_IP':
      clauseType = 'Intellectual Property Ownership & Assignment';
      if (subject.role === 'CUSTOMER') {
        asymmetryScore = 0.80;
        exposureProfile = { legal: 88, financial: 75, operational: 70, privacy: 25 };
        reasoningDetails.push('Comprehensive transfer or assignment of work product and intellectual property rights from Customer to Vendor.');
      } else {
        asymmetryScore = 0.35;
        exposureProfile = { legal: 55, financial: 45, operational: 40, privacy: 20 };
        reasoningDetails.push('Preservation of background IP with defined, non-exclusive license rights.');
      }
      break;

    case 'DATA_PROTECTION':
      clauseType = 'Data Protection, Security & Breach Covenants';
      asymmetryScore = 0.45;
      exposureProfile = { legal: 80, financial: 70, operational: 65, privacy: 95 };
      reasoningDetails.push('Regulated data privacy standards governing breach notifications, technical safeguards, and statutory compliance (GDPR/CCPA).');
      break;

    case 'CONFIDENTIALITY':
      clauseType = 'Confidentiality & Non-Disclosure';
      if (subject.role === 'MUTUAL') {
        asymmetryScore = 0.18;
        exposureProfile = { legal: 40, financial: 30, operational: 25, privacy: 50 };
        reasoningDetails.push('Bilateral non-disclosure covenants protecting proprietary trade secrets equally for both parties.');
      } else {
        asymmetryScore = 0.65;
        exposureProfile = { legal: 65, financial: 45, operational: 40, privacy: 65 };
        reasoningDetails.push('Unilateral non-disclosure obligations binding the receiving party without reciprocal disclosure safeguards.');
      }
      break;

    case 'RESTRICT_COMPETITION':
      clauseType = 'Restrictive Covenants & Non-Compete';
      asymmetryScore = 0.85;
      exposureProfile = { legal: 85, financial: 65, operational: 90, privacy: 15 };
      reasoningDetails.push('Restrains commercial business activities and counterparty hiring, introducing severe market operational restraints.');
      break;

    case 'PAYMENT':
      clauseType = 'Payment Terms, Invoicing & Escalation';
      asymmetryScore = isUnilateral ? 0.70 : 0.35;
      exposureProfile = { legal: 35, financial: 85, operational: 45, privacy: 10 };
      reasoningDetails.push('Establishes billing schedules, late fee penalties, and contractual payment enforcement mechanisms.');
      break;

    default:
      clauseType = 'General Commercial Provisions';
      asymmetryScore = 0.20;
      exposureProfile = { legal: 20, financial: 20, operational: 25, privacy: 10 };
      reasoningDetails.push('Standard procedural and operational terms establishing contractual baseline conditions.');
      break;
  }

  // Adjust asymmetry based on extreme unilateral discretionary indicators
  if (isUnilateral && asymmetryScore < 0.75) {
    asymmetryScore = Math.min(0.95, asymmetryScore + 0.20);
  }

  return {
    clauseType,
    asymmetryScore: Number(asymmetryScore.toFixed(2)),
    exposureProfile,
    reasoningText: reasoningDetails.join(' ')
  };
}

/**
 * Primary Analysis Function
 * Evaluates clause structure, relationship vectors, and asymmetry.
 * 
 * @param {Object|string} clause - Clause object or raw string
 * @returns {Object} Structured legal reasoning output
 */
function analyzeClauseMeaning(clause) {
  let clauseId = 'cls_' + (uuidv4 ? uuidv4().substring(0, 8) : Math.random().toString(36).substring(2, 10));
  let clauseText = '';
  let section = 'General';
  let title = 'Commercial Covenant';

  if (typeof clause === 'string') {
    clauseText = clause.trim();
  } else if (clause && typeof clause === 'object') {
    clauseId = clause.id || clause.clauseId || clause._id || clauseId;
    clauseText = clause.fullText || clause.text || clause.bodyText || clause.clauseText || '';
    section = clause.section || section;
    title = clause.title || clause.name || title;
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
      exposureProfile: { legal: 0, financial: 0, operational: 0, privacy: 0 },
      reasoning: 'No operative legal language detected in the provided clause.',
      confidence: 0.50,
      // Frontend backwards compatibility:
      id: clauseId,
      section,
      title,
      name: title,
      summary: 'No operative legal language detected.',
      fullClauseText: '',
      legalMeaning: 'No operative legal language detected.',
      riskSeverity: 'Low'
    };
  }

  // Step 1: Subject extraction
  const subject = extractSubject(clauseText);

  // Step 2: Modal & Action extraction
  const modalAction = extractModalAndAction(clauseText);

  // Step 3: Beneficiary & Target detection
  const targetData = extractTargetAndBeneficiary(clauseText, subject, modalAction);

  // Step 4: Asymmetry & Multi-Vector Exposure calculation
  const { clauseType, asymmetryScore, exposureProfile, reasoningText } = computeStructuralAsymmetryAndExposure(
    subject,
    modalAction,
    targetData
  );

  // Synthesize complete structural legal reasoning
  const relationshipSummary = `[Structural Analysis] Subject: ${subject.normalized} | Deontic Force: ${modalAction.modality} | Action: ${modalAction.legalAction} | Target Beneficiary: ${targetData.beneficiary}.`;
  const fullReasoning = `${relationshipSummary} ${reasoningText}`;

  // Confidence metric based on grammatical parse resolution
  let confidence = 0.82;
  if (subject.role !== 'MUTUAL') confidence += 0.08;
  if (modalAction.modality !== 'NEUTRAL') confidence += 0.05;
  if (modalAction.legalAction !== 'GENERAL_COVENANT') confidence += 0.04;
  confidence = Math.min(0.99, Number(confidence.toFixed(2)));

  // Risk severity rating derived from asymmetry and exposure
  let riskSeverity = 'Low';
  if (asymmetryScore >= 0.70 || exposureProfile.legal >= 80 || exposureProfile.financial >= 80) {
    riskSeverity = 'High';
  } else if (asymmetryScore >= 0.40 || exposureProfile.legal >= 50 || exposureProfile.financial >= 50) {
    riskSeverity = 'Medium';
  }

  return {
    clauseId,
    clauseText,
    clauseType,
    beneficiary: targetData.beneficiary,
    obligatedParty: targetData.obligatedParty,
    riskBearingParty: targetData.riskBearingParty,
    asymmetryScore,
    exposureProfile,
    reasoning: fullReasoning,
    confidence,
    // Frontend compatibility properties:
    id: clauseId,
    section,
    title,
    name: title,
    category: clauseType,
    fullClauseText: clauseText,
    legalMeaning: reasoningText,
    summary: reasoningText,
    riskSeverity,
    impact: riskSeverity === 'High' ? 'High Burden' : riskSeverity === 'Medium' ? 'Moderate Obligation' : 'Standard'
  };
}

/**
 * Batch analysis of extracted clauses
 * 
 * @param {Array<Object|string>} clauses
 * @returns {Array<Object>}
 */
function analyzeContractClauses(clauses = []) {
  if (!Array.isArray(clauses)) return [];
  return clauses.map(c => analyzeClauseMeaning(c));
}

module.exports = {
  analyzeClauseMeaning,
  analyzeContractClauses,
  extractSubject,
  extractModalAndAction,
  extractTargetAndBeneficiary
};
