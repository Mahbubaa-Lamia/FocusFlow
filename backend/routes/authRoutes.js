import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { chatWithAI } from '../controllers/aiController.js'; // নতুন কন্ট্রোলার ইমপোর্ট

const router = express.Router();

router.post('/signup', registerUser);
router.post('/signin', loginUser);
router.post('/ask', chatWithAI); // AI চ্যাটবটের জন্য নতুন রাউট

export default router;