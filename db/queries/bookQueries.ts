import Book from '../../models/book';

class bookQueries {
  // create book
  async addBook(book: Book): Promise<number | null> {
    const bookId = await Book.create({ ...book });
    return bookId.id;
  }

  // get all books
  async getAllBooks(): Promise<Book[]> {
    return await Book.findAll();
  }

  // get book by id
  async getBookById(id: number): Promise<Book | null> {
    return await Book.findByPk(id);
  }

  // get book by name
  async getBookByName(author: string): Promise<Book | null> {
    return await Book.findOne({ where: { author } });
  }

  // update book
  async updateBook(id: number, book: Book) {
    return await Book.update({ ...book }, { where: { id } });
  }

  // delete book
  async deleteBook(id: number) {
    return await Book.destroy({ where: { id } });
  }
}

export default bookQueries;
