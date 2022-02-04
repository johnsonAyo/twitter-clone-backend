import express, { Request, Response } from 'express';
import { protectRoute } from '../controllers/authController';
import { searchTweetsAndComments, searchUsers } from '../controllers/searchContoller';
const router = express.Router();

router.get('/', protectRoute, searchTweetsAndComments)
router.get('/users', protectRoute, searchUsers)
export default router;
