import { Request, Response } from 'express';
import bookQueries from '../db/queries/bookQueries';
import Book from '../models/book';
import bookValidation from '../validators/bookValidator';
import CustomError from '../errors/CustomError';
import asyncHandler from 'express-async-handler';
import checkPermissions from '../utils/checkPermissions';

class BookController {
  private static bookQueries = new bookQueries();

  // Get All Books
  getAllBooks = asyncHandler(async function (req: Request, res: Response) {
    const books = await BookController.bookQueries.getAllBooks();

    res.status(200).json({
      status: 200,
      data: books
    });
  });

  // Create Book
  addBook = asyncHandler(async function (req: Request, res: Response) {
    const bookBody: Book = req.body;

    const { error, value: book } = bookValidation.validate(bookBody);
    if (error) throw new CustomError(400, error.details[0].message);

    const existingBook = await BookController.bookQueries.getBookByName(
      bookBody.author
    );

    if (existingBook) throw new CustomError(400, 'Book already exists');

    book.userId = req.userId;

    await BookController.bookQueries.addBook(book);

    res.status(201).json({
      status: 201,
      message: 'Book is created successfully'
    });
  });

  // Get Book By Id
  getBookById = asyncHandler(async function (req: Request, res: Response) {
    const bookId = Number(req.params.id);

    const book = await BookController.bookQueries.getBookById(bookId);

    if (!book) throw new CustomError(404, 'Book not found');

    res.status(200).json({
      status: 200,
      data: book
    });
  });

  // Update Book
  updateBook = asyncHandler(async function (req: Request, res: Response) {
    const bookId = Number(req.params.id);
    const bookBody = req.body;

    const book: any = await BookController.bookQueries.getBookById(bookId);
    if (!book) throw new CustomError(404, 'Book not found');

    const { error, value } = bookValidation.validate(bookBody);
    if (error) throw new CustomError(400, error.details[0].message);

    checkPermissions(req.userId, book.userId);

    await BookController.bookQueries.updateBook(bookId, value);

    res.status(200).json({
      status: 200,
      message: 'Book is updated successfully'
    });
  });

  // Delete Book
  deleteBook = asyncHandler(async function (req: Request, res: Response) {
    const bookId = Number(req.params.id);

    const book: any = await BookController.bookQueries.getBookById(bookId);

    if (!book) throw new CustomError(404, 'Book not found');

    checkPermissions(req.userId, book.userId);

    await BookController.bookQueries.deleteBook(bookId);

    res.status(200).json({
      status: 200,
      message: 'Book is deleted successfully'
    });
  });
}

export default BookController;
