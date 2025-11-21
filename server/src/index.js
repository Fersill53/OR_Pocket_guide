// server/src/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const proceduresRouter = require('./routes/procedures.routes');

const app = express();

// Basic middleware
app.use(cors({
  origin: [
    'http://localhost:4200',                 // Angular dev
    'https://fersill53.github.io'           // GitHub Pages
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(morgan('dev'));
app.use(express.json());

// Simple health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'OR Pocket Guide API is running' });
});

// Procedures routes under /api/procedures
app.use('/api/procedures', proceduresRouter);

// MongoDB connection
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not set in .env');
  process.exit(1);
}

mongoose.set('strictQuery', true);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB', err);
    process.exit(1);
  });
