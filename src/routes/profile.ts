import express from 'express';
import { uploadProfilePicture } from '../controllers/profileController';


const router = express.Router();

router.put('/picture/:id', uploadProfilePicture)

export default router