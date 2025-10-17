import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import connectDB from './config/db.js';
import corsOptions from './middleware/corsOptions.js';
import errorHandler from './middleware/errorHandler.js';
import compression from "compression";
import contactUsRoutes from './routes/contactUs.js';
import quatationRoutes from './routes/quatations.js';
import productAddRoutes from './routes/productAdd.js'
import usersRoutes from './routes/userRouter.js'
import loginRoutes from './routes/loginRouter.js'
import bannerRoutes from './routes/bannerRoutes.js'
// Get the current file 
const __filename = fileURLToPath(import.meta.url);

// Get the directory name of the current file
const __dirname = path.dirname(__filename);

// Load Environment variables
dotenv.config();
const port = process.env.PORT || 5000;
const mode = process.env.NODE_ENV || "development";

// Connect to MongoDB Database
connectDB();

// Init Express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());
// API Routes
app.use('/api', contactUsRoutes);
app.use('/api', quatationRoutes);
app.use('/api', productAddRoutes);
app.use('/api', usersRoutes);
app.use('/api',loginRoutes);
app.use('/api',bannerRoutes);

// Static for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use("/", express.static(path.join(__dirname, "../client", "dist")));

// Serve dist file of admin
app.use("/admin", express.static(path.join(__dirname, "../admin", "dist")));

// Admin routes
app.get(/admin/, (req, res) => res.sendFile(path.join(__dirname, "../admin", "dist", "index.html")));

// Client routes
app.get(/.*/, (req, res) => res.sendFile(path.join(__dirname, "../client", "dist", "index.html")));
// Global Error Handler
app.use(errorHandler);

app.listen(port, () => console.log(`✅ Server is running in ${mode} mode at http://localhost:${port}`));

