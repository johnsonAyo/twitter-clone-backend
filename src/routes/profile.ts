import express from 'express';
import { createProfile, updateProfile, uploadProfilePicture } from '../controllers/profileController';
import { profileValidator } from '../utils/validations/profileValidation';
import middleware from '../middleware/middleware';
import { protectRoute } from '../controllers/authController';


const router = express.Router();

router.put('/picture/:id', protectRoute, uploadProfilePicture)
router.put('/create/:id', protectRoute, [middleware(profileValidator)], createProfile)
router.put('/:id', protectRoute, [middleware(profileValidator)], updateProfile)

export default router