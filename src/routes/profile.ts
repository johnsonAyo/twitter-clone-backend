import express from 'express';
import { updateProfile, uploadProfilePicture, getProfile } from '../controllers/profileController';
import { profileValidator } from '../utils/validations/profileValidation';
import middleware from '../middleware/middleware';
import { protectRoute } from '../controllers/authController';

const router = express.Router();

// router.get('/', protectRoute, userProfile);
 router.put('/:id', protectRoute, [middleware(profileValidator)], updateProfile);
 router.get('/:id', protectRoute, getProfile)
router.put('/picture', protectRoute, uploadProfilePicture);
// router.post('/create', protectRoute, [middleware(profileValidator)], createProfile);

export default router;
