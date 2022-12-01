// --- Other Imports --- \\

// --- CONSTANT TYPES --- \\
const GET_ALL_BOOKSHELVES = 'bookshelves/getAllBookshelves';
const GET_ALL_CURRENT_USER_BOOKSHELVES = 'bookshelves/getAllCurrentUserBookshelves'
const GET_SINGLE_BOOKSHELF = 'bookshelves/getSingleBookshelf';
const REMOVE_SINGLE_BOOKSHELF = 'bookshelves/removeSingleBookshelf';
const CREATE_BOOKSHELF = 'bookshelves/createBookshelf';
const EDIT_BOOKSHELF = 'bookshelves/editBookshelf';
const DELETE_BOOKSHELF = 'bookshelves/deleteBookshelf';



// --- ACTION CREATORS --- \\
const getAllBookshelves = (bookshelves) => {
  return {
    type: GET_ALL_BOOKSHELVES,
    payload: bookshelves,
  }
}

const getAllCurrentUserBookshelves = (bookshelves) => {
  return {
    type: GET_ALL_CURRENT_USER_BOOKSHELVES,
    payload: bookshelves,
  }
}


const getSingleBookshelf = (shelf) => {
  return {
    type: GET_SINGLE_BOOKSHELF,
    payload: shelf,
  }
}

const removeSingleBookshelf = () => {
  return {
    type: REMOVE_SINGLE_BOOKSHELF,
  }
}

const createBookshelf = (newShelf) => {
  return {
    type: CREATE_BOOKSHELF,
    payload: newShelf,
  }
}

const editBookshelf = (shelfData) => {
  return {
    type: EDIT_BOOKSHELF,
    payload: shelfData,
  }
}

const deleteBookshelf = (shelfId) => {
  return {
    type: DELETE_BOOKSHELF,
    shelfId: shelfId,
  }
}


// --- THUNKS --- \\
export const getAllBookshelvesThunk = () => async (dispatch) => {
  const response = await fetch('/api/bookshelves')
  console.log("Test2", response)

  if (response.ok){
    const allShelves = await response.json()
    console.log("Test1", allShelves)
    dispatch(getAllBookshelves(allShelves))
    return allShelves
  } else {
    return ['Unable to fetch.']
  }
}

export const getAllCurrentUserBookshelvesThunk = () => async (dispatch) => {
  const response = await fetch('/api/users/current/bookshelves')

  if (response.ok){
    const allShelves = await response.json()
    dispatch(getAllCurrentUserBookshelves(allShelves))
    return allShelves
  } else {
    return ['Unable to fetch.']
  }
}

export const getSingleBookshelfThunk = (shelfId) => async (dispatch) => {
  const response = await fetch(`/api/bookshelves/${shelfId}`)

  if (response.ok){
    const singleShelf = await response.json()
    dispatch(getSingleBookshelf(singleShelf))
    return singleShelf
  } else {
    return ['Unable to fetch.']
  }
}

export const removeSingleBookshelfThunk = () => async (dispatch) => {
  dispatch(removeSingleBookshelf());
  return
}

export const createBookshelfThunk = (shelfData) => async (dispatch) => {
  const response = await fetch(`/api/bookshelves/`,{
    method: 'POST',
    body: JSON.stringify({
      "bookshelf_name": shelfData,
    })
  });

  if (response.ok){
    const newShelf = await response.json()
    dispatch(createBookshelf(newShelf))
    return newShelf
  } else {
    return ['Unable to fetch.']
  }
}

export const editBookshelfThunk  = (shelfId, shelfData) => async (dispatch) => {
  const response = await fetch(`/api/bookshelves/${shelfId}`,{
    method: 'PUT',
    body: JSON.stringify({
      "bookshelf_name": shelfData,
    })
  });

  if (response.ok){
    const editedShelf = await response.json()
    dispatch(editBookshelf(editedShelf))
    return editedShelf
  } else {
    return ['Unable to fetch.']
  }
}

export const deleteBookshelfThunk = (shelfId) => async (dispatch) => {
  const response = await fetch(`/api/bookshelves/${shelfId}`, {
    method: 'DELETE'
  })

  if (response.ok){
    const deletedShelf = await response.json()
    dispatch(deleteBookshelf(deletedShelf))
    return deletedShelf
  } else {
    return ['Unable to fetch.']
  }
}

// --- REDUCER STUFF --- \\

// --- NORMALIZE DATA SPACE --- \\
const initialState = {}



const bookshelfReducer = (state = initialState, action) => {
  let newState = {...state}

  switch (action.type){
    // case :
    //   return

    case GET_ALL_BOOKSHELVES:
      action.payload.Bookshelves.forEach(
        bookshelf => {
          if (newState[bookshelf['userId']]) {
            newState[bookshelf['userId']][bookshelf.id.toString()] = bookshelf
          } else {
            newState[bookshelf['userId']]= {
              [bookshelf.id.toString()]: bookshelf
            }
          }
        }
      )
      return newState;

    case GET_SINGLE_BOOKSHELF:
        newState["singleShelf"] = action.payload
      return newState;

    case GET_ALL_CURRENT_USER_BOOKSHELVES:
      action.payload.Bookshelves.forEach(
        bookshelf => {
          if (newState['currentUser']) {
            newState['currentUser'][bookshelf.id.toString()] = bookshelf
          } else {
            newState['currentUser']= {
              [bookshelf.id.toString()]: bookshelf
            }
          }
        }
      )
      return newState;

    case REMOVE_SINGLE_BOOKSHELF:
        newState["singleShelf"] = null
      return newState;

    case CREATE_BOOKSHELF:
        newState[action.payload.id] = action.payload
      return newState;

    case EDIT_BOOKSHELF:
        newState[action.payload.id] = action.payload
      return newState;

    case DELETE_BOOKSHELF:
        delete newState[action.shelfId]
      return newState;

    default:
      return state;
  }
};

export default bookshelfReducer;
