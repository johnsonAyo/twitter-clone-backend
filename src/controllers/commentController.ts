import express, { Request, Response, NextFunction }from "express";
import Comment from "../models/commentModel";
//import Post from "../model/postModel"

export const commentTweet = async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    const userId = req.user._id
    const { value } = req.body;

    try {
        const comment = await Comment.create({ id, userId, value});
        res.status(200).json({message: "Comment successful"})
    } catch (error: any) {
        res.status(400).json({message: error.message })
    }
}

export const getComments = async (req: Request, res: Response, _next: NextFunction) => {

    try {
        const comments = await Comment.find();
        res.status(200).json({message: "All comments", data: comments})
    } catch (error: any) {
        res.status(400).json({message: error.message })
    }

}

