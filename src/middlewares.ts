import {NextFunction, Request, Response} from 'express';
import CustomError from './CustomError';
import jwt from 'jsonwebtoken';
import {OutputUser, ErrorResponse} from './interfaces';
import userModel from './api/models/userModel';

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response<ErrorResponse>
) => {
  console.error('errorHandler', err);
  res.status(err.status || 500);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bearer = req.headers.authorization;
    if (!bearer) {
      next(new CustomError('No token provided', 401));
      return;
    }

    const token = bearer.split(' ')[1];
    if (!token) {
      next(new CustomError('No token provided', 401));
      return;
    }

    const userFromToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as OutputUser;

    const user = await userModel.findById(userFromToken.id).select('-password');
    if (!user) {
      next(new CustomError('Token not valid', 403));
      return;
    }

    const outputUser: OutputUser = {
      id: user._id,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
    };
    res.locals.user = outputUser;

    next();
  } catch (error) {
    next(new CustomError((error as Error).message, 400));
  }
};
