/*
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
*/

require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

async function run() {
  const [email, password, name] = process.argv.slice(2);

  if (!email || !password) {
    console.log('Usage: node src/scripts/create-admin.js <email> <password> "<name>"');
    process.exit(1);
  }

  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('❌ Missing MONGO_URI. Create server/.env with MONGO_URI=...');
    process.exit(1);
  }

  await mongoose.connect(uri);

  const existing = await User.findOne({ email });
  if (existing) {
    console.log('✅ User already exists:', email);
    await mongoose.disconnect();
    process.exit(0);
  }

  const hash = await bcrypt.hash(password, 10);

  await User.create({
    email,
    passwordHash: hash,
    name: name || 'Admin',
    role: 'admin'
  });

  console.log('✅ Admin created:', email);

  await mongoose.disconnect();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
