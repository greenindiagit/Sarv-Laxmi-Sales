import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import cors from 'cors';
import connectDB from './config/db.js';
import corsOptions from './middleware/corsOptions.js';
import errorHandler from './middleware/errorHandler.js';

import contactUsRoutes from './routes/contactUs.js';
import quatationRoutes from './routes/quatations.js';
// app.use('/uploads', express.static(path.join(process.cwd(), 'public/uploads')));
import productAddRoutes from './routes/productAdd.js'

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Middleware
app.use(cors(corsOptions));

// API Routes
app.use('/api', contactUsRoutes);
app.use('/api', quatationRoutes);
app.use('/api', productAddRoutes);

// Serve frontend build
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// React Catch-all Route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

// Global Error Handler
app.use(errorHandler);

// Start server after DB connected
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`📡 Server running at http://localhost:${PORT}`);
  });
});
