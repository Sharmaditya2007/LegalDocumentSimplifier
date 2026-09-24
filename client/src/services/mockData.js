export const MOCK_DOCUMENTS = [
  {
    _id: 'doc_saas_001',
    title: 'Standard SaaS Master Services Agreement',
    fileName: 'SaaS_Master_Services_Agreement.pdf',
    fileType: 'application/pdf',
    fileSize: 248500,
    fileUrl: '/uploads/saas_master_services_agreement.pdf',
    status: 'completed',
    createdAt: new Date('2026-01-15').toISOString(),
    overallRiskScore: 78,
    riskLevel: 'high',
    isArchived: false,
    analysis: {
      parties: ['Service Provider', 'Enterprise Customer'],
      contractType: 'Master Services Agreement (SaaS)',
      effectiveDate: '2026-01-15',
      expiryDate: '2028-01-15',
      executiveSummary: '24-month SaaS contract with 100% early termination liability, 10% auto-renewal price hike, and one-sided indemnity.',
      plainEnglish: 'Locked in for 2 years. Early exit requires full payment. 60-day notice needed to prevent 10% price increase.',
      paymentTerms: 'Annual in advance; Net 45 with 1.5% late fee.',
      renewalConditions: 'Auto-renews for 12 months at +10% price unless cancelled 60 days before.',
      complianceRequirements: 'Delaware law with binding arbitration.',
      risks: [
        {
          id: 'r1',
          level: 'high',
          category: 'Termination & Penalties',
          title: '100% Early Exit Penalty',
          clauseRef: 'Section 14.2',
          explanation: 'Requires paying 100% of remaining fees if cancelled early.',
          recommendation: 'Cap early exit fee at 1 month of service.'
        },
        {
          id: 'r2',
          level: 'high',
          category: 'Auto-Renewal',
          title: '60-Day Auto-Renewal (+10% Price)',
          clauseRef: 'Section 4.1',
          explanation: 'Auto-renews at 10% higher rate unless cancelled 60 days prior.',
          recommendation: 'Shorten notice to 30 days; cap increases to 3%.'
        },
        {
          id: 'r3',
          level: 'high',
          category: 'Indemnity',
          title: 'One-Sided Indemnification',
          clauseRef: 'Section 11.1',
          explanation: 'Customer defends Provider with no reciprocal IP protection.',
          recommendation: 'Require mutual indemnification.'
        }
      ],
      clauses: [
        {
          section: 'Section 3.2',
          name: 'IP Ownership',
          summary: 'Customer owns data; Provider owns software & algorithms.',
          impact: 'Standard'
        },
        {
          section: 'Section 8.4',
          name: 'Liability Cap',
          summary: 'Provider liability capped at 12 months fees.',
          impact: 'Moderate'
        }
      ],
      obligations: [
        { party: 'Customer', type: 'Payment', obligation: 'Pay annual subscription within 45 days.' },
        { party: 'Customer', type: 'Notice', obligation: 'Give 60 days written notice to cancel auto-renewal.' },
        { party: 'Provider', type: 'SLA', obligation: 'Maintain 99.9% service uptime.' }
      ],
      deadlines: [
        { title: 'Renewal Notice Cutoff', date: '2027-11-15', urgency: 'High', category: 'Renewal Notice', description: '60-day non-renewal cutoff.' },
        { title: 'Annual Invoice Due', date: '2026-03-01', urgency: 'Medium', category: 'Payment', description: 'Net 45 payment due date.' }
      ]
    },
    extractedText: `MASTER SERVICES AGREEMENT\n\nThis Master Services Agreement is entered into as of January 15, 2026 between Service Provider Inc. ("Provider") and Enterprise Customer LLC ("Customer").\n\n1. TERM AND RENEWAL: 24 months initial term with automatic 12-month renewal at 10% price increase unless 60-day written notice is provided.\n2. TERMINATION: 100% early termination fee applies.\n3. INDEMNIFICATION: Customer indemnifies Provider for third-party claims.`
  },
  {
    _id: 'doc_nda_002',
    title: 'Standard Mutual Non-Disclosure Agreement',
    fileName: 'Mutual_Non_Disclosure_Agreement.pdf',
    fileType: 'application/pdf',
    fileSize: 124000,
    fileUrl: '/uploads/mutual_non_disclosure_agreement.pdf',
    status: 'completed',
    createdAt: new Date('2026-01-20').toISOString(),
    overallRiskScore: 28,
    riskLevel: 'low',
    isArchived: false,
    analysis: {
      parties: ['Disclosing Party', 'Receiving Party'],
      contractType: 'Mutual Non-Disclosure Agreement (MNDA)',
      effectiveDate: '2026-01-20',
      expiryDate: '2028-01-20',
      executiveSummary: 'Standard mutual NDA with balanced confidentiality terms and a 2-year survival window.',
      plainEnglish: 'Both parties agree to protect proprietary trade secrets for 2 years.',
      paymentTerms: 'None ($0 financial exchange).',
      renewalConditions: 'Fixed 2-year term.',
      complianceRequirements: 'New York law with injunctive relief.',
      risks: [
        {
          id: 'r_nda_1',
          level: 'low',
          category: 'Duration',
          title: '2-Year Standard Confidentiality',
          clauseRef: 'Section 4',
          explanation: 'Obligations expire 24 months after disclosure.',
          recommendation: 'Standard terms. Safe to sign.'
        }
      ],
      clauses: [
        {
          section: 'Section 2.1',
          name: 'Standard of Care',
          summary: 'Mutual reasonable care standard.',
          impact: 'Favorable'
        }
      ],
      obligations: [
        { party: 'Both Parties', type: 'Confidentiality', obligation: 'Protect shared trade secrets for 2 years.' },
        { party: 'Both Parties', type: 'Return', obligation: 'Return or destroy files within 14 days of request.' }
      ],
      deadlines: [
        { title: 'NDA Term Expiration', date: '2028-01-20', urgency: 'Low', category: 'Expiration', description: '2-year term concludes.' }
      ]
    },
    extractedText: `MUTUAL NON-DISCLOSURE AGREEMENT\n\nMutual NDA entered into January 20, 2026. Both parties agree to protect proprietary disclosures for two (2) years.`
  }
];

export const MOCK_COMPARISONS = [
  {
    _id: 'cmp_demo_001',
    title: 'Executive Employment Agreement (v1.0 vs v2.0)',
    docAId: 'doc_emp_v1',
    docBId: 'doc_emp_v2',
    docATitle: 'Employment Agreement (v1.0 Baseline)',
    docBTitle: 'Employment Agreement (v2.0 Revised)',
    createdAt: new Date('2026-01-25').toISOString(),
    summary: 'Revision adds a 24-month non-compete and reduces severance from 6 months to at-will.',
    keyMetrics: {
      clausesAdded: 2,
      clausesRemoved: 1,
      clausesModified: 3,
      riskScoreShift: '+32 Risk Surge'
    },
    differences: [
      {
        type: 'added',
        category: 'Non-Compete',
        title: '24-Month Non-Compete Added',
        docAText: '(None in baseline draft)',
        docBText: '"Executive shall not advise any competitor for 24 months post-termination."',
        impact: 'critical_risk',
        analysis: 'Restricts future employment for 2 full years.'
      },
      {
        type: 'modified',
        category: 'Severance',
        title: 'Severance Cut from 6 Months to 2 Weeks',
        docAText: '"Executive receives 6 months base salary severance."',
        docBText: '"Company may terminate upon 2 weeks pay in lieu of notice."',
        impact: 'critical_risk',
        analysis: 'Reduces payout protection by 85%.'
      }
    ]
  }
];
