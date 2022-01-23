import express, { Request, Response } from 'express';
import resetRouter from '../controllers/resetPasswordController'
import { protectRoute } from '../controllers/authController';
const router = express.Router();

const { resetPassword, forgotPassword, changePassword } = resetRouter

router.post("/changePassword", protectRoute, changePassword);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/:token", resetPassword);

export default router;