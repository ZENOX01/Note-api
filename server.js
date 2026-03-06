require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');
const noteRoutes = require('./routes/noteRoutes');
const authRoutes = require('./routes/auth.routes');
const { apiLimiter, authLimiter } = require('./middleware/rateLimiter');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/notes", apiLimiter);
app.use("/auth", authLimiter);

// Log incoming requests for debugging
app.use((req, res, next) => {
  console.log('Incoming:', req.method, req.path);
  next();
});

// Serve Frontend static files
app.use(express.static(path.join(__dirname, 'Frontend')));

app.use('/notes', noteRoutes);
app.use('/auth', authRoutes);

// Fallback to index.html for any other routes (important for SPA-like behavior)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'Frontend', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});