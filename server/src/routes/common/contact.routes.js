import express from 'express';
import { createContact, getContacts } from '../../controllers/common/contact.controller.js'; 

const router = express.Router();

// Route for contact form submission
router.post('/', createContact);
router.get("/", getContacts);
export default router;
