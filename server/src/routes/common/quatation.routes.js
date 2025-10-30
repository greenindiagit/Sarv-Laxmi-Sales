import express  from 'express';
import  {submitQuatation}  from '../../controllers/common/quatation.controller.js';

const router =express.Router();
// Router for contact from submission
router.post('/',submitQuatation)
export default router;

