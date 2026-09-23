const mongoose = require('mongoose');

const DifferenceSchema = new mongoose.Schema({
  category: String,
  type: {
    type: String,
    enum: ['added', 'removed', 'modified'],
    default: 'modified'
  },
  impact: {
    type: String,
    enum: ['positive', 'medium_risk', 'high_risk', 'critical_risk', 'neutral'],
    default: 'neutral'
  },
  title: String,
  docAText: String,
  docBText: String,
  analysis: String
}, { _id: false });

const ComparisonSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true
  },
  docAId: String,
  docBId: String,
  docATitle: String,
  docBTitle: String,
  summary: String,
  keyMetrics: {
    clausesAdded: Number,
    clausesRemoved: Number,
    clausesModified: Number,
    riskScoreShift: String
  },
  differences: [DifferenceSchema]
}, {
  timestamps: true
});

module.exports = mongoose.models.Comparison || mongoose.model('Comparison', ComparisonSchema);
