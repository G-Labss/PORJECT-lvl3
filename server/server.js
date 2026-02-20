require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connection');
const errorHandler = require('./middleware/errorHandler');
const lessonRoutes = require('./routes/lessonRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/lessons', lessonRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Tennis Coach API is running with MongoDB',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res, next) => {
  const err = new Error(`Route not found - ${req.originalUrl}`);
  err.statusCode = 404;
  next(err);
});

// Error Handler (must be last)
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`🎾 Server running on port ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);

})
