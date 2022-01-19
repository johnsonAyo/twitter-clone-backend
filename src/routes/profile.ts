import express from 'express';
import { createProfile, updateProfile, uploadProfilePicture } from '../controllers/profileController';
import { profileValidator } from '../utils/validations/profileValidation';
import middleware from '../middleware/middleware';


const router = express.Router();

router.put('/picture/:id', uploadProfilePicture)
router.put('/create/:id', [middleware(profileValidator)], createProfile)
router.put('/:id', [middleware(profileValidator)], updateProfile)

export default router