import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// Individual Reducer Files
import session from './session'
import booksReducer from './book'
import bookshelfReducer from './bookshelf'
import creatorsReducer from './creator'
// import reviewReducer from './review'

const rootReducer = combineReducers({
  session,
  books: booksReducer,
  bookshelves: bookshelfReducer,
  creators: creatorsReducer,
  // reviews: reviewReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
