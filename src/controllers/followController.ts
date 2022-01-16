import express, { Request, Response, NextFunction } from "express";
import { createFollow } from "../models/followModel";

export const postFollower = async(req: Request, res: Response) => {
    try {
        let{userId,followId} = req.body
        let data:any=await createFollow(userId,followId)
        data 
        ? res.status(200).json({message:'success',data}) 
        : res.status(500).json({message:'no data found'})
        return data
    } catch (error) {
        return res.status(400).json({message:'error occurred', error})
    }
}