import express from 'express';
import BookController from '../controllers/bookController';
import authentication from '../middlewares/authentication';

const router = express.Router();

const bookController = new BookController();

const { getAllBooks, addBook, getBookById, updateBook, deleteBook } =
  bookController;

router.route('/').get(getAllBooks).post(authentication, addBook);
router
  .route('/:id')
  .get(getBookById)
  .put(authentication, updateBook)
  .delete(authentication, deleteBook);

export default router;
