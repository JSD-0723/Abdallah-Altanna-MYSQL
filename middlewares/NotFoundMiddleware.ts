import { Request, Response } from 'express';

const notFoundMiddleware = (req: Request, res: Response) => {
  res.status(404).json({ status: 404, msg: 'Route not found' });
};

export default notFoundMiddleware;
