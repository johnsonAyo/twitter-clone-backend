import express from 'express';
import { updateProfile, uploadProfilePicture, getProfile } from '../controllers/profileController';
import { profileValidator } from '../utils/validations/profileValidation';
import middleware from '../middleware/middleware';
import { protectRoute } from '../controllers/authController';

const router = express.Router();

// router.get('/', protectRoute, userProfile);
router
  .route('/')
  .get(protectRoute, getProfile)
  .put(protectRoute, [middleware(profileValidator)], updateProfile);
router.put('/picture', protectRoute, uploadProfilePicture);

// router.post('/create', protectRoute, [middleware(profileValidator)], createProfile);

export default router;
