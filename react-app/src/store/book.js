// --- Other Imports --- \\

// --- CONSTANT TYPES --- \\
const GET_ALL_BOOKS = 'books/getAllBooks';
const GET_SINGLE_BOOK = 'books/getSingleBook';
const REMOVE_SINGLE_BOOK = 'books/removeSingleBook'
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
  };
};
const getSingleBook = (book) => {
  return {
    type: GET_SINGLE_BOOK,
    payload: book,
  };
};
const removeSingleBook = () => {
  return {
    type: REMOVE_SINGLE_BOOK
  };
};
const createBook = (newBook) => {
  return {
    type: CREATE_BOOK,
    payload: newBook,
  };
};
const editBook = (bookData) => {
  return {
    type: EDIT_BOOK,
    payload: bookData,
  };
};
const deleteBook = (bookId) => {
  return {
    type: DELETE_BOOK,
    bookId: bookId,
  };
};
const addBookToShelf = (addedShelf, bookId) => {
  return {
    type: ADD_BOOK_TO_SHELF,
    payload: addedShelf,
    bookId: bookId,

  };
};
const removeBookFromShelf = (removedShelf, bookId) => {
  return {
    type: REMOVE_BOOK_FROM_SHELF,
    payload: removedShelf,
    bookId: bookId,
  };
};



// --- THUNKS --- \\
export const getAllBooksThunk = () => async (dispatch) => {
  const response = await fetch('/api/books')

  if (response.ok){
    const allBooks = await response.json()
    dispatch(getAllBooks(allBooks))
    return allBooks
  } else {
    throw 404
  }
}

export const getSingleBookThunk = (bookId) => async (dispatch) => {
  const response = await fetch(`/api/books/${bookId}`)

  if (response.ok){
    const singleBook = await response.json()
    dispatch(getSingleBook(singleBook))
    return singleBook
  } else {
    throw 404
  }
}

export const removeSingleBookThunk = ()=> async dispatch =>{
  dispatch(removeSingleBook());
  return
}

export const createBookThunk = ({title, genre, summary, cover_image_url}) => async (dispatch) => {
  const response = await fetch('/api/books', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "title":title,
      "genre":genre,
      "summary":summary,
      "coverImageURL":cover_image_url
    })
  })

  if (response.ok){
    const createdBook = await response.json()
    dispatch(createBook(createdBook))
    return createdBook
  } else {
    throw 404
  }
}

export const editBookThunk = (bookDataObject, id) => async (dispatch) => {
  const response = await fetch(`/api/books/${id}`, {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookDataObject)
  });

  if (response.ok){
    const editedBook = await response.json()
    dispatch(editBook(editedBook))
    // return response
  } else {
    const errors = await response.json()
    return errors
  }
}

export const deleteBookThunk = (bookId) => async (dispatch) => {
  const response = await fetch(`/api/books/${bookId}`, {
    method: 'DELETE',
  })

  if (response.ok){
    const deletedBook = await response.json()
    dispatch(deleteBook(bookId))
    return deletedBook
  } else {
    throw 404
  }
}

//-- BOOKSHELF FUNCTIONALITY --\\

export const addBookToShelfThunk = (bookId, shelfId) => async (dispatch) => {
  const response = await fetch(`/api/books/${bookId}/bookshelf`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({'shelfId':shelfId})
  });


  if (response.ok){
    const addedShelf = await response.json()
    dispatch(getSingleBookThunk(bookId))
    dispatch(addBookToShelf(addedShelf, bookId))
    return null
  } else {
    const errors = await response.json()
    return errors
  }
}

export const removeBookFromShelfThunk = (bookId, shelfId) => async (dispatch) => {
  const response = await fetch(`/api/books/${bookId}/bookshelf`, {
    method: 'DELETE',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({'shelfId':shelfId})
  });

  if (response.ok){
    const removedShelf = await response.json()
    dispatch(removeBookFromShelf(removedShelf, bookId))
    return null
  } else {
    const errors = await response.json()
    return errors
  }
}

// --- REDUCER STUFF --- \\

// --- NORMALIZE DATA SPACE --- \\
const initialState = {}


const booksReducer = (state = initialState, action) => {
  let newState = {...state}

  switch (action.type){
    // case :
    //   return

    case GET_ALL_BOOKS:
      action.payload.Books.forEach(
        book => {
          newState[book.id] = book
        }
      )
      return newState;

    case GET_SINGLE_BOOK:
        newState["singleBook"] = action.payload
      return newState;

    case REMOVE_SINGLE_BOOK:
        newState["singleBook"] = null
      return newState;

    case CREATE_BOOK:
      if (newState[action.payload.id]) {
        newState[action.payload.id] = action.payload
      } else {
        newState[action.payload.id] = action.payload
      }
      return newState;

    case EDIT_BOOK:
        newState[action.payload.id] = action.payload
      return newState;

    case DELETE_BOOK:
        delete newState[action.bookId]
      return newState;

    case ADD_BOOK_TO_SHELF:
      return newState;

    case REMOVE_BOOK_FROM_SHELF:
      return newState;

    default:
      return state;
  }
};

export default booksReducer;
