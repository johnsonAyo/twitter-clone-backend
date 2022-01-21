import express, { Request, Response, NextFunction }from "express";
import Like from "../models/likeModel";
import Post from "../model/postModel"

export const like_post = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const userId = req.user._id
    
    try {
        const post = await Post.findById(id);
        const like = await Like.create({post._id, userId})
        // const result = await like.save()
        res.status(200).json({message:"The post has been liked", data: like})
    } catch (error) {
        res.status(500).json(error);
    }
}

export const unlike_post = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
        const result = await Like.findByIdAndDelete(id)
        res.status(200).json("The post has been disliked")
    } catch (error) {
        res.status(500).json(error);
    }
}

