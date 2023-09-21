import express from 'express';
import BookController from '../controllers/bookController';

const router = express.Router();

const bookController = new BookController();

const { getAllBooks, addBook, getBookById, updateBook, deleteBook } =
  bookController;

router.route('/').get(getAllBooks).post(addBook);
router.route('/:id').get(getBookById).put(updateBook).delete(deleteBook);

export default router;
