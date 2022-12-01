// --- Other Imports --- \\

// --- CONSTANT TYPES --- \\
const GET_ALL_CREATORS = 'creators/getAllCreators';
const CREATOR_CREATOR = 'creators/createCreator';
const UPDATE_CREATOR = 'creators/updateCreator';
const DELETE_CREATOR = 'creators/deleteCreator';
const ASSIGN_BOOK_TO_CREATOR = 'creators/assignBookToCreator';
const UNASSIGN_BOOK_TO_CREATOR = 'creators/unassignBookToCreator';

// --- ACTION CREATORS --- \\
const getAllCreators = (creators) => {
  return {
    type: GET_ALL_CREATORS,
    payload: creators,
  }
}
const createCreator = (newCreator) => {
  return {
    type: CREATOR_CREATOR,
    payload: newCreator,
  }
}
const updateCreator = (editedCreator) => {
  return {
    type: UPDATE_CREATOR,
    payload: editedCreator,
  }
}
const deleteCreator = (creatorId) => {
  return {
    type: DELETE_CREATOR,
    creatorId: creatorId,
  }
}
const assignBookToCreator = (bookId, creatorId) => {
  return {
    type: ASSIGN_BOOK_TO_CREATOR,
    bookId: bookId,
    creatorId: creatorId,
  }
}
const unassignBookToCreator = (bookId, creatorId) => {
  return {
    type: UNASSIGN_BOOK_TO_CREATOR,
    bookId: bookId,
    creatorId: creatorId,
  }
}

// --- THUNKS --- \\
export const getAllCreatorsThunk = () => async (dispatch) => {
  const response = await fetch('/api/creators')

  if (response.ok){
    const allCreators = await response.json()
    dispatch(getAllCreators(allCreators))
    return allCreators
  } else {
    return ['Unable to fetch.']
  }
}
export const createCreatorThunk = () => async (dispatch) => {
  const response = await fetch('/api/creators')

  if (response.ok){
    const newCreator = await response.json()
    dispatch(createCreator(newCreator))
    return newCreator
  } else {
    return ['Unable to fetch.']
  }
}
export const updateCreatorThunk = (creatorId) => async (dispatch) => {
  const response = await fetch(`/api/creators/${creatorId}`)

  if (response.ok){
    const editedCreator = await response.json()
    dispatch(updateCreator(editedCreator))
    return editedCreator
  } else {
    return ['Unable to fetch.']
  }
}
export const deleteCreatorThunk = (creatorId) => async (dispatch) => {
  const response = await fetch(`/api/creators/${creatorId}`)

  if (response.ok){
    const deletedCreator = await response.json()
    dispatch(deleteCreator(creatorId))
    return deletedCreator
  } else {
    return ['Unable to fetch.']
  }
}
export const assignBookToCreatorThunk = (bookId, creatorId) => async (dispatch) => {
  const response = await fetch(`/api/creators/${creatorId}/books`)

  if (response.ok){
    const newCreatorBook = await response.json()
    dispatch(assignBookToCreator(bookId, creatorId))
    return newCreatorBook
  } else {
    return ['Unable to fetch.']
  }
}
export const unassignBookToCreatorThunk = (bookId, creatorId) => async (dispatch) => {
  const response = await fetch(`/api/creators/${creatorId}/books`)

  if (response.ok){
    const removedCreatorBook = await response.json()
    dispatch(unassignBookToCreator(bookId, creatorId))
    return removedCreatorBook
  } else {
    return ['Unable to fetch.']
  }
}

// --- REDUCER STUFF --- \\

// --- NORMALIZE DATA SPACE --- \\
const initialState = {}


const creatorsReducer = (state = initialState, action) => {
  let newState = {...state}

  switch (action.type){
    // case :
    //   return

    case GET_ALL_CREATORS:
      action.payload.Creators.forEach(
        creator => {
          newState[creator.id] = creator

          // if (newState[creator.id]) {
          //   newState[creator.id] = creator
          // } else {
          //   newState = {
          //     [creator.id]: creator
          //   }
          // }
        }
      )
      return newState;

    case CREATOR_CREATOR:
        newState[action.payload.id] = action.payload
      return newState;

    case UPDATE_CREATOR:
        newState[action.payload.id] = action.payload
      return newState;

    case DELETE_CREATOR:
        delete newState[action.creatorId]
      return newState;

    case ASSIGN_BOOK_TO_CREATOR:
      return newState;

    case UNASSIGN_BOOK_TO_CREATOR:
      return newState;

    default:
      return state;
  }
};

export default creatorsReducer;
