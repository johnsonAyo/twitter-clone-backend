import { Request, Response, NextFunction } from 'express';
import Conversation from '../models/conversationModel';
import catchAsync from '../utils/catchAsync';
import ErrorHandler from '../utils/appError';
// import APIFeatures from '../utils/apiFeatures'

export const createConversation = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = new Conversation({
    user1: req.body.user1,
    user2: req.body.user2
  });
  const {user1, user2} = req.body
  let user = (req.user._id).toString();


  if(user === user1 || user === user2 ){
    await data.save();
    res.status(200).json({
        status: 'Successful',
        message: 'Chat was created',
        data,
      });
  }
  else{
    return next(new ErrorHandler(401, "You are not logged in!")) 
  }
 
});

export const getConversation = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await Conversation.find();
    if(!data){
        return next(new ErrorHandler(401, "You have no chat records. Start by typing hello!"))
    }
    res.status(200).json({
        status: 'Successful',
        message: 'Chat was created',
        data,
    });
})

// export const getAllAuthors = async (req: Request, res: Response) => {
//     try {
//       const features = new APIFeatures(Author.find(), req.query)
//         .limitFields()
//         .paginate();
//       const author = await features.query;
//       const total = await Author.countDocuments();
//       let page = parseInt(req.query.page as string);
//       let limit = parseInt(req.query.limit as string);
//       let noOfPages = Math.ceil(total / limit);
//       let previous = page === 1 || page >= noOfPages ? null : page - 1;
//       let next = page >= noOfPages ? null : page + 1;
  
//       res.status(200).json({
//         status: "successful!",
//         //results: total,
//         //page: `${page}`,
//         previous: previous,
//         next: next,
//         //size: author.length,
//         author,
//       });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({ status: "Failed!", message: "An Error Occurred!" });
//     }
//   };