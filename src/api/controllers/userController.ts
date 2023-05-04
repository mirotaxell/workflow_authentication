import {NextFunction, Request, Response} from 'express';
import userModel from '../models/userModel';
import CustomError from '../../CustomError';
import {User, OutputUser} from '../../interfaces';
import bcrypt from 'bcryptjs';
import {DBMessageResponse} from '../../interfaces';

const salt = bcrypt.genSaltSync(12);

export const userListGet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userModel.find().select('-password -role');
    res.json(users);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

export const userGet = async (
  req: Request<{id: string}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.findById(req.params.id).select('-password');
    if (!user) {
      next(new CustomError('User not found', 404));
      return;
    }
    res.json(user);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

export const userPost = async (
  req: Request<{}, {}, User>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body;
    user.password = await bcrypt.hash(user.password, salt);
    const newUser = await userModel.create(user);
    const response: DBMessageResponse = {
      message: 'User Creation Successful',
      user: {
        full_name: newUser.full_name,
        email: newUser.email,
        id: newUser._id,
      },
    };
    res.json(response);
  } catch (error) {
    next(new CustomError((error as Error).message, 200));
  }
};

export const userPut = async (
  req: Request<{}, {}, User>,
  res: Response<{}, {user: OutputUser}>,
  next: NextFunction
) => {
  try {
    const userFromToken = res.locals.user;

    const user = req.body;
    if (user.password) {
      user.password = await bcrypt.hash(user.password, salt);
    }

    const result = await userModel
      .findByIdAndUpdate(userFromToken.id, user, {
        new: true,
      })
      .select('-password -role');

    if (!result) {
      next(new CustomError('User not found', 404));
      return;
    }

    const response: DBMessageResponse = {
      message: 'User Update Successful',
      user: {
        full_name: result.full_name,
        email: result.email,
        id: result._id,
      },
    };
    res.json(response);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

export const userDelete = async (
  req: Request,
  res: Response<{}, {user: OutputUser}>,
  next: NextFunction
) => {
  try {
    const userFromToken = res.locals.user;
    const result = await userModel.findByIdAndDelete(userFromToken.id);
    if (!result) {
      next(new CustomError('User not found', 404));
      return;
    }
    const response: DBMessageResponse = {
      message: 'User Deletion Successful',
      user: {
        full_name: result.full_name,
        email: result.email,
        id: result._id,
      },
    };
    res.json(response);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

export const checkToken = async (
  req: Request,
  res: Response<{}, {user: OutputUser}>
) => {
  const userFromToken = res.locals.user;

  const message: DBMessageResponse = {
    message: 'Token is valid',
    user: userFromToken,
  };
  res.json(message);
};
