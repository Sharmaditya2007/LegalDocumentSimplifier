const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { SAMPLE_SAAS_MSA, SAMPLE_MUTUAL_NDA, SAMPLE_EMPLOYMENT_V1, SAMPLE_EMPLOYMENT_V2 } = require('../samples/sampleContracts');

const DATA_DIR = path.join(__dirname, '..', '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'store.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

let memoryDb = {
  users: [],
  documents: [],
  comparisons: [],
  chats: [],
  notifications: []
};

// Seed Initial Data
const initializeSeedData = () => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync('password123', salt);

  const adminId = 'usr_admin_001';
  const premiumId = 'usr_prem_002';
  const standardId = 'usr_std_003';

  memoryDb.users = [
    {
      _id: adminId,
      name: 'Admin User',
      email: 'admin@legalease.ai',
      password: hashedPassword,
      role: 'admin',
      subscription: 'enterprise',
      company: 'LegalEase Team',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      status: 'active',
      createdAt: new Date('2026-01-01').toISOString()
    },
    {
      _id: premiumId,
      name: 'Legal Counsel',
      email: 'premium@legalease.ai',
      password: hashedPassword,
      role: 'premium',
      subscription: 'pro',
      company: 'Advisory Legal Group',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
      status: 'active',
      createdAt: new Date('2026-01-10').toISOString()
    },
    {
      _id: standardId,
      name: 'Demo User',
      email: 'user@legalease.ai',
      password: hashedPassword,
      role: 'user',
      subscription: 'free',
      company: 'Enterprise Legal',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      status: 'active',
      createdAt: new Date('2026-01-15').toISOString()
    }
  ];

  const doc1Id = 'doc_saas_001';
  const doc2Id = 'doc_nda_002';
  const doc3Id = 'doc_emp_v1_003';
  const doc4Id = 'doc_emp_v2_004';

  memoryDb.documents = [
    {
      _id: doc1Id,
      userId: standardId,
      title: 'Standard SaaS Master Services Agreement',
      fileName: 'SaaS_Master_Services_Agreement.pdf',
      fileType: 'application/pdf',
      fileSize: 248500,
      fileUrl: '/uploads/sample_saas_msa.pdf',
      status: 'completed',
      extractedText: SAMPLE_SAAS_MSA,
      tags: ['SaaS', 'Vendor', 'High-Risk'],
      isArchived: false,
      overallRiskScore: 78,
      riskLevel: 'high',
      analysis: {
        parties: ['Service Provider Inc. (Provider)', 'Enterprise Customer LLC (Customer)'],
        contractType: 'Master Services Agreement (Software as a Service)',
        effectiveDate: '2026-01-15',
        expiryDate: '2028-01-15',
        executiveSummary: 'This Agreement binds Customer to a 24-month SaaS subscription. It features aggressive terms including an automatic 10% fee hike on auto-renewal, 100% early termination fee liability, strict Net 45 payment terms with 1.5% monthly late interest, and asymmetric indemnification favoring the Provider.',
        plainEnglish: 'In simple terms: You are committed for at least 2 full years. If you want to cancel, you MUST give written notice at least 60 days before the contract ends, or it automatically renews for another year with a 10% price bump. If you break the contract early for any reason, you owe 100% of all remaining payments immediately.',
        risks: [
          {
            id: 'r1',
            level: 'high',
            category: 'Termination & Liquidated Damages',
            title: '100% Accelerated Early Termination Penalty',
            clauseRef: 'Section 4 (Termination and Early Termination Penalty)',
            explanation: 'Terminating for convenience or without cause requires paying 100% of all remaining unpaid contract fees through the entire 24-month term.',
            recommendation: 'Negotiate early termination for convenience subject only to a reasonable 30-day notice and payment for services rendered, or cap termination fees to 2 months of standard fees.'
          },
          {
            id: 'r2',
            level: 'high',
            category: 'Indemnification Asymmetry',
            title: 'Unilateral Customer Indemnification Without Reciprocity',
            clauseRef: 'Section 5 (Indemnification and Unilateral Liability)',
            explanation: 'The customer is obligated to defend and indemnify the provider for all third-party claims, while the vendor provides zero IP infringement indemnity.',
            recommendation: 'Demand mutual indemnification ensuring the vendor defends and holds Customer harmless against third-party patent or copyright infringement claims.'
          },
          {
            id: 'r3',
            level: 'medium',
            category: 'Automatic Renewal',
            title: '60-Day Auto-Renewal with 10% Price Increase',
            clauseRef: 'Section 3 (Term and Automatic Renewal)',
            explanation: 'Renews automatically for 12 months with a 10% mandatory price surge unless 60 days prior written notice is given.',
            recommendation: 'Request calendar reminders, reduce notice window to 30 days, and cap annual fee adjustments to US CPI or a maximum of 3%.'
          },
          {
            id: 'r4',
            level: 'medium',
            category: 'Limitation of Liability',
            title: 'Liability Capped at Past 3 Months Fees',
            clauseRef: 'Section 6 (Limitation of Liability)',
            explanation: 'Provider aggregate liability is restricted to fees paid in the prior 3 months, which provides inadequate financial recovery in the event of gross breach or data leakage.',
            recommendation: 'Increase liability cap to 12 months of total fees paid and exclude breaches of confidentiality and data security from the limitation.'
          }
        ],
        clauses: [
          {
            name: 'Scope of Services',
            section: 'Section 1',
            summary: 'Grants non-exclusive, non-transferable access to cloud software.',
            impact: 'Standard commercial SaaS grant.'
          },
          {
            name: 'Payment Terms',
            section: 'Section 2',
            summary: 'Net 45 payment terms; 1.5% monthly late interest penalty.',
            impact: 'Requires timely accounting processing to avoid penalty charges.'
          },
          {
            name: 'Automatic Renewal',
            section: 'Section 3',
            summary: '24-month initial term, auto-renews for 12-month periods with 10% fee hike unless cancelled 60 days before expiration.',
            impact: 'Operational lock-in risk.'
          },
          {
            name: 'Early Termination Penalty',
            section: 'Section 4',
            summary: '100% of remaining contract fees due upon early termination without cause.',
            impact: 'Severe financial liability.'
          },
          {
            name: 'Indemnification',
            section: 'Section 5',
            summary: 'Customer indemnifies Provider; no vendor IP indemnity.',
            impact: 'Substantial legal exposure.'
          },
          {
            name: 'Data Privacy & Security',
            section: 'Section 7',
            summary: 'Standard administrative safeguards; 5 business days security breach notice.',
            impact: 'Moderate breach notification latency.'
          }
        ],
        obligations: [
          {
            party: 'Enterprise Customer LLC (Customer)',
            obligation: 'Pay all invoices within Net 45 days of issuance.',
            type: 'Financial'
          },
          {
            party: 'Enterprise Customer LLC (Customer)',
            obligation: 'Provide written non-renewal notice at least 60 days prior to expiration to prevent automatic renewal.',
            type: 'Operational'
          },
          {
            party: 'Service Provider Inc. (Provider)',
            obligation: 'Provide cloud subscription services with reasonable administrative safeguards.',
            type: 'Service Delivery'
          },
          {
            party: 'Service Provider Inc. (Provider)',
            obligation: 'Notify Customer of verified security breaches within 5 business days.',
            type: 'Compliance'
          }
        ],
        deadlines: [
          {
            date: '2026-03-01',
            title: 'Initial Net 45 Invoice Payment Due',
            category: 'Payment',
            urgency: 'Medium',
            description: 'First annual advance subscription payment due within 45 days.'
          },
          {
            date: '2027-11-16',
            title: '60-Day Non-Renewal Notice Deadline',
            category: 'Renewal Notice',
            urgency: 'High',
            description: 'Last date to submit formal written notice of non-renewal to prevent automatic 12-month extension with 10% price increase.'
          },
          {
            date: '2028-01-15',
            title: 'Initial Contract Expiration Date',
            category: 'Expiration',
            urgency: 'Low',
            description: 'Conclusion of original 24-month contract term.'
          }
        ],
        paymentTerms: 'Annual in advance; Net 45 days from invoice date. 1.5% monthly late interest penalty on overdue balances.',
        renewalConditions: 'Auto-renews for 12 months with 10% fee hike unless written notice of non-renewal is provided at least 60 days prior to term end.',
        complianceRequirements: 'Delaware state law governed; binding arbitration in Wilmington, DE; reasonable technical and administrative data safeguards with 5-day breach reporting.'
      },
      createdAt: new Date('2026-01-16').toISOString()
    },
    {
      _id: doc2Id,
      userId: standardId,
      title: 'Standard Mutual Non-Disclosure Agreement',
      fileName: 'Mutual_Non_Disclosure_Agreement.pdf',
      fileType: 'application/pdf',
      fileSize: 112300,
      fileUrl: '/uploads/sample_mutual_nda.pdf',
      status: 'completed',
      extractedText: SAMPLE_MUTUAL_NDA,
      tags: ['NDA', 'Confidentiality', 'Low-Risk'],
      isArchived: false,
      overallRiskScore: 22,
      riskLevel: 'low',
      analysis: {
        parties: ['Disclosing Party Inc.', 'Receiving Party Ltd.'],
        contractType: 'Mutual Non-Disclosure Agreement (MNDA)',
        effectiveDate: '2026-03-01',
        expiryDate: '2028-03-01',
        executiveSummary: 'A standard, balanced bilateral non-disclosure agreement to facilitate joint venture discussions. Features standard exclusions, a 2-year contract duration, and a 3-year survival period for trade secret and confidential data protections.',
        plainEnglish: 'Both parties agree to keep each other’s business and technical secrets confidential for 2 years, with protection surviving 3 years after the deal concludes. If requested, documents must be returned or destroyed within 10 days. Standard exceptions apply (e.g., publicly known data).',
        risks: [
          {
            id: 'r_nda_1',
            level: 'low',
            category: 'Survival Duration',
            title: '3-Year Post-Termination Confidentiality Survival',
            clauseRef: 'Section 5 (Term and Return of Materials)',
            explanation: 'Confidentiality obligations extend for three full years after the agreement expires.',
            recommendation: 'Ensure internal compliance systems maintain tracking for proprietary materials during the 3-year survival window.'
          },
          {
            id: 'r_nda_2',
            level: 'low',
            category: 'Material Destruction',
            title: '10-Day Turnaround for Written Certification of Destruction',
            clauseRef: 'Section 5',
            explanation: 'Upon written notice, all tangible confidential materials must be returned or wiped within 10 business days.',
            recommendation: 'Verify IT security can purge local backups and certify compliance within 10 business days.'
          }
        ],
        clauses: [
          {
            name: 'Confidentiality Scope',
            section: 'Section 2 & 3',
            summary: 'Defines proprietary information and mandates equal degree of care.',
            impact: 'Standard commercial terms.'
          },
          {
            name: 'Exclusions',
            section: 'Section 4',
            summary: 'Standard exceptions for public knowledge, prior knowledge, and third-party receipt.',
            impact: 'Fair and reciprocal.'
          },
          {
            name: 'Term & Return',
            section: 'Section 5',
            summary: '2-year term with 3-year survival; 10 business days return/destroy requirement.',
            impact: 'Manageable compliance timeframe.'
          }
        ],
        obligations: [
          {
            party: 'Both Parties',
            obligation: 'Protect confidential information with at least the same degree of care as own proprietary data.',
            type: 'Confidentiality'
          },
          {
            party: 'Both Parties',
            obligation: 'Return or destroy all materials and submit written certification within 10 business days of request.',
            type: 'Operational'
          }
        ],
        deadlines: [
          {
            date: '2028-03-01',
            title: 'MNDA Initial Term Expiration',
            category: 'Expiration',
            urgency: 'Low',
            description: 'Two-year collaboration agreement expires; 3-year survival period begins.'
          },
          {
            date: '2031-03-01',
            title: 'Survival Period Conclusion',
            category: 'Obligation End',
            urgency: 'Low',
            description: 'Three-year post-termination confidentiality obligations expire.'
          }
        ],
        paymentTerms: 'No monetary exchange stipulated under this confidentiality agreement.',
        renewalConditions: 'Expires after 2 years; renegotiation required for extension.',
        complianceRequirements: 'Injunctive relief permitted without proving special damages; strict destruction certification required.'
      },
      createdAt: new Date('2026-03-02').toISOString()
    },
    {
      _id: doc3Id,
      userId: standardId,
      title: 'Zenith Fintech Executive Employment Agreement (v1.0)',
      fileName: 'Zenith_Employment_v1.docx',
      fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      fileSize: 84000,
      fileUrl: '/uploads/sample_employment_v1.docx',
      status: 'completed',
      extractedText: SAMPLE_EMPLOYMENT_V1,
      tags: ['Employment', 'Baseline'],
      isArchived: false,
      overallRiskScore: 35,
      riskLevel: 'medium',
      analysis: {
        parties: ['Zenith Fintech Inc. (Company)', 'Jane Doe (Executive)'],
        contractType: 'Executive Employment Agreement (Original Baseline)',
        effectiveDate: '2025-02-10',
        expiryDate: 'Indefinite / At-Will',
        executiveSummary: 'Original employment contract for Jane Doe as VP of Engineering at $210,000 base salary, 20% bonus target, 20 PTO days, 30 days termination notice, and 2 months severance pay under California governing law.',
        plainEnglish: 'Employment contract offering $210k salary, standard benefits, and 2 months severance if terminated without cause. Governed by California law.',
        risks: [
          {
            id: 'r_v1_1',
            level: 'medium',
            category: 'Severance',
            title: 'Limited 2-Month Severance Window',
            clauseRef: 'Section 4',
            explanation: 'Severance is capped at only 2 months of base salary.',
            recommendation: 'Seek 6 months severance for an executive role.'
          }
        ],
        clauses: [
          { name: 'Compensation', section: 'Section 2', summary: '$210k base salary, 20% bonus.', impact: 'Competitive' },
          { name: 'Termination & Severance', section: 'Section 4', summary: '30 days notice, 2 months severance.', impact: 'Basic' },
          { name: 'Non-Solicitation', section: 'Section 5', summary: '12-month employee non-solicitation.', impact: 'Standard' }
        ],
        obligations: [
          { party: 'Company', obligation: 'Pay $210,000 annual base salary in bi-weekly installments.', type: 'Financial' }
        ],
        deadlines: [
          { date: '2026-02-10', title: 'Annual Performance & Bonus Review', category: 'Review', urgency: 'Medium', description: 'Annual review for 20% bonus target eligibility.' }
        ],
        paymentTerms: 'Bi-weekly payroll disbursements subject to standard withholdings.',
        renewalConditions: 'At-will executive employment.',
        complianceRequirements: 'State of California governing law.'
      },
      createdAt: new Date('2025-02-11').toISOString()
    },
    {
      _id: doc4Id,
      userId: standardId,
      title: 'Zenith Fintech Executive Employment Agreement (v2.0 Revised)',
      fileName: 'Zenith_Employment_v2_Revised.docx',
      fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      fileSize: 92000,
      fileUrl: '/uploads/sample_employment_v2.docx',
      status: 'completed',
      extractedText: SAMPLE_EMPLOYMENT_V2,
      tags: ['Employment', 'Promotion', 'Revised'],
      isArchived: false,
      overallRiskScore: 68,
      riskLevel: 'high',
      analysis: {
        parties: ['Zenith Fintech Inc. (Company)', 'Jane Doe (Executive)'],
        contractType: 'Executive Employment Agreement (Revised / Promotion)',
        effectiveDate: '2026-01-20',
        expiryDate: 'Indefinite / At-Will',
        executiveSummary: 'Promotion to Chief Technology Officer with $275,000 base salary, 35% bonus target, 50k stock options, and 6 months severance. However, introduces aggressive 24-month non-compete clause covering North America & Europe, IP assignment on post-employment inventions, and shifts jurisdiction to New York arbitration.',
        plainEnglish: 'Higher pay ($275k + options + 6 months severance), but introduces strict post-job restrictions: you cannot work for any fintech competitor in North America or Europe for 2 whole years after leaving, and anything you invent within 6 months of leaving belongs to the company.',
        risks: [
          {
            id: 'r_v2_1',
            level: 'high',
            category: 'Non-Compete',
            title: 'Aggressive 24-Month Multi-Continent Non-Compete',
            clauseRef: 'Section 5 (Non-Compete & Non-Solicitation)',
            explanation: 'Prohibits working or consulting for any fintech competitor anywhere in North America or Europe for 24 months post-employment.',
            recommendation: 'Restrict non-compete to direct competitors only, narrow geographical scope, or limit duration to 6 months with paid garden leave.'
          },
          {
            id: 'r_v2_2',
            level: 'high',
            category: 'IP Rights',
            title: 'Post-Employment 6-Month IP Assignment Capture',
            clauseRef: 'Section 6 (Intellectual Property Assignment)',
            explanation: 'Company claims ownership of any inventions created up to six months after leaving.',
            recommendation: 'Remove post-termination assignment; IP assignment must strictly cease on the final day of employment.'
          }
        ],
        clauses: [
          { name: 'Compensation', section: 'Section 2', summary: '$275k base salary, 35% bonus, 50,000 stock options.', impact: 'High Value' },
          { name: 'Severance', section: 'Section 4', summary: '60 days notice, 6 months severance plus 25% option acceleration.', impact: 'Favorable' },
          { name: 'Non-Compete', section: 'Section 5', summary: '24-month non-compete in North America & Europe.', impact: 'Severe Career Risk' },
          { name: 'IP Assignment', section: 'Section 6', summary: 'Assigns inventions during employment + 6 months post-exit.', impact: 'Broad Risk' }
        ],
        obligations: [
          { party: 'Company', obligation: 'Pay $275,000 annual base salary and grant 50k options.', type: 'Financial' },
          { party: 'Executive', obligation: 'Refrain from fintech competitor employment for 24 months post-exit.', type: 'Restrictive Covenant' }
        ],
        deadlines: [
          { date: '2027-01-20', title: 'Stock Option Cliff Vesting (1-Year)', category: 'Equity Vesting', urgency: 'High', description: '25% of 50,000 incentive stock options vest on one-year cliff date.' }
        ],
        paymentTerms: 'Bi-weekly disbursements; annual bonus paid by March 15.',
        renewalConditions: 'At-will executive employment.',
        complianceRequirements: 'Governed by New York law; mandatory confidential arbitration in NYC.'
      },
      createdAt: new Date('2026-01-21').toISOString()
    }
  ];

  // Seed sample comparison between doc3 (v1) and doc4 (v2)
  memoryDb.comparisons = [
    {
      _id: 'cmp_emp_001',
      userId: standardId,
      title: 'Zenith Employment v1.0 vs v2.0 (CTO Promotion)',
      docAId: doc3Id,
      docBId: doc4Id,
      docATitle: 'Zenith Employment Agreement (v1.0)',
      docBTitle: 'Zenith Employment Agreement (v2.0 Revised)',
      summary: 'Comparison of executive employment contract before and after promotion to CTO. Major increases in compensation ($210k -> $275k), bonus (20% -> 35%), and severance (2 months -> 6 months + option acceleration). However, v2 introduces severe new legal burdens: a 24-month multi-continent non-compete, post-employment 6-month IP assignment, and shifting legal venue from California to New York binding arbitration.',
      keyMetrics: {
        clausesAdded: 2,
        clausesRemoved: 0,
        clausesModified: 5,
        riskScoreShift: '+33 (Elevated from Medium to High Risk)'
      },
      differences: [
        {
          category: 'Compensation & Equity',
          type: 'modified',
          impact: 'positive',
          title: 'Base Salary, Bonus Target & Stock Options Increased',
          docAText: 'Base salary of $210,000 per annum; 20% bonus target.',
          docBText: 'Base salary increased to $275,000 per annum; 35% bonus target; 50,000 stock options with 4-year vesting and 1-year cliff.',
          analysis: 'Net annual compensation increase of $65,000 + equity grant.'
        },
        {
          category: 'Termination & Severance',
          type: 'modified',
          impact: 'positive',
          title: 'Severance Multiplied and Notice Period Doubled',
          docAText: '30 days notice; 2 months base salary severance.',
          docBText: '60 days notice; 6 months base salary severance + 25% unvested options accelerated.',
          analysis: 'Tripled severance duration provides significantly greater financial safety.'
        },
        {
          category: 'Restrictive Covenants',
          type: 'added',
          impact: 'critical_risk',
          title: 'New 24-Month Non-Compete Clause Across North America & Europe',
          docAText: 'None (only standard 12-month employee non-solicitation).',
          docBText: 'During employment and for 24 months thereafter, Executive shall not engage in, advise, invest in, or work for any direct competitor in fintech or high-frequency trading within North America and Europe.',
          analysis: 'Extremely restrictive covenant that severely limits post-employment career options. Under NY law this may be enforceable.'
        },
        {
          category: 'Intellectual Property',
          type: 'added',
          impact: 'high_risk',
          title: 'Invention Assignment Extended 6 Months Beyond Termination',
          docAText: 'Standard IP terms during employment.',
          docBText: 'Executive assigns all inventions, patents, designs, and proprietary concepts developed during employment or within six (6) months after termination.',
          analysis: 'High risk: Any project or company started within 6 months of departure could be claimed by Zenith Fintech.'
        },
        {
          category: 'Governing Law & Jurisdiction',
          type: 'modified',
          impact: 'medium_risk',
          title: 'Shift from California Law to New York Mandatory Arbitration',
          docAText: 'Governed by the laws of California (where non-competes are generally void).',
          docBText: 'Governed by New York law; mandatory confidential arbitration under AAA rules in NYC.',
          analysis: 'Deliberate change in jurisdiction makes the restrictive non-compete covenant far more enforceable than under California law.'
        }
      ],
      createdAt: new Date('2026-01-22').toISOString()
    }
  ];

  // Seed sample chat messages
  memoryDb.chats = [
    {
      _id: 'chat_saas_001',
      userId: standardId,
      documentId: doc1Id,
      messages: [
        {
          id: 'm1',
          role: 'user',
          content: 'What happens if we want to cancel this agreement early?',
          timestamp: new Date('2026-01-16T10:15:00').toISOString()
        },
        {
          id: 'm2',
          role: 'assistant',
          content: 'According to **Section 4 (Termination and Early Termination Penalty)**, if you terminate for convenience or without cause prior to the end of the initial 24-month term, you must **immediately pay 100% of all remaining fees** that would have been payable through the end of the term.\n\nTo cancel without penalty, you must either:\n1. Prove the Provider materially breached the contract and failed to cure it within 30 days of written notice, or\n2. Provide formal written notice of non-renewal at least **60 days prior** to the expiration of the 24-month term (Section 3).',
          citations: ['Section 3 (Term and Automatic Renewal)', 'Section 4 (Termination and Early Termination Penalty)'],
          timestamp: new Date('2026-01-16T10:15:04').toISOString()
        },
        {
          id: 'm3',
          role: 'user',
          content: 'Are there hidden price increases or fees?',
          timestamp: new Date('2026-01-16T10:16:00').toISOString()
        },
        {
          id: 'm4',
          role: 'assistant',
          content: 'Yes, there are two key financial escalations to be cautious of:\n\n1. **10% Auto-Renewal Price Hike**: Under **Section 3**, if you do not opt out at least 60 days in advance, the agreement automatically extends for another 12 months at a **10% fee increase** over the prior year.\n2. **1.5% Monthly Late Interest**: Under **Section 2**, any invoice unpaid after 45 days incurs interest at **1.5% per month** (18% annualized) or the statutory maximum.',
          citations: ['Section 2 (Fees and Payment Terms)', 'Section 3 (Term and Automatic Renewal)'],
          timestamp: new Date('2026-01-16T10:16:05').toISOString()
        }
      ]
    }
  ];

  memoryDb.notifications = [
    {
      _id: 'notif_001',
      userId: standardId,
      title: 'High Risk Alert: Unilateral Indemnification',
      message: 'SaaS MSA contains a one-sided indemnification clause (Section 5).',
      type: 'warning',
      read: false,
      createdAt: new Date('2026-01-16T11:00:00').toISOString()
    },
    {
      _id: 'notif_002',
      userId: standardId,
      title: 'Upcoming Renewal Notice Window',
      message: 'Notice deadline for SaaS MSA contract is 60 days before Jan 15, 2028.',
      type: 'deadline',
      read: false,
      createdAt: new Date('2026-01-16T11:05:00').toISOString()
    },
    {
      _id: 'notif_003',
      userId: standardId,
      title: 'Welcome to LegalEase AI',
      message: 'Your workspace is pre-loaded with sample contracts for instant analysis.',
      type: 'info',
      read: true,
      createdAt: new Date('2026-01-15T09:00:00').toISOString()
    }
  ];

  saveDb();
};

const saveDb = () => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(memoryDb, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving local store:', err.message);
  }
};

const loadDb = () => {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      memoryDb = JSON.parse(data);
    } else {
      initializeSeedData();
    }
  } catch (err) {
    console.error('Error loading local store, reinitializing:', err.message);
    initializeSeedData();
  }
};

// Initialize
loadDb();

// Local Store Data Access Methods
const localStore = {
  // Users
  findUserByEmail: (email) => {
    return memoryDb.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  },
  findUserById: (id) => {
    return memoryDb.users.find(u => u._id === id);
  },
  createUser: (userData) => {
    const newUser = {
      _id: 'usr_' + uuidv4().substring(0, 8),
      role: 'user',
      subscription: 'free',
      status: 'active',
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
      createdAt: new Date().toISOString(),
      ...userData
    };
    memoryDb.users.push(newUser);
    saveDb();
    return newUser;
  },
  getAllUsers: () => {
    return memoryDb.users.map(({ password, ...u }) => u);
  },
  updateUser: (id, updates) => {
    const idx = memoryDb.users.findIndex(u => u._id === id);
    if (idx === -1) return null;
    memoryDb.users[idx] = { ...memoryDb.users[idx], ...updates, updatedAt: new Date().toISOString() };
    saveDb();
    const { password, ...safeUser } = memoryDb.users[idx];
    return safeUser;
  },

  // Documents
  getDocumentsByUser: (userId, { search, filterRisk, isArchived } = {}) => {
    let docs = memoryDb.documents.filter(d => d.userId === userId);
    if (isArchived !== undefined) {
      docs = docs.filter(d => d.isArchived === Boolean(isArchived));
    }
    if (filterRisk && filterRisk !== 'all') {
      docs = docs.filter(d => d.riskLevel === filterRisk.toLowerCase());
    }
    if (search && search.trim()) {
      const q = search.toLowerCase();
      docs = docs.filter(d => 
        d.title.toLowerCase().includes(q) || 
        d.fileName.toLowerCase().includes(q) ||
        (d.analysis && d.analysis.contractType && d.analysis.contractType.toLowerCase().includes(q))
      );
    }
    return docs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  getDocumentById: (id, userId = null) => {
    return memoryDb.documents.find(d => d._id === id && (!userId || d.userId === userId));
  },
  createDocument: (docData) => {
    const newDoc = {
      _id: 'doc_' + uuidv4().substring(0, 8),
      status: 'completed',
      isArchived: false,
      tags: [],
      createdAt: new Date().toISOString(),
      ...docData
    };
    memoryDb.documents.unshift(newDoc);
    saveDb();
    return newDoc;
  },
  updateDocument: (id, updates) => {
    const idx = memoryDb.documents.findIndex(d => d._id === id);
    if (idx === -1) return null;
    memoryDb.documents[idx] = { ...memoryDb.documents[idx], ...updates, updatedAt: new Date().toISOString() };
    saveDb();
    return memoryDb.documents[idx];
  },
  deleteDocument: (id, userId) => {
    const idx = memoryDb.documents.findIndex(d => d._id === id && d.userId === userId);
    if (idx === -1) return false;
    memoryDb.documents.splice(idx, 1);
    saveDb();
    return true;
  },
  getAllDocumentsAdmin: () => {
    return memoryDb.documents;
  },

  // Comparisons
  getComparisonsByUser: (userId) => {
    return memoryDb.comparisons.filter(c => c.userId === userId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  getComparisonById: (id, userId = null) => {
    return memoryDb.comparisons.find(c => c._id === id && (!userId || c.userId === userId));
  },
  createComparison: (cmpData) => {
    const newCmp = {
      _id: 'cmp_' + uuidv4().substring(0, 8),
      createdAt: new Date().toISOString(),
      ...cmpData
    };
    memoryDb.comparisons.unshift(newCmp);
    saveDb();
    return newCmp;
  },

  // Chat
  getChatByDocId: (documentId, userId) => {
    let chat = memoryDb.chats.find(c => c.documentId === documentId && c.userId === userId);
    if (!chat) {
      chat = {
        _id: 'chat_' + uuidv4().substring(0, 8),
        userId,
        documentId,
        messages: []
      };
      memoryDb.chats.push(chat);
      saveDb();
    }
    return chat;
  },
  addChatMessage: (documentId, userId, message) => {
    const chat = localStore.getChatByDocId(documentId, userId);
    chat.messages.push({
      id: 'msg_' + uuidv4().substring(0, 8),
      timestamp: new Date().toISOString(),
      ...message
    });
    saveDb();
    return chat;
  },
  clearChat: (documentId, userId) => {
    const chat = localStore.getChatByDocId(documentId, userId);
    chat.messages = [];
    saveDb();
    return chat;
  },

  // Notifications
  getNotificationsByUser: (userId) => {
    return memoryDb.notifications.filter(n => n.userId === userId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  markNotificationRead: (id, userId) => {
    const notif = memoryDb.notifications.find(n => n._id === id && n.userId === userId);
    if (notif) {
      notif.read = true;
      saveDb();
    }
    return notif;
  },
  createNotification: (userId, { title, message, type = 'info' }) => {
    const newNotif = {
      _id: 'notif_' + uuidv4().substring(0, 8),
      userId,
      title,
      message,
      type,
      read: false,
      createdAt: new Date().toISOString()
    };
    memoryDb.notifications.unshift(newNotif);
    saveDb();
    return newNotif;
  },

  // Stats
  getPlatformStats: () => {
    const totalUsers = memoryDb.users.length;
    const totalDocuments = memoryDb.documents.length;
    const highRiskDocs = memoryDb.documents.filter(d => d.riskLevel === 'high').length;
    const mediumRiskDocs = memoryDb.documents.filter(d => d.riskLevel === 'medium').length;
    const lowRiskDocs = memoryDb.documents.filter(d => d.riskLevel === 'low').length;
    const totalComparisons = memoryDb.comparisons.length;
    const totalChats = memoryDb.chats.reduce((acc, c) => acc + (c.messages ? c.messages.length : 0), 0);

    return {
      totalUsers,
      totalDocuments,
      highRiskDocs,
      mediumRiskDocs,
      lowRiskDocs,
      totalComparisons,
      totalChats,
      apiCallsToday: 342,
      activeSubscribers: memoryDb.users.filter(u => u.subscription !== 'free').length
    };
  }
};

module.exports = localStore;
