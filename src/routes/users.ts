import express, { Response } from 'express';
import { signup, login, confirmEmail, protectRoute } from '../controllers/authController';
import middleware from '../middleware/middleware';
import { validateSignup } from '../utils/validations/userValidation';

const router = express.Router();

router.post('/signup', [middleware(validateSignup)], signup);
router.post('/login', [middleware(validateSignup)], login);
router.get('/verify/:token', confirmEmail);



export default router;
