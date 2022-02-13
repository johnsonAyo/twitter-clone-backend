import express, { Request, Response, NextFunction } from 'express';
import Bookmark from '../models/bookmarkModel';
import catchAsync from '../utils/catchAsync';
import ErrorHandler from '../utils/appError';
import Paginate from '../utils/apiFeatures';

export const createBookmark = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.user._id;

    const bookmark = await Bookmark.create({ tweetId: id, userId });
    if (!bookmark) return next(new ErrorHandler(404, 'Error occurred'));
    res.status(200).json({ message: 'Bookmark created', data: bookmark });
  },
);

export const getAllBookmarks = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const userId = req.user._id;

    const result = new Paginate(Bookmark.find({ userId }), req.query).sort().paginate();
    const bookmarks = await result.query.populate('tweetId').populate('userId');
    if (!bookmarks) return next(new ErrorHandler(404, 'Error occurred'));
    res.status(200).json({ message: 'All bookmarks', data: bookmarks });
  },
);

export const getSingleBookmark = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const userId = req.user._id;

    const bookmark = await Bookmark.findOne({ id, userId }).populate('tweetId').populate('userId');
    if (!bookmark) return next(new ErrorHandler(404, 'Error occurred'));
    res.status(200).json({ message: 'Single bookmark', data: bookmark });
  },
);

export const deleteBookmark = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const userId = req.user._id;

    const result = await Bookmark.deleteOne({ tweetId: id, userId });
    console.log(result);
    if (!result) return next(new ErrorHandler(404, 'Error occurred'));
    res.status(200).json('The bookmark has been deleted');
  },
);
