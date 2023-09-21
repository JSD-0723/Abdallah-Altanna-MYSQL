import { Request, Response, NextFunction } from 'express';
import CustomError from '../errors/CustomError';

const errorHandlerMiddleware = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.status || 500).json({
    status: error.status || 500,
    message: error.message || 'Something went wrong'
  });
};

export default errorHandlerMiddleware;
