import express, { Response } from 'express';
import { signup, login, confirmEmail, protectRoute } from '../controllers/authController';
import {updateProfile, getProfile} from '../controllers/profileController'
import middleware from '../middleware/middleware';
import { validateSignup } from '../utils/validations/userValidation';
import {profileValidator} from '../utils/validations/profileValidation'

const router = express.Router();

router.post('/signup', [middleware(validateSignup)], signup);
router.post('/login', [middleware(validateSignup)], login);
router.put('/profile/:id', protectRoute, [middleware(profileValidator)], updateProfile)
router.get('/:id', protectRoute, getProfile)
router.get('/verify/:token', confirmEmail);

export default router;

