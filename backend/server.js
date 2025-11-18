// backend/server.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' })); // built-in body parser (supports large base64 images)

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    // connectDB should read MONGO_URI internally (see note below)
    await connectDB();
    app.use('/api/auth', require('./routes/auth'));
    // register routes AFTER successful DB connection
    app.use('/api/projects', require('./routes/projects'));
    app.use('/api/clients', require('./routes/clients'));
    app.use('/api/contacts', require('./routes/contacts'));
    app.use('/api/subscribers', require('./routes/subscribers'));

    const server = app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });

    // graceful shutdown
    const shutdown = async (signal) => {
      console.log(`\n⚠️  Received ${signal}. Shutting down gracefully...`);
      server.close(() => {
        console.log('HTTP server closed.');
        // optionally close DB connection here:
        // const mongoose = require('mongoose'); mongoose.disconnect();
        process.exit(0);
      });

      // force exit after 10s
      setTimeout(() => {
        console.error('Forcing shutdown.');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));

  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

start();
