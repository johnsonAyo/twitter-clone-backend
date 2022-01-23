import createError, { HttpError } from 'http-errors';
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import globalErrorHandler from './controllers/errorController';
import session from 'express-session';
import passport from 'passport';
import { googleStrategy, facebookStrategy } from './middleware/passport';

dotenv.config();
const app = express();
googleStrategy(passport);
facebookStrategy(passport);
app.use(
  session({
    secret: process.env.SECRET_SESSION as string,
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());


import indexRouter from './routes/index';
import followRoutes from './routes/followRoute';
import tweetRoute from './routes/tweetingRouting';
import { connectDB, connectTestDB } from './database/mem';
import usersRouter from './routes/users';
import profileRouter from './routes/profile';
import viewtweetRoute from './routes/viewTweetRoute';

import authRouter from './routes/auth';


app.use(cors());

// view engine setup
// app.set('views', path.join(__dirname, '../views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// connect db
if (process.env.NODE_ENV === 'test') {
  connectTestDB();
} else {
  connectDB();
}

console.log(process.env.NODE_ENV);

app.use('/', indexRouter);
app.use('/api/follow', followRoutes);
app.use('/tweet', tweetRoute);
app.use('/users', usersRouter);

app.use('/profile', profileRouter);

app.use('/api/viewtweet', viewtweetRoute);
app.use('/auth', authRouter);

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can not find ${req.originalUrl} endpoint on this server`,
  });
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.set('views', path.join(`${__dirname}/../`, 'views'));
app.set('view engine', 'ejs');

// // error handler
// app.use(function (err: HttpError, req: Request, res: Response, next: NextFunction) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);

//   res.send(err);
// });

app.use(globalErrorHandler);

export default app;
