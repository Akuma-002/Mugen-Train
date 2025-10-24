const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.ADMIN_PORT || 5001; // fallback port

app.use(cors());
app.use(express.json());
const trainRoutes = require('./routes/trainRoutes');
app.use('/api/trains', trainRoutes);

const startServer = async () => {
  try {
    if (!process.env.TRAIN_URL) {
      console.error('❌ TRAIN_URL is not set in environment. Please set TRAIN_URL and restart.');
      process.exit(1);
    }

    console.log('Attempting MongoDB connection...');

    // Recommended options for mongoose connect (compatible across versions)
    await mongoose.connect(process.env.TRAIN_URL, {
      serverSelectionTimeoutMS: 30000,
      // useNewUrlParser: true, // legacy options not required in modern mongoose
      // useUnifiedTopology: true,
    });

    console.log('✅ Connected to train database');

    const server = app.listen(PORT, () => {
      console.log(`🚀 Admin server running on port ${PORT}`);
    });

    // Graceful shutdown
    const shutdown = async (signal) => {
      console.log(`\nReceived ${signal}. Shutting down gracefully...`);
      server.close(() => {
        console.log('HTTP server closed.');
      });
      try {
        await mongoose.disconnect();
        console.log('MongoDB disconnected.');
        process.exit(0);
      } catch (err) {
        console.error('Error during shutdown', err);
        process.exit(1);
      }
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
  } catch (error) {
    console.error('❌ Error starting admin server:', error);
    process.exit(1);
  }
};

startServer();
