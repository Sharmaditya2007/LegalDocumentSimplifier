const localStore = require('../data/localStore');
const { generateChatAnswer } = require('../services/aiService');

// @desc    Get chat conversation for a specific document
// @route   GET /api/chat/:documentId
const getChatHistory = async (req, res) => {
  try {
    const { documentId } = req.params;
    const document = localStore.getDocumentById(documentId, req.user._id);

    if (!document) {
      return res.status(404).json({ success: false, message: 'Document not found.' });
    }

    const chat = localStore.getChatByDocId(documentId, req.user._id);
    res.json({
      success: true,
      chat
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Send question to document AI assistant
// @route   POST /api/chat/:documentId
const sendMessage = async (req, res) => {
  try {
    const { documentId } = req.params;
    const { question } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide a question.' });
    }

    const document = localStore.getDocumentById(documentId, req.user._id);
    if (!document) {
      return res.status(404).json({ success: false, message: 'Document not found.' });
    }

    // Add user message
    localStore.addChatMessage(documentId, req.user._id, {
      role: 'user',
      content: question.trim()
    });

    const currentChat = localStore.getChatByDocId(documentId, req.user._id);

    // Generate AI response strictly grounded in document context
    const aiResponse = await generateChatAnswer(
      question,
      document.extractedText || '',
      document.analysis || {},
      currentChat.messages
    );

    // Save assistant message
    const updatedChat = localStore.addChatMessage(documentId, req.user._id, {
      role: 'assistant',
      content: aiResponse.content,
      citations: aiResponse.citations
    });

    res.json({
      success: true,
      chat: updatedChat,
      latestMessage: updatedChat.messages[updatedChat.messages.length - 1]
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Clear chat history for a document
// @route   DELETE /api/chat/:documentId
const clearChat = async (req, res) => {
  try {
    const { documentId } = req.params;
    const chat = localStore.clearChat(documentId, req.user._id);
    res.json({
      success: true,
      message: 'Chat history cleared.',
      chat
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getChatHistory,
  sendMessage,
  clearChat
};
