const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema(
  {
    user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    election: { type: mongoose.Schema.Types.ObjectId, ref: 'Election', required: true },
    candidate:{ type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true }
  },
  { timestamps: true }
);

// Enforce: one vote per user per election
voteSchema.index({ user: 1, election: 1 }, { unique: true });

module.exports = mongoose.model('Vote', voteSchema);
