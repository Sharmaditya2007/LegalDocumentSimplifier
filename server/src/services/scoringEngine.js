/**
 * Dynamic Legal Risk & Exposure Scoring Engine
 * 
 * Dynamic score synthesized from:
 * 1. Categorical severity weights (Critical=20, High=15, Medium=8, Low=3)
 * 2. Exposure concentration (Financial, Data/IP, Operational, Liability)
 * 3. Contractual Asymmetry & One-Sidedness factor
 * 4. Missing mutual protections penalty
 * 
 * Ranges:
 *  0-20  Safe
 *  21-40 Low Risk
 *  41-60 Medium Risk
 *  61-80 High Risk
 *  81-100 Critical Risk
 */

const calculateDynamicRiskScore = (flaggedRisks = [], contractContext = {}) => {
  if (!flaggedRisks || flaggedRisks.length === 0) {
    return {
      overallRiskScore: 12,
      riskLevel: 'low',
      riskRating: 'Safe',
      riskCounts: { total: 0, critical: 0, high: 0, medium: 0, low: 0 },
      riskDistribution: { highPercent: 0, mediumPercent: 0, lowPercent: 0 }
    };
  }

  let baseScore = 0;
  let criticalCount = 0;
  let highCount = 0;
  let mediumCount = 0;
  let lowCount = 0;

  // Exposure vector accumulators
  let liabilityExposure = 0;
  let dataPrivacyExposure = 0;
  let operationalExposure = 0;
  let financialExposure = 0;

  for (const r of flaggedRisks) {
    const sev = (r.severity || r.level || 'low').toLowerCase();
    const cat = (r.category || '').toLowerCase();

    if (sev === 'critical') {
      baseScore += 20;
      criticalCount++;
    } else if (sev === 'high') {
      baseScore += 15;
      highCount++;
    } else if (sev === 'medium') {
      baseScore += 8;
      mediumCount++;
    } else {
      baseScore += 3;
      lowCount++;
    }

    // Classify exposure vectors
    if (cat.includes('liability') || cat.includes('indemnif') || cat.includes('exposure')) {
      liabilityExposure += 10;
    } else if (cat.includes('data') || cat.includes('privacy') || cat.includes('retention') || cat.includes('ip') || cat.includes('intellectual')) {
      dataPrivacyExposure += 10;
    } else if (cat.includes('termination') || cat.includes('renewal') || cat.includes('service') || cat.includes('sla') || cat.includes('lock-in')) {
      operationalExposure += 8;
    } else if (cat.includes('penalt') || cat.includes('fee') || cat.includes('price') || cat.includes('financial')) {
      financialExposure += 8;
    }
  }

  // Calculate Asymmetry / Concentration Multiplier
  let concentrationPenalty = 0;
  if (highCount + criticalCount >= 4) {
    concentrationPenalty = 12;
  } else if (highCount + criticalCount >= 2) {
    concentrationPenalty = 6;
  }

  // Missing protections penalty (e.g. no mutual indemnity or capped damages)
  let missingProtectionPenalty = 0;
  if (flaggedRisks.some(r => r.category === 'One-Sided Indemnification') && flaggedRisks.some(r => r.category === 'Liability Limitation')) {
    missingProtectionPenalty = 8;
  }

  const rawComputed = baseScore + concentrationPenalty + missingProtectionPenalty;

  // Cap dynamic score smoothly between 15 and 98
  const finalScore = Math.min(98, Math.max(15, rawComputed));

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

  const total = flaggedRisks.length;
  const highCombined = criticalCount + highCount;

  return {
    overallRiskScore: finalScore,
    riskLevel,
    riskRating,
    exposureProfile: {
      liability: Math.min(100, liabilityExposure),
      dataPrivacy: Math.min(100, dataPrivacyExposure),
      operational: Math.min(100, operationalExposure),
      financial: Math.min(100, financialExposure)
    },
    riskCounts: {
      total,
      critical: criticalCount,
      high: highCount,
      medium: mediumCount,
      low: lowCount
    },
    riskDistribution: {
      highPercent: total ? Math.round((highCombined / total) * 100) : 0,
      mediumPercent: total ? Math.round((mediumCount / total) * 100) : 0,
      lowPercent: total ? Math.round((lowCount / total) * 100) : 0
    }
  };
};

module.exports = {
  calculateRiskScore: calculateDynamicRiskScore,
  calculateDynamicRiskScore
};
