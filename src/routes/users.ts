import express from 'express';
import { signup, login } from '../controllers/authController';
import middleware from '../middleware/middleware';
import { validateSignup } from '../utils/validations/userValidation';

const router = express.Router();

router.post('/signup', [middleware(validateSignup)], signup);
router.post('/login', [middleware(validateSignup)], login);

export default router;
