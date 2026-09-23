const path = require('path');
const fs = require('fs');
const localStore = require('../data/localStore');
const { extractTextFromFile } = require('../services/extractorService');
const { analyzeDocumentHeuristic } = require('../services/aiService');
const { SAMPLE_SAAS_MSA, SAMPLE_MUTUAL_NDA, SAMPLE_EMPLOYMENT_V1, SAMPLE_EMPLOYMENT_V2 } = require('../samples/sampleContracts');

// @desc    Upload new legal document and trigger AI analysis
// @route   POST /api/documents/upload
const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please select a legal document to upload (PDF, DOCX, or TXT).' });
    }

    const { originalname, mimetype, size, path: filePath, filename } = req.file;
    const documentTitle = req.body.title || originalname.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');

    // 1. Extract text from file
    const extractedText = await extractTextFromFile(filePath, mimetype, originalname);

    // 2. Perform AI Document & Risk Analysis
    const aiResult = analyzeDocumentHeuristic(extractedText, originalname);

    // 3. Save to database / local store
    const newDoc = localStore.createDocument({
      userId: req.user._id,
      title: documentTitle,
      fileName: originalname,
      fileType: mimetype,
      fileSize: size,
      fileUrl: `/uploads/${filename}`,
      status: 'completed',
      extractedText,
      overallRiskScore: aiResult.overallRiskScore,
      riskLevel: aiResult.riskLevel,
      analysis: aiResult.analysis,
      tags: [aiResult.analysis.contractType.split(' ')[0], aiResult.riskLevel.toUpperCase() + '-RISK']
    });

    // 4. Create Notification
    localStore.createNotification(req.user._id, {
      title: 'Analysis Complete',
      message: `"${documentTitle}" analyzed. Overall risk score: ${aiResult.overallRiskScore}/100.`,
      type: aiResult.riskLevel === 'high' ? 'warning' : 'info'
    });

    res.status(201).json({
      success: true,
      document: newDoc,
      message: 'Document uploaded and analyzed successfully.'
    });
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).json({ success: false, message: 'Failed to process and analyze document: ' + err.message });
  }
};

// @desc    Load standard sample contract for 1-click evaluation
// @route   POST /api/documents/sample
const loadSampleContract = async (req, res) => {
  try {
    const { sampleType } = req.body; // 'saas', 'nda', 'emp_v1', 'emp_v2'

    let text = SAMPLE_SAAS_MSA;
    let title = 'CloudScale SaaS Master Services Agreement';
    let fileName = 'CloudScale_SaaS_MSA.pdf';

    if (sampleType === 'nda') {
      text = SAMPLE_MUTUAL_NDA;
      title = 'Horizon & Vanguard Mutual NDA';
      fileName = 'Horizon_Vanguard_NDA.pdf';
    } else if (sampleType === 'emp_v1') {
      text = SAMPLE_EMPLOYMENT_V1;
      title = 'Zenith Fintech Employment Agreement (v1.0)';
      fileName = 'Zenith_Employment_v1.docx';
    } else if (sampleType === 'emp_v2') {
      text = SAMPLE_EMPLOYMENT_V2;
      title = 'Zenith Fintech Employment Agreement (v2.0 Revised)';
      fileName = 'Zenith_Employment_v2_Revised.docx';
    }

    const aiResult = analyzeDocumentHeuristic(text, fileName);

    const doc = localStore.createDocument({
      userId: req.user._id,
      title,
      fileName,
      fileType: 'application/pdf',
      fileSize: 185000,
      fileUrl: '/uploads/' + fileName,
      status: 'completed',
      extractedText: text,
      overallRiskScore: aiResult.overallRiskScore,
      riskLevel: aiResult.riskLevel,
      analysis: aiResult.analysis,
      tags: [aiResult.analysis.contractType.split(' ')[0], 'Sample']
    });

    res.status(201).json({
      success: true,
      document: doc,
      message: `Sample "${title}" loaded and analyzed successfully!`
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get user documents with search and filtering
// @route   GET /api/documents
const getDocuments = async (req, res) => {
  try {
    const { search, risk, archived } = req.query;
    const isArchived = archived === 'true' ? true : archived === 'false' ? false : undefined;

    const documents = localStore.getDocumentsByUser(req.user._id, {
      search,
      filterRisk: risk,
      isArchived
    });

    res.json({
      success: true,
      count: documents.length,
      documents
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get single document details & analysis
// @route   GET /api/documents/:id
const getDocumentById = async (req, res) => {
  try {
    const document = localStore.getDocumentById(req.params.id, req.user.role === 'admin' ? null : req.user._id);

    if (!document) {
      return res.status(404).json({ success: false, message: 'Document not found.' });
    }

    res.json({ success: true, document });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Update document (title, archive, tags)
// @route   PATCH /api/documents/:id
const updateDocument = async (req, res) => {
  try {
    const { title, isArchived, tags } = req.body;
    const doc = localStore.getDocumentById(req.params.id, req.user._id);

    if (!doc) {
      return res.status(404).json({ success: false, message: 'Document not found.' });
    }

    const updates = {};
    if (title !== undefined) updates.title = title;
    if (isArchived !== undefined) updates.isArchived = isArchived;
    if (tags !== undefined) updates.tags = tags;

    const updated = localStore.updateDocument(doc._id, updates);
    res.json({ success: true, document: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Delete document
// @route   DELETE /api/documents/:id
const deleteDocument = async (req, res) => {
  try {
    const success = localStore.deleteDocument(req.params.id, req.user._id);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Document not found or permission denied.' });
    }
    res.json({ success: true, message: 'Document deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Generate downloadable legal executive summary & risk report
// @route   GET /api/documents/:id/download-report
const downloadReport = async (req, res) => {
  try {
    const doc = localStore.getDocumentById(req.params.id, req.user.role === 'admin' ? null : req.user._id);
    if (!doc) {
      return res.status(404).json({ success: false, message: 'Document not found.' });
    }

    const analysis = doc.analysis || {};
    const reportContent = `================================================================================
LEGALEASE AI - LEGAL INTELLIGENCE AUDIT REPORT
Document: ${doc.title}
Generated: ${new Date().toISOString()}
Risk Score: ${doc.overallRiskScore}/100 [Level: ${(doc.riskLevel || 'N/A').toUpperCase()}]
Contract Type: ${analysis.contractType || 'N/A'}
Parties Involved: ${(analysis.parties || []).join(' and ')}
================================================================================

1. EXECUTIVE SUMMARY
${analysis.executiveSummary || 'No summary available.'}

--------------------------------------------------------------------------------
2. PLAIN-ENGLISH TRANSLATION
${analysis.plainEnglish || 'No plain english translation available.'}

--------------------------------------------------------------------------------
3. IDENTIFIED RISKS & MITIGATION RECOMMENDATIONS (${(analysis.risks || []).length} Detected)
${(analysis.risks || []).map((r, i) => `
[${r.level.toUpperCase()} RISK] #${i + 1}: ${r.title}
Category: ${r.category}
Clause Reference: ${r.clauseRef}
Impact / Explanation: ${r.explanation}
Recommended Action: ${r.recommendation}
`).join('\n')}

--------------------------------------------------------------------------------
4. KEY CONTRACTUAL OBLIGATIONS
${(analysis.obligations || []).map(o => `* [${o.type}] ${o.party}: ${o.obligation}`).join('\n')}

--------------------------------------------------------------------------------
5. CRITICAL DEADLINES & MILESTONES
${(analysis.deadlines || []).map(d => `* [${d.date}] ${d.title} (Urgency: ${d.urgency}): ${d.description}`).join('\n')}

--------------------------------------------------------------------------------
6. FINANCIAL & RENEWAL CONDITIONS
* Payment Terms: ${analysis.paymentTerms || 'Standard'}
* Renewal Terms: ${analysis.renewalConditions || 'Standard'}
* Compliance: ${analysis.complianceRequirements || 'Standard'}

================================================================================
CONFIDENTIAL - Prepared by LegalEase AI Enterprise Platform
================================================================================`;

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', `attachment; filename="${doc.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_audit_report.txt"`);
    res.send(reportContent);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get all upcoming contract deadlines and obligations across user documents
// @route   GET /api/documents/timeline/all
const getAllDeadlines = async (req, res) => {
  try {
    const docs = localStore.getDocumentsByUser(req.user._id, { isArchived: false });
    const timeline = [];

    docs.forEach(doc => {
      if (doc.analysis && Array.isArray(doc.analysis.deadlines)) {
        doc.analysis.deadlines.forEach(dl => {
          timeline.push({
            ...dl,
            documentId: doc._id,
            documentTitle: doc.title,
            riskLevel: doc.riskLevel
          });
        });
      }
    });

    timeline.sort((a, b) => new Date(a.date) - new Date(b.date));

    res.json({
      success: true,
      count: timeline.length,
      timeline
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  uploadDocument,
  loadSampleContract,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
  downloadReport,
  getAllDeadlines
};
