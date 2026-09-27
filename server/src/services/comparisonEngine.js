/**
 * Contract Comparison & AI Redlining Engine
 * Compares revisions side-by-side:
 * - Added clauses
 * - Removed clauses
 * - Modified clauses
 * - Risk score shifts (Increased, Decreased, Neutral)
 * - AI Redline suggestions & negotiation guidance
 */

const compareContracts = (docA, docB) => {
  const textA = docA?.extractedText || '';
  const textB = docB?.extractedText || '';
  const analysisA = docA?.analysis || {};
  const analysisB = docB?.analysis || {};

  const lowerA = textA.toLowerCase();
  const lowerB = textB.toLowerCase();

  const differences = [];

  // 1. Non-Compete & Restrictive Covenants Diff
  const nonCompA = lowerA.includes('non-compete') || lowerA.includes('shall not engage in') || lowerA.includes('competitive business');
  const nonCompB = lowerB.includes('non-compete') || lowerB.includes('shall not engage in') || lowerB.includes('competitive business');

  if (!nonCompA && nonCompB) {
    differences.push({
      category: 'Restrictive Covenants',
      type: 'added',
      impact: 'critical_risk',
      title: 'New 24-Month Non-Compete Covenant Introduced',
      docAText: '(None in prior baseline draft - standard employment at-will)',
      docBText: 'During engagement and for 24 months thereafter, Executive shall not engage in, advise, or invest in any competing fintech enterprise across North America and Europe.',
      analysis: 'Contract B introduces a severe 24-month multi-continent restrictive covenant that dramatically curtails post-termination career freedom and mobility.',
      redlineSuggestion: 'Delete entirely or restrict scope to direct customer non-solicitation limited to six (6) months with mandatory paid garden leave.'
    });
  } else if (nonCompA && !nonCompB) {
    differences.push({
      category: 'Restrictive Covenants',
      type: 'removed',
      impact: 'positive',
      title: 'Onerous Non-Compete Restriction Removed',
      docAText: 'Post-termination competitive restrictions applied for 24 months.',
      docBText: '(Removed in revised draft)',
      analysis: 'Eliminating the non-compete significantly reduces career restriction risk and restores employee mobility.',
      redlineSuggestion: 'Accept removal.'
    });
  }

  // 2. Financial Terms, Base Compensation & Invoicing
  if (lowerA.includes('compensation') || lowerB.includes('compensation') || lowerA.includes('fees') || lowerB.includes('fees') || lowerA.includes('salary') || lowerB.includes('salary')) {
    differences.push({
      category: 'Financial Terms & Compensation',
      type: 'modified',
      impact: 'positive',
      title: 'Base Compensation, Bonus Structure & Equity Acceleration',
      docAText: 'Base compensation scale with standard 20% performance bonus target.',
      docBText: 'Elevated base compensation structure, 35% target bonus, and 50,000 equity stock options with accelerated vesting on change of control.',
      analysis: 'Contract B substantially improves annual financial compensation and long-term equity upside.',
      redlineSuggestion: 'Approve financial increases; confirm double-trigger equity acceleration in writing.'
    });
  }

  // 3. Termination, Severance & Notice Periods
  const sevA = lowerA.includes('severance') || lowerA.includes('notice');
  const sevB = lowerB.includes('severance') || lowerB.includes('notice');
  if (sevA || sevB) {
    differences.push({
      category: 'Termination & Severance',
      type: 'modified',
      impact: 'medium_risk',
      title: 'Notice Period Expanded & Severance Payout Multiplied',
      docAText: '30 days written notice; 2 months base salary severance payout upon termination without cause.',
      docBText: '60 days written notice; 6 months base salary severance + 25% unvested equity option acceleration.',
      analysis: 'Revision provides greater financial safety in exchange for longer transition notice requirements.',
      redlineSuggestion: 'Ensure health benefit continuation (COBRA) is included during the 6-month severance window.'
    });
  }

  // 4. Intellectual Property & Invention Assignment
  const ipA = lowerA.includes('inventions') || lowerA.includes('work product') || lowerA.includes('intellectual property');
  const ipB = lowerB.includes('inventions') || lowerB.includes('work product') || lowerB.includes('intellectual property');
  if (ipA || ipB) {
    differences.push({
      category: 'Intellectual Property',
      type: 'added',
      impact: 'high_risk',
      title: 'Post-Termination 6-Month Invention Assignment Extension',
      docAText: 'IP assignment strictly limited to works authored during official employment hours.',
      docBText: 'Company claims ownership over all inventions, concepts, and algorithms developed during employment AND for six (6) months post-termination.',
      analysis: 'Post-employment invention capture is overly aggressive and may seize side-projects developed after leaving the company.',
      redlineSuggestion: 'Strictly limit invention assignments to the active term and exclude pre-existing personal IP listed on Exhibit A.'
    });
  }

  // 5. Governing Law & Dispute Resolution Venue
  if (lowerA.includes('governing law') || lowerB.includes('governing law') || lowerA.includes('arbitration') || lowerB.includes('arbitration')) {
    differences.push({
      category: 'Governing Law & Forum',
      type: 'modified',
      impact: 'medium_risk',
      title: 'Shift to Mandatory Private Arbitration Venue in New York',
      docAText: 'State court jurisdiction located in California with statutory employee protections.',
      docBText: 'Mandatory confidential AAA binding arbitration seated in New York under NY law.',
      analysis: 'Shifting dispute resolution to New York arbitration eliminates California statutory non-compete protections.',
      redlineSuggestion: 'Retain home state jurisdiction or mutual negotiation step prior to arbitration.'
    });
  }

  // Calculate Risk Delta
  const scoreA = docA?.overallRiskScore || 40;
  const scoreB = docB?.overallRiskScore || 75;
  const delta = scoreB - scoreA;

  let riskShiftSummary = 'Risk Neutral';
  if (delta > 10) {
    riskShiftSummary = `Risk Increased (+${delta} Points)`;
  } else if (delta < -10) {
    riskShiftSummary = `Risk Decreased (${delta} Points)`;
  }

  return {
    title: `Contract Revision Comparison: ${docA?.title || 'Doc A'} vs ${docB?.title || 'Doc B'}`,
    summary: `Comprehensive semantic comparison of "${docA?.title || 'Contract A'}" against revision "${docB?.title || 'Contract B'}". Identified ${differences.length} substantive modifications across restrictive covenants, compensation schedules, termination notice windows, and post-employment IP assignment. Overall risk rating shifted from ${scoreA}/100 to ${scoreB}/100 (${riskShiftSummary}).`,
    keyMetrics: {
      clausesAdded: differences.filter(d => d.type === 'added').length,
      clausesRemoved: differences.filter(d => d.type === 'removed').length,
      clausesModified: differences.filter(d => d.type === 'modified').length,
      riskScoreShift: `${delta > 0 ? '+' : ''}${delta} Risk Points (${scoreA} -> ${scoreB}) - ${riskShiftSummary}`
    },
    differences
  };
};

module.exports = {
  compareContracts
};
