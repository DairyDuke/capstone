// --- Other Imports --- \\

// --- CONSTANT TYPES --- \\
const GET_ALL_BOOKS = 'books/getAllBooks';
const GET_SINGLE_BOOK = 'books/getSingleBook';
const CREATE_BOOK = 'books/createBook';
const EDIT_BOOK = 'books/editBook';
const DELETE_BOOK = 'books/deleteBook';
const ADD_BOOK_TO_SHELF = 'books/addBookToShelf'
const REMOVE_BOOK_FROM_SHELF = 'books/removeBookFromShelf'

// --- ACTION CREATORS --- \\
const getAllBooks = (books) => {
  return {
    type: GET_ALL_BOOKS,
    payload: books,
  }
}
const getSingleBook = (book) => {
  return {
    type: GET_SINGLE_BOOK,
    payload: book,
  }
}
const createBook = (newBook) => {
  return {
    type: CREATE_BOOK,
    payload: newBook,
  }
}
const editBook = (bookData) => {
  return {
    type: EDIT_BOOK,
    payload: bookData,
  }
}
const deleteBook = (bookId) => {
  return {
    type: DELETE_BOOK,
    bookId: bookId,
  }
}
const addBookToShelf = (bookId, userId, shelfId) => {
  return {
    type: ADD_BOOK_TO_SHELF,
    bookId: bookId,
    userId: userId,
    shelfId: shelfId,
  }
}
const removeBookFromShelf = (bookId, userId, shelfId) => {
  return {
    type: ADD_BOOK_TO_SHELF,
    bookId: bookId,
    userId: userId,
    shelfId: shelfId,
  }
}



// --- THUNKS --- \\



// --- REDUCER STUFF --- \\

// --- NORMALIZE DATA SPACE --- \\
