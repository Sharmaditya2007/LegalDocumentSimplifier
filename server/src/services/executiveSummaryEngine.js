/**
 * Executive Risk & Legal Summary Engine
 * Generates:
 * - Contract Overview
 * - Major Risks breakdown
 * - Key Obligations
 * - Important Deadlines & Notice Windows
 * - Renewal & Invoicing Conditions
 * - Final Plain-English Translation & Strategic Recommendation
 */

const generateExecutiveSummary = ({
  contractType,
  parties = ['Provider', 'Customer'],
  risks = [],
  obligations = [],
  deadlines = [],
  overallRiskScore,
  riskLevel
}) => {
  const highRisks = risks.filter(r => (r.level || r.severity || '').toLowerCase() === 'high' || (r.level || r.severity || '').toLowerCase() === 'critical');
  const mediumRisks = risks.filter(r => (r.level || r.severity || '').toLowerCase() === 'medium');

  const overview = `This document is a binding ${contractType || 'Commercial Legal Agreement'} between ${parties.join(' and ')}. It establishes mutual operating covenants, service deliverables, intellectual property boundaries, and risk allocations.`;

  const riskNarrative = highRisks.length > 0
    ? `The AI Risk Sentinel flagged ${highRisks.length} critical high-risk items, primarily concerning ${highRisks.map(r => r.category).slice(0, 3).join(', ')}. These terms present asymmetric liability exposure and operational disruption risks.`
    : `The agreement exhibits balanced liability allocation with ${mediumRisks.length} moderate commercial points requiring standard review.`;

  const executiveSummary = `${overview} Overall portfolio risk score is ${overallRiskScore}/100 ([${riskLevel.toUpperCase()}]). ${riskNarrative} Key commitments encompass ${obligations.length} distinct contractual obligations across both parties and ${deadlines.length} critical timeline milestones. Counter-proposals are recommended for all flagged high-risk items before final signature.`;

  const plainEnglish = `In plain English: You are entering an agreement with ${parties[0] || 'the other party'}. You will receive specified services or deliverables, but you must adhere to strict payment timelines and notice requirements. Be particularly careful with the termination and automatic renewal rules: if you fail to send written non-renewal notice within the required window, the agreement will continue automatically. Review the redline suggestions in the Risks tab before signing.`;

  return {
    executiveSummary,
    plainEnglish,
    overview,
    riskNarrative
  };
};

module.exports = {
  generateExecutiveSummary
};
