import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import cors from 'cors';
import connectDB from './config/db.js';
import corsOptions from './middleware/corsOptions.js';
import errorHandler from './middleware/errorHandler.js';

import contactUsRoutes from './routes/contactUs.js';
import quatationRoutes from './routes/quatations.js';
import productAddRoutes from './routes/productAdd.js'
import usersRoutes from './routes/userRouter.js'
import loginRoutes from './routes/loginRouter.js'
import bannerRoutes from './routes/bannerRoutes.js'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// CORS Middleware
app.use(cors(corsOptions));

// Content Security Policy middleware
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self' http://localhost:5000"
  );
  next();
});
// API Routes
app.use('/api', contactUsRoutes);
app.use('/api', quatationRoutes);
app.use('/api', productAddRoutes);
app.use('/api', usersRoutes);
app.use('/api',loginRoutes);
app.use('/api',bannerRoutes);

// Static for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Serve client frontend at /
app.use('/', express.static(path.join(__dirname, '..', 'client', 'build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

// Serve admin frontend at /admin
app.use('/admin', express.static(path.join(__dirname, '..', 'admin', 'build')));
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'admin', 'build', 'index.html'));
});
// Global Error Handler
app.use(errorHandler);

// Start server after DB connected
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`📡 Server running at http://localhost:${PORT}`);
  });
});
