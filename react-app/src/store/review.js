// --- Other Imports --- \\

// --- CONSTANT TYPES --- \\
const GET_ALL_REVIEWS = 'reviews/getAllReviews';
const GET_ALL_REVIEWS_FOR_BOOK = 'reviews/getAllReviewsForBook';
const CREATE_REVIEW_FOR_BOOK = 'reviews/createReviewForBook';
const EDIT_REVIEW_FOR_BOOK = 'reviews/editReviewForBook';
const DELETE_REVIEW_FOR_BOOK = 'reviews/deleteReviewForBook'

// --- ACTION CREATORS --- \\

const getAllReviews = (reviews) => {
  return {
    type: GET_ALL_REVIEWS,
    payload: reviews,
  };
};
const getAllReviewsForBook = (reviews) => {
  return {
    type: GET_ALL_REVIEWS_FOR_BOOK,
    payload: reviews,
  };
};
const createReviewForBook = (newReview) => {
  return {
    type: CREATE_REVIEW_FOR_BOOK,
    payload: newReview,
  };
};
const editReviewForBook = (reviewData) => {
  return {
    type: EDIT_REVIEW_FOR_BOOK,
    payload: reviewData,
  };
};
const deleteReviewForBook = (reviewData) => {
  return {
    type: DELETE_REVIEW_FOR_BOOK,
    payload: reviewData,
  };
};


// --- THUNKS --- \\



// --- REDUCER STUFF --- \\

// --- NORMALIZE DATA SPACE --- \\
