require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

async function run() {
  const email = (process.argv[2] || '').toLowerCase().trim();
  const password = process.argv[3] || '';
  const name = process.argv[4] || 'Admin';

  if (!email || !password) {
    console.log('Usage: node src/scripts/create-admin.js email password "Name"');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);

  const existing = await User.findOne({ email });
  if (existing) {
    console.log('User already exists:', email);
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await User.create({ email, passwordHash, name });

  console.log('✅ Admin created:', email);
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
