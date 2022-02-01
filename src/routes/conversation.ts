import express from 'express';
import { createConversation, getConversation } from '../controllers/conversationController';
import { protectRoute } from '../controllers/authController';


const router = express.Router();

router.post('/', protectRoute, createConversation)
router.get('/', protectRoute, getConversation)


export default router