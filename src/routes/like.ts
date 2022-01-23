import express, { NextFunction, Request, Response } from 'express';
import { comment_post } from '../controllers/commentController';
import { like_post, unlike_post } from "../controllers/likeController"

const router = express.Router();

router.post("/:id/like", like_post);
router.delete("/:id/like", unlike_post);
router.post("/:id/comment", comment_post);

export default router;