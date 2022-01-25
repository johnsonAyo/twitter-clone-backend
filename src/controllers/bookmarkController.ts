import express, { Request, Response, NextFunction } from 'express';
import Bookmark from '../models/bookmarkModel';

export const createBookmark = async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const bookmark = await Bookmark.create({ tweetId: id, userId });
    res.status(200).json({ message: 'Bookmark created', data: bookmark });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllBookmarks = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const bookmarks = await Bookmark.find();
    res.status(200).json({ message: 'All bookmarks', data: bookmarks });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBookmark = async (req: Request, res: Response, _next: NextFunction) => {
  const id = req.params.id;
  const userId = req.user._id;

  try {
    const result = await Bookmark.deleteOne({ tweetId: id, userId });
    console.log(result);
    res.status(200).json('The bookmark has been deleted');
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getSingleBookmark = async (req: Request, res: Response, _next: NextFunction) => {
  const id = req.params.id;
  const userId = req.user._id;

  try {
    const bookmark = await Bookmark.findOne({ id, userId });
    res.status(200).json({ message: 'Single bookmark', data: bookmark });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
