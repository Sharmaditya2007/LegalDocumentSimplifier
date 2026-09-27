/**
 * Enterprise Executive Legal Summary & Report Synthesizer
 * Generates:
 * - Contract Overview & Legal Characterization
 * - Major Legal Concerns & Red Flags
 * - Key Obligations Breakdown
 * - Critical Deadlines & Renewal Traps
 * - Strategic Negotiation Priorities
 * - Plain-English Translation
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
  const criticalRisks = risks.filter(r => (r.level || r.severity || '').toLowerCase() === 'critical');
  const highRisks = risks.filter(r => (r.level || r.severity || '').toLowerCase() === 'high');
  const mediumRisks = risks.filter(r => (r.level || r.severity || '').toLowerCase() === 'medium');

  const overview = `This agreement is a legally binding ${contractType || 'Commercial Agreement'} executed between ${parties.join(' and ')}. It governs commercial deliverables, license grants, intellectual property boundaries, operational warranties, and financial obligations.`;

  let riskNarrative = '';
  if (criticalRisks.length > 0 || highRisks.length > 0) {
    const topCategories = [...new Set([...criticalRisks, ...highRisks].map(r => r.category))].slice(0, 4);
    riskNarrative = `The AI Risk Sentinel flagged ${criticalRisks.length + highRisks.length} severe legal risks across ${topCategories.join(', ')}. These provisions expose your organization to asymmetric liability, uncapped damages, or operational lock-in.`;
  } else {
    riskNarrative = `The document exhibits balanced bilateral commercial terms with ${mediumRisks.length} standard operational considerations.`;
  }

  const executiveSummary = `${overview} Overall portfolio risk score is assessed at ${overallRiskScore}/100 ([${riskLevel.toUpperCase()}]). ${riskNarrative} Key commitments encompass ${obligations.length} distinct contractual covenants across both parties and ${deadlines.length} critical timeline milestones. Pre-signature redline counter-proposals are strongly recommended for all flagged high-risk items.`;

  const plainEnglish = `In plain English: You are entering a binding contract with ${parties[0] || 'the counterparty'}. You receive designated services or software licenses, but you are bound by strict payment terms, notice windows, and liability boundaries. Be especially cautious of renewal deadlines: if you do not deliver formal written non-renewal notice within the specified window, the contract will roll over automatically. Review the counter-proposals in the Risks tab before signing.`;

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
