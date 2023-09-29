import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import environment from '../config/environment';
import CustomError from '../errors/CustomError';

interface MyJwtPayload extends JwtPayload {
  id: number;
}

const { jwtSecret } = environment.jwt;

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer '))
    throw new CustomError(401, 'Authentication failed');

  const token: string = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, jwtSecret) as MyJwtPayload;

    req.userId = payload.id;

    next();
  } catch (error) {
    throw new CustomError(401, 'Authentication failed');
  }
};
