import express, { Response } from 'express';
import { signup, login, confirmEmail, protectRoute } from '../controllers/authController';
import { updateProfile, getProfile, uploadProfilePicture } from '../controllers/profileController';
import middleware from '../middleware/middleware';
import { validateSignup, validateLogin } from '../utils/validations/userValidation';

const router = express.Router();

router.post('/signup', [middleware(validateSignup)], signup);
router.post('/login', [middleware(validateLogin)], login);
router.get('/verify/:token', confirmEmail);

export default router;
