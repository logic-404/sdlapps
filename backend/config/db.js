const mongoose = require('mongoose');
const User = require('../models/User');

async function ensureAdmin() {
  try {
    const email = 'admin@mail.com';
    let admin = await User.findOne({ email });

    if (!admin) {
      admin = new User({
        name: 'Admin',
        email,
        password: process.env.ADMIN_PASSWORD || 'admin', // fallback for local
        role: 'admin'
      });
      await admin.save();
      console.log('Default admin created:', email);
    } else {
      // make sure role is admin even if user existed
      if (admin.role !== 'admin') {
        admin.role = 'admin';
        await admin.save();
      }
      console.log('Admin already exists:', email);
    }
  } catch (err) {
    console.error('ensureAdmin error:', err.message);
  }
}

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
    await ensureAdmin();
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
