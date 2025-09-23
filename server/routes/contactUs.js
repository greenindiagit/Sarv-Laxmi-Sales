import express from 'express';
import contactController from '../controllers/contactUsController.js'; 

const router = express.Router();

// Route for contact form submission
router.post('/contact/', contactController.submitContactForm);

export default router;
