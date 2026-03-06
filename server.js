require('dotenv').config();
const express = require('express');
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

// Routes
app.get("/", (req, res) => {
  res.send("Notes API is running...");
});

app.use('/notes', noteRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});