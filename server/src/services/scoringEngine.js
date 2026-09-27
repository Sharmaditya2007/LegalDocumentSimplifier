/**
 * Legal Risk Scoring Engine
 * High Risk = 15 points
 * Medium Risk = 8 points
 * Low Risk = 3 points
 * 
 * Score Ranges:
 *  0-20  Safe
 *  21-40 Low Risk
 *  41-60 Medium Risk
 *  61-80 High Risk
 *  81-100 Critical Risk
 * Cap maximum score at 100.
 */

const calculateRiskScore = (flaggedRisks = []) => {
  let rawScore = 0;
  let highCount = 0;
  let mediumCount = 0;
  let lowCount = 0;

  for (const risk of flaggedRisks) {
    const sev = (risk.severity || risk.level || 'low').toLowerCase();
    if (sev === 'high' || sev === 'critical') {
      rawScore += 15;
      highCount++;
    } else if (sev === 'medium') {
      rawScore += 8;
      mediumCount++;
    } else {
      rawScore += 3;
      lowCount++;
    }
  }

  // Cap maximum score at 100, minimum 0
  const finalScore = Math.min(100, Math.max(0, rawScore));

  let riskLevel = 'low';
  let riskRating = 'Safe';

  if (finalScore <= 20) {
    riskLevel = 'low';
    riskRating = 'Safe';
  } else if (finalScore <= 40) {
    riskLevel = 'low';
    riskRating = 'Low Risk';
  } else if (finalScore <= 60) {
    riskLevel = 'medium';
    riskRating = 'Medium Risk';
  } else if (finalScore <= 80) {
    riskLevel = 'high';
    riskRating = 'High Risk';
  } else {
    riskLevel = 'critical';
    riskRating = 'Critical Risk';
  }

  return {
    overallRiskScore: finalScore,
    riskLevel,
    riskRating,
    riskCounts: {
      total: flaggedRisks.length,
      high: highCount,
      medium: mediumCount,
      low: lowCount
    },
    riskDistribution: {
      highPercent: flaggedRisks.length ? Math.round((highCount / flaggedRisks.length) * 100) : 0,
      mediumPercent: flaggedRisks.length ? Math.round((mediumCount / flaggedRisks.length) * 100) : 0,
      lowPercent: flaggedRisks.length ? Math.round((lowCount / flaggedRisks.length) * 100) : 0
    }
  };
};

module.exports = {
  calculateRiskScore
};
