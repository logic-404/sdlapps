const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name:       { type: String, required: true },
    email:      { type: String, required: true, unique: true, index: true },
    password:   { type: String, required: true },
    university: { type: String },
    address:    { type: String },
    // Admin is a special user; we’ll seed one via ensureAdmin()
    role:       { type: String, enum: ['student', 'admin'], default: 'student' }
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);
