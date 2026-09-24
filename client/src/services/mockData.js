export const MOCK_DOCUMENTS = [
  {
    _id: 'doc_saas_001',
    title: 'CloudScale SaaS Master Services Agreement',
    fileName: 'CloudScale_SaaS_MSA.pdf',
    fileType: 'application/pdf',
    fileSize: 248500,
    fileUrl: '/uploads/sample_saas_msa.pdf',
    status: 'completed',
    createdAt: new Date('2026-01-15').toISOString(),
    overallRiskScore: 78,
    riskLevel: 'high',
    isArchived: false,
    analysis: {
      parties: ['CloudScale Solutions Inc. (Provider)', 'Apex Global Enterprises LLC (Customer)'],
      contractType: 'Master Services Agreement (SaaS)',
      effectiveDate: '2026-01-15',
      expiryDate: '2028-01-15',
      executiveSummary: 'This 24-month SaaS Agreement commits the Customer to an inflexible term with aggressive liquidated damages, an automatic 10% fee hike on renewal, Net 45 payment terms with 1.5% monthly late interest, and unilateral indemnification.',
      plainEnglish: 'You are locked in for 2 full years. If you cancel early, you owe 100% of remaining payments. You must give 60 days notice to prevent automatic renewal at a 10% price increase. You must defend the Provider in court, but they do not protect you against patent infringement.',
      paymentTerms: 'Fees invoiced annually in advance. Net 45 payment terms with 1.5% compounding monthly interest for overdue invoices.',
      renewalConditions: 'Automatic successive 12-month renewal at +10% fee increase unless non-renewal notice is served 60 days prior.',
      complianceRequirements: 'Governed under Delaware state jurisdiction with binding arbitration and class action waiver.',
      risks: [
        {
          id: 'r1',
          level: 'high',
          category: 'Termination & Unfair Penalties',
          title: '100% Early Termination Fee Penalty',
          clauseRef: 'Section 14.2 (Termination for Convenience)',
          explanation: 'Customer must pay liquidated damages equal to 100% of all unpaid fees through the remaining term if terminated early.',
          recommendation: 'Negotiate termination for convenience upon 30 days notice with fees capped at 1–2 months of service.'
        },
        {
          id: 'r2',
          level: 'high',
          category: 'Automatic Renewal Lock-In',
          title: '60-Day Auto-Renewal + 10% Price Surge',
          clauseRef: 'Section 4.1 (Term and Renewal)',
          explanation: 'Contract automatically renews for 12 months with a 10% price bump unless written notice is given 60 days in advance.',
          recommendation: 'Shorten notice window to 30 days and cap annual fee increases strictly to CPI (max 3%).'
        },
        {
          id: 'r3',
          level: 'high',
          category: 'Indemnity & Liability Transfer',
          title: 'Unilateral Indemnification (Liability Trap)',
          clauseRef: 'Section 11.1 (Customer Indemnification)',
          explanation: 'Customer must defend and hold harmless the Provider against third-party claims with no reciprocal IP infringement defense.',
          recommendation: 'Demand mutual indemnification and require vendor to defend against intellectual property infringement claims.'
        }
      ],
      clauses: [
        {
          section: 'Section 3.2',
          name: 'Intellectual Property Ownership',
          summary: 'Customer retains title to customer data; Provider owns all software algorithms, derivatives, and telemetry metrics.',
          impact: 'Standard'
        },
        {
          section: 'Section 8.4',
          name: 'Limitation of Liability Cap',
          summary: 'Provider aggregate liability is capped at fees paid in previous 12 months, excluding IP indemnity and gross negligence.',
          impact: 'Moderate Risk'
        }
      ],
      obligations: [
        { party: 'Customer', type: 'Payment', obligation: 'Pay annual subscription fees within 45 days of invoice date.' },
        { party: 'Customer', type: 'Notice', obligation: 'Provide 60 days advance written notice prior to term end to cancel auto-renewal.' },
        { party: 'Provider', type: 'Service SLA', obligation: 'Maintain 99.9% uptime excluding scheduled maintenance.' }
      ],
      deadlines: [
        { title: 'Annual Renewal Cancellation Deadline', date: '2027-11-15', urgency: 'High', category: 'Renewal Notice', description: 'Mandatory 60-day notice cutoff before automatic 12-month extension with 10% surge.' },
        { title: 'Year 1 Subscription Payment Due', date: '2026-03-01', urgency: 'Medium', category: 'Payment', description: 'Net 45 invoice payment deadline.' }
      ]
    },
    extractedText: `MASTER SERVICES AGREEMENT\n\nThis Master Services Agreement is entered into as of January 15, 2026 between CloudScale Solutions Inc. ("Provider") and Apex Global Enterprises LLC ("Customer").\n\n1. TERM AND RENEWAL: This Agreement shall commence on the Effective Date and continue for an Initial Term of 24 months. This Agreement shall automatically renew for successive 12-month periods at a 10% fee increase unless Customer provides written notice of non-renewal at least sixty (60) days prior to the expiration of the current term.\n\n2. TERMINATION: Customer may terminate for convenience prior to expiration only upon payment of liquidated damages equal to 100% of all remaining fees through the full 24-month term.\n\n3. INDEMNIFICATION: Customer agrees to defend, indemnify and hold harmless Provider from all third-party claims. Provider provides no reciprocal indemnification for intellectual property infringement.`
  },
  {
    _id: 'doc_nda_002',
    title: 'Horizon & Vanguard Mutual Non-Disclosure Agreement',
    fileName: 'Horizon_Mutual_NDA.pdf',
    fileType: 'application/pdf',
    fileSize: 124000,
    fileUrl: '/uploads/sample_nda.pdf',
    status: 'completed',
    createdAt: new Date('2026-01-20').toISOString(),
    overallRiskScore: 28,
    riskLevel: 'low',
    isArchived: false,
    analysis: {
      parties: ['Horizon Technologies Inc.', 'Vanguard Partners LLC'],
      contractType: 'Mutual Non-Disclosure Agreement (MNDA)',
      effectiveDate: '2026-01-20',
      expiryDate: '2028-01-20',
      executiveSummary: 'Balanced bilateral non-disclosure agreement with mutual confidentiality obligations, standard exceptions for public knowledge, and a 2-year survival term.',
      plainEnglish: 'Both parties agree to protect each other’s confidential trade secrets and business info for 2 years with standard exceptions.',
      paymentTerms: 'Not applicable (Zero financial exchange).',
      renewalConditions: 'Fixed 2-year term with automatic expiration.',
      complianceRequirements: 'New York governing law with mutual injunctive relief.',
      risks: [
        {
          id: 'r_nda_1',
          level: 'low',
          category: 'Confidentiality Scope',
          title: 'Standard Confidentiality Duration (2 Years)',
          clauseRef: 'Section 4 (Survival)',
          explanation: 'Obligations expire 24 months post-disclosure. Trade secrets remain protected under applicable statutory laws.',
          recommendation: 'Standard terms. Safe to execute as structured.'
        }
      ],
      clauses: [
        {
          section: 'Section 2.1',
          name: 'Mutual Standard of Care',
          summary: 'Each party agrees to use at least reasonable care to prevent unauthorized dissemination.',
          impact: 'Favorable'
        }
      ],
      obligations: [
        { party: 'Both Parties', type: 'Confidentiality', obligation: 'Maintain confidentiality of disclosed information for 24 months.' },
        { party: 'Both Parties', type: 'Return of Materials', obligation: 'Destroy or return confidential files within 14 days of written request.' }
      ],
      deadlines: [
        { title: 'NDA Term Expiration', date: '2028-01-20', urgency: 'Low', category: 'Expiration', description: '24-month confidentiality window concludes.' }
      ]
    },
    extractedText: `MUTUAL NON-DISCLOSURE AGREEMENT\n\nThis Mutual Non-Disclosure Agreement is entered into as of January 20, 2026 between Horizon Technologies Inc. and Vanguard Partners LLC.\n\n1. OBLIGATIONS: Both parties agree to protect and maintain confidential all proprietary trade secrets and technical disclosures using reasonable care for a period of two (2) years.`
  }
];

export const MOCK_COMPARISONS = [
  {
    _id: 'cmp_demo_001',
    title: 'Employment Agreement v1.0 vs v2.0 (Executive Redline)',
    docAId: 'doc_emp_v1',
    docBId: 'doc_emp_v2',
    docATitle: 'Zenith Employment Agreement (v1.0 Baseline)',
    docBTitle: 'Zenith Employment Agreement (v2.0 Revised)',
    createdAt: new Date('2026-01-25').toISOString(),
    summary: 'Revision v2.0 introduces a 24-month non-compete covenant and weakens severance guarantees from 6 months to at-will.',
    keyMetrics: {
      clausesAdded: 2,
      clausesRemoved: 1,
      clausesModified: 3,
      riskScoreShift: '+32 Risk Surge'
    },
    differences: [
      {
        type: 'added',
        category: 'Restrictive Covenants',
        title: '24-Month Non-Compete Restriction Inserted',
        docAText: '(No non-compete restriction was present in initial draft)',
        docBText: '"Executive shall not directly or indirectly engage with or advise any competitive fintech enterprise within North America for 24 months following termination."',
        impact: 'critical_risk',
        analysis: 'Substantially limits career mobility post-departure across all fintech sectors.'
      },
      {
        type: 'modified',
        category: 'Severance & Termination',
        title: 'Severance Reduced from 6 Months to At-Will',
        docAText: '"In the event of termination without cause, Executive shall receive 6 months base salary severance."',
        docBText: '"In the event of termination without cause, Company may terminate immediately upon 2 weeks pay in lieu of notice."',
        impact: 'critical_risk',
        analysis: 'Reduces financial protection by 85% in non-fault separation scenarios.'
      }
    ]
  }
];
