const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getAllUsers,
  updateUser,
  getAllDocuments,
  getPlatformAnalytics
} = require('../controllers/adminController');

router.use(protect);
router.use(authorize('admin'));

router.get('/users', getAllUsers);
router.patch('/users/:id', updateUser);
router.get('/documents', getAllDocuments);
router.get('/analytics', getPlatformAnalytics);

module.exports = router;
