require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const documentRoutes = require('./routes/documentRoutes');
const comparisonRoutes = require('./routes/comparisonRoutes');
const chatRoutes = require('./routes/chatRoutes');
const adminRoutes = require('./routes/adminRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middlewares
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1 || origin.startsWith('http://localhost')) {
      callback(null, true);
    } else {
      callback(null, true); // Permissive in dev/preview
    }
  },
  credentials: true
}));

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Rate Limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests from this IP, please try again after 15 minutes.' }
});
app.use('/api', apiLimiter);

// Serve uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

const { connectDB, getIsConnected } = require('./config/db');

// Connect to MongoDB Atlas if URI configured
connectDB();

// Health Check Endpoint
const healthHandler = (req, res) => {
  res.json({
    status: 'healthy',
    platform: 'LegalEase AI Document Intelligence API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    database: getIsConnected() ? 'MongoDB Atlas (Connected)' : 'Local Zero-Config Persistent Store',
    aiEngine: process.env.OPENAI_API_KEY ? 'OpenAI Hybrid' : 'Built-in Neural Legal NLP'
  });
};
app.get('/api/health', healthHandler);
app.get('/health', healthHandler);

// Mount Routes (supports both /api/* and /*)
app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);

app.use('/api/documents', documentRoutes);
app.use('/documents', documentRoutes);

app.use('/api/comparisons', comparisonRoutes);
app.use('/comparisons', comparisonRoutes);

app.use('/api/chat', chatRoutes);
app.use('/chat', chatRoutes);

app.use('/api/admin', adminRoutes);
app.use('/admin', adminRoutes);

app.use('/api/notifications', notificationRoutes);
app.use('/notifications', notificationRoutes);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: `API route '${req.originalUrl}' not found.` });
});

// Central Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`   LegalEase AI Document Intelligence Server Running    `);
  console.log(`   Port: ${PORT} | Environment: ${process.env.NODE_ENV || 'development'} `);
  console.log(`   Health Check: http://localhost:${PORT}/api/health     `);
  console.log(`=======================================================`);
});

module.exports = app;
