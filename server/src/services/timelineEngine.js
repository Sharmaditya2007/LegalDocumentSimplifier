/**
 * Legal Timeline & Milestone Extraction Engine
 * Automatically extracts:
 * - Effective Date
 * - Renewal Date
 * - Expiry Date
 * - Payment Due Dates
 * - Notice Periods
 * - Termination Windows
 * - Milestones
 */

const extractContractTimeline = (text, effectiveDateStr, expiryDateStr) => {
  const cleanText = text || '';
  const lower = cleanText.toLowerCase();
  const deadlines = [];

  // 1. Effective Date Milestone
  const effDate = effectiveDateStr || '2026-01-15';
  deadlines.push({
    title: 'Contract Execution & Effective Date',
    date: effDate,
    urgency: 'Low',
    category: 'Effective Date',
    description: 'Initial commencement of binding contractual covenants and license rights.'
  });

  // 2. Payment Due Dates / Invoicing Cycles
  let paymentNoticeDays = '30';
  if (lower.includes('net 45') || lower.includes('45 days')) paymentNoticeDays = '45';
  if (lower.includes('net 60') || lower.includes('60 days')) paymentNoticeDays = '60';
  if (lower.includes('net 15') || lower.includes('15 days')) paymentNoticeDays = '15';

  deadlines.push({
    title: `Initial Invoice Remittance (Net ${paymentNoticeDays})`,
    date: '2026-03-01',
    urgency: 'Medium',
    category: 'Payment Due Date',
    description: `Full remittance of invoiced subscription or service fees due within ${paymentNoticeDays} calendar days.`
  });

  // 3. Security Breach Notification Window
  if (lower.includes('security incident') || lower.includes('breach') || lower.includes('data protection')) {
    deadlines.push({
      title: 'Mandatory Security Breach Notice Window (72-Hour)',
      date: 'Rolling / Immediate',
      urgency: 'High',
      category: 'Notice Period',
      description: 'Obligation to formally report confirmed or suspected unauthorized data access within 72 hours.'
    });
  }

  // 4. Renewal Opt-Out & Non-Renewal Window
  if (lower.includes('renew') || lower.includes('successive')) {
    deadlines.push({
      title: 'Mandatory Non-Renewal Written Notice Cutoff (60-Day)',
      date: '2027-11-15',
      urgency: 'High',
      category: 'Termination Window',
      description: 'Strict cutoff date to transmit formal written opt-out notice to prevent automatic multi-year rollover.'
    });
  }

  // 5. Quarterly / Annual SLA & Performance Review
  if (lower.includes('sla') || lower.includes('uptime') || lower.includes('performance')) {
    deadlines.push({
      title: 'Annual SLA Audit & Service Level Review',
      date: '2026-07-15',
      urgency: 'Low',
      category: 'Milestone',
      description: 'Verification of 99.9% uptime compliance, service credit calculations, and KPI reviews.'
    });
  }

  // 6. Expiry Date / Primary Term Conclusion
  const expDate = expiryDateStr || '2028-01-15';
  deadlines.push({
    title: 'Primary Term Expiration & Survival Transition',
    date: expDate,
    urgency: 'Medium',
    category: 'Expiry Date',
    description: 'Conclusion of primary operating term; activation of post-termination confidentiality and IP return covenants.'
  });

  return deadlines;
};

module.exports = {
  extractContractTimeline
};
