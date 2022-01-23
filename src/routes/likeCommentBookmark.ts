import express, { NextFunction, Request, Response } from 'express';
import { commentPost } from '../controllers/commentController';
import { likePost, unlikePost } from "../controllers/likeController"

const router = express.Router();

router.post("/:id/like", likePost);
router.delete("/:id/like", unlikePost);
router.post("/:id/comment", commentPost);

export default router;