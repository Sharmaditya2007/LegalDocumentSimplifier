const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');
const {
  uploadDocument,
  loadSampleContract,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
  downloadReport,
  getAllDeadlines
} = require('../controllers/documentController');

router.use(protect);

router.post('/upload', upload.single('file'), uploadDocument);
router.post('/sample', loadSampleContract);
router.get('/', getDocuments);
router.get('/timeline/all', getAllDeadlines);
router.get('/:id', getDocumentById);
router.patch('/:id', updateDocument);
router.delete('/:id', deleteDocument);
router.get('/:id/download-report', downloadReport);

module.exports = router;
