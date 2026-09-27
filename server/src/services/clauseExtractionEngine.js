const { v4: uuidv4 } = require('uuid');
const { RISK_CATEGORIES } = require('./riskCategories');

/**
 * Extracts sections, numbered clauses, and headers from contract text
 */
const segmentDocumentIntoClauses = (text) => {
  if (!text || typeof text !== 'string') return [];

  // Normalize line endings
  const cleanText = text.replace(/\r\n/g, '\n');
  
  // Split on numbered sections, Roman numerals, or double-newlines before capitalized headings
  const sectionSplitter = /(?=(?:\n\s*(?:(?:Section|Article|Clause|\d+\.|\([a-z0-9]\)|[I|V|X]+\.)\s+[^\n]+)))/i;
  let rawChunks = cleanText.split(sectionSplitter).filter(c => c && c.trim().length > 25);

  if (rawChunks.length <= 1) {
    // Fallback split on double paragraphs
    rawChunks = cleanText.split(/\n\s*\n/).filter(c => c && c.trim().length > 30);
  }

  return rawChunks.map((chunk, index) => {
    const lines = chunk.trim().split('\n');
    const firstLine = lines[0].trim();
    const remainingText = lines.slice(1).join('\n').trim() || firstLine;

    // Detect section header or generate descriptive name
    let sectionNumber = `Section ${index + 1}`;
    let clauseTitle = 'General Terms & Conditions';

    const headerMatch = firstLine.match(/^(?:Section|Article|Clause|\d+\.|\([a-z0-9]\)|[I|V|X]+\.)\s*([^\n:\.]+)?/i);
    if (headerMatch) {
      sectionNumber = firstLine.split(/[:\.\-]/)[0].trim();
      clauseTitle = headerMatch[1]?.trim() || firstLine.substring(0, 50).trim();
    } else if (firstLine.length < 70 && !firstLine.endsWith('.')) {
      clauseTitle = firstLine;
    }

    return {
      id: 'cls_' + uuidv4().substring(0, 6),
      section: sectionNumber,
      name: clauseTitle,
      fullText: chunk.trim(),
      bodyText: remainingText
    };
  });
};

/**
 * Semantic Clause Classification & Meaning Synthesizer
 */
const classifyClauseMeaning = (clause, parties = ['Provider', 'Customer']) => {
  const lower = clause.fullText.toLowerCase();

  let clauseType = 'Operational & Miscellaneous';
  let impact = 'Standard';
  let legalMeaning = 'Defines baseline commercial terms and standard operating protocols.';
  const obligations = [];
  const rights = [];
  const restrictions = [];

  if (lower.includes('indemnif') || lower.includes('hold harmless') || lower.includes('defend')) {
    clauseType = 'Indemnification & Third-Party Defense';
    impact = 'High Risk';
    legalMeaning = 'Shifts financial and legal liability for third-party claims, lawsuits, and settlements.';
    obligations.push(`Mandates defense and indemnification of ${parties[0] || 'Provider'} against third-party lawsuits.`);
    restrictions.push('Limits right to settle claims without prior written consent.');
  } else if (lower.includes('limit') && (lower.includes('liabilit') || lower.includes('damages'))) {
    clauseType = 'Limitation of Liability & Damages Cap';
    impact = 'Critical Risk';
    legalMeaning = 'Precludes recovery of lost profits and caps aggregate recovery to nominal past service fees.';
    rights.push('Shields provider from consequential, punitive, or indirect financial damages.');
    restrictions.push('Caps total aggregate financial claims.');
  } else if (lower.includes('terminat') || lower.includes('cancel') || lower.includes('cure period')) {
    clauseType = 'Term, Rollover & Termination';
    impact = 'High Risk';
    legalMeaning = 'Governs the contractual lifecycle, notice conditions, breach remedies, and exit liabilities.';
    rights.push('Outlines right to terminate upon material breach or expiration.');
    obligations.push('Mandates formal written notice prior to termination or non-renewal.');
  } else if (lower.includes('intellectual property') || lower.includes('inventions') || lower.includes('ownership') || lower.includes('work product')) {
    clauseType = 'Intellectual Property & Proprietary Rights';
    impact = 'High Impact';
    legalMeaning = 'Defines exclusive ownership of software, data, inventions, developments, and trademarks.';
    rights.push('Retains title and exclusive commercial exploitation rights.');
    restrictions.push('Prohibits reverse engineering, decompilation, or unauthorized sublicensing.');
  } else if (lower.includes('confidential') || lower.includes('proprietary information') || lower.includes('non-disclosure')) {
    clauseType = 'Confidentiality & Non-Disclosure';
    impact = 'Protective';
    legalMeaning = 'Mandates rigorous protective standards of care for secret trade information, data, and finances.';
    obligations.push('Maintain strict confidentiality using at least reasonable care.');
    restrictions.push('Prohibits disclosure or unauthorized dissemination to non-authorized third parties.');
  } else if (lower.includes('fee') || lower.includes('payment') || lower.includes('invoice') || lower.includes('tax')) {
    clauseType = 'Fees, Billing Schedules & Late Penalties';
    impact = 'Financial Obligation';
    legalMeaning = 'Establishes invoice delivery intervals, Net payment windows, and compounding interest penalties.';
    obligations.push('Remit billed amounts within the agreed calendar payment terms.');
    restrictions.push('Imposes late fees and service suspension on delinquent accounts.');
  } else if (lower.includes('governing law') || lower.includes('jurisdiction') || lower.includes('arbitrat') || lower.includes('venue')) {
    clauseType = 'Governing Law, Venue & Arbitration';
    impact = 'Procedural Governance';
    legalMeaning = 'Designates the legal framework, court venue, and binding arbitration protocols for disputes.';
    rights.push('Right to seek injunctive relief in designated judicial forum.');
    restrictions.push('Waives jury trials or out-of-venue lawsuits.');
  } else if (lower.includes('non-compete') || lower.includes('non-solicit') || lower.includes('restrictive covenant')) {
    clauseType = 'Restrictive Covenants & Non-Solicitation';
    impact = 'High Burden';
    legalMeaning = 'Restricts post-contract employment, competitor collaboration, and staff recruitment.';
    restrictions.push('Prohibits competitive activities across defined geographic and temporal boundaries.');
  } else if (lower.includes('warranty') || lower.includes('as is') || lower.includes('disclaimer')) {
    clauseType = 'Warranties & Disclaimers';
    impact = 'Protective Disclaimer';
    legalMeaning = 'Disclaims implied warranties of merchantability, fitness for purpose, and uninterrupted uptime.';
    rights.push('Provides services without implied statutory warranties.');
  }

  return {
    title: clause.name,
    clauseType,
    fullClauseText: clause.fullText,
    legalMeaning,
    partiesInvolved: parties,
    obligations,
    rights,
    restrictions,
    riskSeverity: impact.includes('High') || impact.includes('Critical') ? 'High' : impact.includes('Financial') ? 'Medium' : 'Low',
    // Frontend compatibility fields:
    section: clause.section,
    name: clause.name,
    summary: legalMeaning,
    impact
  };
};

/**
 * Deep Semantic Risk Detection Engine
 * Matches contract text against all 15 risk categories with semantic context
 */
const detectAllContractRisks = (text, fileName = '') => {
  const cleanText = text || '';
  const sentences = cleanText.split(/(?<=[.?!])\s+(?=[A-Z0-9])/);
  const flaggedRisks = [];

  for (const cat of RISK_CATEGORIES) {
    let isMatch = false;
    let matchedSnippet = '';
    let highestConfidence = 92;

    for (const pattern of cat.patterns) {
      if (pattern.test(cleanText)) {
        isMatch = true;
        // Find best matching sentence/context
        const matchingSentence = sentences.find(s => pattern.test(s));
        if (matchingSentence && matchingSentence.trim().length > 15) {
          matchedSnippet = matchingSentence.trim();
        }
        break;
      }
    }

    if (isMatch) {
      // Find approximate section ref
      let clauseRef = `${cat.category} Clause`;
      const nearbySection = cleanText.match(new RegExp(`(?:Section|Article|Clause)\\s*\\d+(?:\\.\\d+)?(?=[^\\n]*${cat.category.split(' ')[0]})`, 'i'));
      if (nearbySection) {
        clauseRef = nearbySection[0];
      }

      flaggedRisks.push({
        id: 'risk_' + cat.id.toLowerCase() + '_' + uuidv4().substring(0, 4),
        title: cat.title,
        category: cat.category,
        severity: cat.severity,
        level: cat.severity, // for frontend RiskBadge compatibility
        points: cat.points,
        clauseRef,
        clauseText: matchedSnippet || `Relevant contract excerpt regarding ${cat.category.toLowerCase()}.`,
        legalImpact: cat.legalImpact,
        explanation: cat.legalImpact, // for frontend explanation compatibility
        recommendation: cat.recommendation,
        saferAlternative: cat.saferAlternative,
        confidence: highestConfidence
      });
    }
  }

  // If few risks matched on generic contract, ensure standard baseline checks
  if (flaggedRisks.length === 0 && cleanText.length > 50) {
    flaggedRisks.push({
      id: 'risk_standard_' + uuidv4().substring(0, 4),
      title: 'Standard Commercial Covenants',
      category: 'General Contract Governance',
      severity: 'low',
      level: 'low',
      points: 3,
      clauseRef: 'General Terms',
      clauseText: cleanText.substring(0, 150) + '...',
      legalImpact: 'The contract utilizes standard bilateral commercial covenants with balanced liability and terms.',
      explanation: 'No high-risk unilateral traps or aggressive penalty clauses were identified in the primary terms.',
      recommendation: 'Verify specific milestones and SLA obligations prior to execution.',
      saferAlternative: 'Standard terms are protective. Maintain bilateral dispute resolution.',
      confidence: 95
    });
  }

  return flaggedRisks;
};

module.exports = {
  segmentDocumentIntoClauses,
  classifyClauseMeaning,
  detectAllContractRisks
};
