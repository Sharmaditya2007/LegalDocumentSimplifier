const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getChatHistory,
  sendMessage,
  clearChat
} = require('../controllers/chatController');

router.use(protect);

router.get('/:documentId', getChatHistory);
router.post('/:documentId', sendMessage);
router.delete('/:documentId', clearChat);

module.exports = router;
