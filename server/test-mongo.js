// server/test-mongo.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('❌ MONGODB_URI is not set');
  process.exit(1);
}

console.log('Trying to connect to Mongo with URI:', uri.replace(/:(.*?)@/, ':<password>@'));

mongoose.set('strictQuery', true);

mongoose
  .connect(uri)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas (test script)');
    return mongoose.disconnect();
  })
  .then(() => {
    console.log('✅ Disconnected cleanly');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Test connection failed:', err);
    process.exit(1);
  });
