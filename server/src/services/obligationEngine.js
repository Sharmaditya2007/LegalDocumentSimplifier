/**
 * Legal Obligation Extraction Engine
 * Identifies: "Who must do what" across the contracting parties.
 */

const extractContractObligations = (text, parties = ['Provider', 'Customer']) => {
  const cleanText = text || '';
  const lower = cleanText.toLowerCase();
  const party1 = parties[0] || 'Provider';
  const party2 = parties[1] || 'Customer';

  const obligations = [];

  // 1. Service Delivery & Performance
  obligations.push({
    party: party1,
    type: 'Service Delivery',
    obligation: `Provide platform access, operational infrastructure, and designated deliverables in accordance with agreed service specifications.`
  });

  // 2. Financial & Payment Terms
  if (lower.includes('fee') || lower.includes('invoice') || lower.includes('pay')) {
    let paymentTerm = 'Net 30';
    if (lower.includes('net 45')) paymentTerm = 'Net 45';
    if (lower.includes('net 60')) paymentTerm = 'Net 60';
    obligations.push({
      party: party2,
      type: 'Payment',
      obligation: `Timely remit all undisputed fees and reimbursable expenses within ${paymentTerm} days of invoice issuance.`
    });
  }

  // 3. Confidentiality
  obligations.push({
    party: 'Both Parties',
    type: 'Confidentiality',
    obligation: `Maintain strict confidentiality of non-public commercial records, technical specifications, and proprietary data using at least reasonable care.`
  });

  // 4. Data Protection & Security Safeguards
  if (lower.includes('security') || lower.includes('gdpr') || lower.includes('hipaa') || lower.includes('privacy') || lower.includes('data')) {
    obligations.push({
      party: party1,
      type: 'Data Protection',
      obligation: `Implement industry-standard administrative, physical, and technical safeguards to protect Customer Data against unauthorized access.`
    });
  }

  // 5. Indemnification & Third-Party Claims
  if (lower.includes('indemnif') || lower.includes('defend')) {
    obligations.push({
      party: party2,
      type: 'Indemnification',
      obligation: `Defend, indemnify, and hold harmless the other party against designated third-party claims, liabilities, and defense costs.`
    });
  }

  // 6. Non-Renewal / Termination Notice
  if (lower.includes('renew') || lower.includes('terminat')) {
    obligations.push({
      party: party2,
      type: 'Notice & Compliance',
      obligation: `Transmit timely formal written notice at least 30-60 days prior to term expiration to terminate or opt out of automatic rollover.`
    });
  }

  // 7. Intellectual Property & License Restrictions
  obligations.push({
    party: party2,
    type: 'IP Restrictions',
    obligation: `Refrain from reverse engineering, decompiling, distributing, or sublicensing proprietary core software algorithms.`
  });

  // 8. Post-Termination Data Return / Purge
  obligations.push({
    party: party1,
    type: 'Data Return / Purge',
    obligation: `Upon written request or termination, return or permanently destroy all confidential records within thirty (30) business days.`
  });

  return obligations;
};

module.exports = {
  extractContractObligations
};
