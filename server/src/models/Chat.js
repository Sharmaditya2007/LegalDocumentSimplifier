const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
  id: String,
  role: {
    type: String,
    enum: ['user', 'assistant', 'system'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  citations: [String],
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

const ChatSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  documentId: {
    type: String,
    required: true,
    index: true
  },
  messages: [ChatMessageSchema]
}, {
  timestamps: true
});

module.exports = mongoose.models.Chat || mongoose.model('Chat', ChatSchema);
