import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';

import { hashPassword, comparePassword } from '../helpers/passwordhashing';
import userSchema from '../validators/userValidator';
import User from '../models/user';
import CustomError from '../errors/CustomError';
import { createUser, readUserByEmail } from '../db/queries/userQueries';
import { createJwt } from '../utils/jwt';

// register
export const register = asyncHandler(async (req: Request, res: Response) => {
  const userBody: User = req.body;
  const { error, value: user } = userSchema.validate(userBody);
  if (error) throw new CustomError(400, error.details[0].message);

  const hashedUser = await hashPassword(user);
  const userId = await createUser(hashedUser);

  if (userId === -1) throw new CustomError(400, 'User already exists');
  if (!userId) throw new CustomError(500, 'Error creating user');

  const token = createJwt(userId);
  if (!token) throw new CustomError(500, 'Error creating token');

  res.status(201).json({ status: 201, message: 'User created', token });
});

// login
export const login = asyncHandler(async (req: Request, res: Response) => {
  const userBody: User = req.body;
  const { error, value: user } = userSchema.validate(userBody);
  if (error) throw new CustomError(400, error.details[0].message);

  const foundUser = await readUserByEmail(user.email);
  if (!foundUser) throw new CustomError(400, 'User not found');

  const isMatch = await comparePassword(user.password, foundUser.password);
  if (!isMatch) throw new CustomError(401, 'Invalid credentials');

  const token = createJwt(foundUser.id);

  if (!token) throw new CustomError(500, 'Error creating token');

  res.status(200).json({ status: 200, message: 'User logged in', token });
});
