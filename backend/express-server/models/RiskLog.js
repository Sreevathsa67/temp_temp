// /backend/express-server/models/RiskLog.js
const mongoose = require('mongoose');

const RiskLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  mouseRisk: Number,
  keyboardRisk: Number,
  appRisk: Number,
  finalRisk: Number,
  appsOpened: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('RiskLog', RiskLogSchema);
