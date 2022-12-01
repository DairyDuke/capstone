// --- Other Imports --- \\

// --- CONSTANT TYPES --- \\
const GET_ALL_BOOKSHELVES = 'bookshelves/getAllBookshelves';
const GET_SINGLE_BOOKSHELF = 'bookshelves/getSingleBookshelf';
const REMOVE_SINGLE_BOOKSHELF = 'bookshelves/removeSingleBookshelf';
const CREATE_BOOKSHELF = 'bookshelves/createBookshelf';
const EDIT_BOOKSHELF = 'bookshelves/editBookshelf';
const DELETE_BOOKSHELF = 'bookshelves/deleteBookshelf';



// --- ACTION CREATORS --- \\
const getAllBookshelves = () => {
  return {
    type: GET_ALL_BOOKSHELVES,
    payload: ,
  }
}
const getSingleBookshelf = () => {
  return {
    type: GET_SINGLE_BOOKSHELF,
    payload: ,
  }
}

const removeSingleBookshelf = () => {
  return {
    type: REMOVE_SINGLE_BOOKSHELF,
    payload: ,
  }
}

const createBookshelf = () => {
  return {
    type: CREATE_BOOKSHELF,
    payload: ,
  }
}

const editBookshelf = () => {
  return {
    type: EDIT_BOOKSHELF,
    payload: ,
  }
}

const deleteBookshelf = () => {
  return {
    type: DELETE_BOOKSHELF,
    payload: ,
  }
}


// --- THUNKS --- \\
export const getAllBooksThunk = () => async (dispatch) => {
  const response = await fetch('/api/books')

  if (response.ok){
    const allBooks = await response.json()
    dispatch(getAllBooks(allBooks))
    return allBooks
  } else {
    return ['Unable to fetch.']
  }
}


// --- REDUCER STUFF --- \\

// --- NORMALIZE DATA SPACE --- \\
