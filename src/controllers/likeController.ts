import express, { Request, Response, NextFunction, urlencoded }from "express";
import Like from "../models/likeModel";
import tweet from "../models/tweetModel"

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

export const likePost = async (req: Request, res: Response, _next: NextFunction) => {
    const id = req.params.id;
    const userId = req.user._id;
    
    try {
        const like = await Like.create({id, userId})
        res.status(200).json({message:"The post has been liked", data: like})
    } catch (error) {
        res.status(500).json(error);
    }
}

export const unlikePost = async (req: Request, res: Response, _next: NextFunction) => {
    const id = req.params.id;
    console.log(req.body)
    const { userId } = req.body;

    try {
        const result = await Like.deleteOne({ postId: id, userId })
        console.log(result)
        res.status(200).json("The post has been disliked")
    } catch (error) {
        res.status(500).json(error);
    }
}

