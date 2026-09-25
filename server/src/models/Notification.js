const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['info', 'warning', 'deadline', 'system'],
    default: 'info'
  },
  read: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);
