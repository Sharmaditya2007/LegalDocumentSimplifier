const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password']
  },
  role: {
    type: String,
    enum: ['user', 'premium', 'admin'],
    default: 'user'
  },
  subscription: {
    type: String,
    enum: ['free', 'pro', 'enterprise'],
    default: 'free'
  },
  company: {
    type: String,
    default: 'Independent Professional'
  },
  avatar: {
    type: String,
    default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  status: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
