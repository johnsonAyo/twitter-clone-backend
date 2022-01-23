import express, { Request, Response, NextFunction }from "express";
import Comment from "../models/commentModel";
//import Post from "../model/postModel"

export const comment_post = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { userId } = req.body;;
    const { value } = req.body;

    try {
        const comment = await Comment.create({ id, userId, value});
        res.status(200).json({message: "Comment successful"})
    } catch (error: any) {
        res.status(400).json({message: error.message })
    }
}


