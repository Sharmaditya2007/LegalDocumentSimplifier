const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createComparison,
  getComparisons,
  getComparisonById
} = require('../controllers/comparisonController');

router.use(protect);

router.post('/', createComparison);
router.get('/', getComparisons);
router.get('/:id', getComparisonById);

module.exports = router;
