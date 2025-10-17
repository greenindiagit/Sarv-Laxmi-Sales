import express  from 'express';
import  quatationController  from '../../controllers/quatationController.js';

const router =express.Router();
// Router for contact from submission
router.post('/quate',quatationController.submitQuatation)
export default router;

