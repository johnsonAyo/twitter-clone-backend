import express, { NextFunction, Request, Response } from 'express';
import { createBookmark, deleteBookmark, getAllBookmarks } from '../controllers/bookmarkController';
import { commentTweet, getComments } from '../controllers/commentController';
import { likeTweet, unlikeTweet } from "../controllers/likeController"

const router = express.Router();

//GET Request
router.get("/bookmarks", getAllBookmarks)
router.get("/comments", getComments)


//POST Request
router.post("/:id/like", likeTweet);
router.post("/:id/comment", commentTweet);
router.post("/:id/bookmark", createBookmark)


//DELETE Request
router.delete("/:id/like", unlikeTweet);
router.delete("/:id/bookmark", deleteBookmark)



export default router;