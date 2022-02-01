import express, { NextFunction, Request, Response } from 'express';
import { protectRoute } from '../controllers/authController';


const router = express.Router();

router.use(protectRoute);

//GET Request
router.get("/latest");


export default router;