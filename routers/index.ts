import express from 'express';
import bookRouter from './bookRouter';
import userRouter from './userRouter';

const router = express.Router();

router.use('/auth', userRouter);
router.use('/books', bookRouter);

export default router;
