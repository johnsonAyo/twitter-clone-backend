import express, { Response } from 'express';
import { signup, login, confirmEmail, protectRoute } from '../controllers/authController';
import {updateProfile, getProfile, uploadProfilePicture} from '../controllers/profileController'
import middleware from '../middleware/middleware';
import { validateSignup } from '../utils/validations/userValidation';
import { profilePicValidator, profileValidator } from '../utils/validations/profileValidation'

const router = express.Router();

router.post('/signup', [middleware(validateSignup)], signup);
router.post('/login', [middleware(validateSignup)], login);
router.put('/profile/:id', protectRoute, [middleware(profileValidator)], updateProfile)
router.get('/', protectRoute, getProfile)
router.put('/picture', protectRoute, uploadProfilePicture);
router.get('/verify/:token', [middleware(profilePicValidator)], confirmEmail);

export default router;

