const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema(
  {
    // NOTE: Candidates are NOT users; they’re admin-created records
    name:   { type: String, required: true },
    agenda: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Candidate', candidateSchema);
