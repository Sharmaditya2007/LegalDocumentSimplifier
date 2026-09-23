const mongoose = require('mongoose');

const RiskItemSchema = new mongoose.Schema({
  id: String,
  level: {
    type: String,
    enum: ['critical', 'high', 'medium', 'low'],
    default: 'low'
  },
  category: String,
  title: String,
  clauseRef: String,
  explanation: String,
  recommendation: String
}, { _id: false });

const ClauseItemSchema = new mongoose.Schema({
  name: String,
  section: String,
  summary: String,
  impact: String
}, { _id: false });

const ObligationItemSchema = new mongoose.Schema({
  party: String,
  obligation: String,
  type: String
}, { _id: false });

const DeadlineItemSchema = new mongoose.Schema({
  date: String,
  title: String,
  category: String,
  urgency: String,
  description: String
}, { _id: false });

const DocumentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  fileName: String,
  fileType: String,
  fileSize: Number,
  fileUrl: String,
  status: {
    type: String,
    enum: ['pending', 'analyzing', 'completed', 'error'],
    default: 'completed'
  },
  extractedText: String,
  overallRiskScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 50
  },
  riskLevel: {
    type: String,
    enum: ['critical', 'high', 'medium', 'low'],
    default: 'medium'
  },
  analysis: {
    parties: [String],
    contractType: String,
    effectiveDate: String,
    expiryDate: String,
    executiveSummary: String,
    plainEnglish: String,
    risks: [RiskItemSchema],
    clauses: [ClauseItemSchema],
    obligations: [ObligationItemSchema],
    deadlines: [DeadlineItemSchema],
    paymentTerms: String,
    renewalConditions: String,
    complianceRequirements: String
  },
  tags: [String],
  isArchived: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.Document || mongoose.model('Document', DocumentSchema);
