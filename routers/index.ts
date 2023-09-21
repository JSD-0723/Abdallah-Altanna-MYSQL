import express from 'express';
import bookRouter from './bookRouter';

const router = express.Router();

router.use('/books', bookRouter);

export default router;
