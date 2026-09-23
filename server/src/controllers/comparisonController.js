const localStore = require('../data/localStore');
const { compareDocumentsHeuristic } = require('../services/aiService');

// @desc    Compare two contracts
// @route   POST /api/comparisons
const createComparison = async (req, res) => {
  try {
    const { docAId, docBId, customTitle } = req.body;

    if (!docAId || !docBId) {
      return res.status(400).json({ success: false, message: 'Please select both Document A and Document B to compare.' });
    }

    if (docAId === docBId) {
      return res.status(400).json({ success: false, message: 'Please select two different documents to compare.' });
    }

    const docA = localStore.getDocumentById(docAId, req.user._id);
    const docB = localStore.getDocumentById(docBId, req.user._id);

    if (!docA || !docB) {
      return res.status(404).json({ success: false, message: 'One or both documents could not be found.' });
    }

    // Run comparison engine
    const comparisonResult = compareDocumentsHeuristic(docA, docB);

    const newComparison = localStore.createComparison({
      userId: req.user._id,
      title: customTitle || comparisonResult.title,
      docAId: docA._id,
      docBId: docB._id,
      docATitle: docA.title,
      docBTitle: docB.title,
      summary: comparisonResult.summary,
      keyMetrics: comparisonResult.keyMetrics,
      differences: comparisonResult.differences
    });

    localStore.createNotification(req.user._id, {
      title: 'Contract Comparison Ready',
      message: `Comparison between "${docA.title}" and "${docB.title}" has been completed.`,
      type: 'info'
    });

    res.status(201).json({
      success: true,
      comparison: newComparison
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get user's contract comparisons
// @route   GET /api/comparisons
const getComparisons = async (req, res) => {
  try {
    const comparisons = localStore.getComparisonsByUser(req.user._id);
    res.json({
      success: true,
      count: comparisons.length,
      comparisons
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get single comparison report
// @route   GET /api/comparisons/:id
const getComparisonById = async (req, res) => {
  try {
    const comparison = localStore.getComparisonById(req.params.id, req.user._id);
    if (!comparison) {
      return res.status(404).json({ success: false, message: 'Comparison report not found.' });
    }
    res.json({
      success: true,
      comparison
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createComparison,
  getComparisons,
  getComparisonById
};
