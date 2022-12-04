import React, { useEffect, useState } from "react";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import * as bookActions from '../../store/book'
import * as bookshelfActions from '../../store/bookshelf'
import * as creatorActions from '../../store/creator'

import './Home.css'
import CurrentlyReadingPreview from '../Book/BookElements/CurrentlyReadingPreview.js'

const Home = ()=> {
  const dispatch = useDispatch();
  const bookobj = useSelector(state => state.books);
  const books = Object.values(bookobj) || [];
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  useEffect(()=> {
    dispatch(bookActions.getAllBooksThunk())
    dispatch(bookActions.getSingleBookThunk(2))
    dispatch(bookshelfActions.getAllBookshelvesThunk())
    dispatch(bookshelfActions.getAllCurrentUserBookshelvesThunk())
    dispatch(creatorActions.getAllCreatorsThunk())
  },[dispatch])

  return (
    <div className="home_main_container">
      <div className="home_left_container">
        <div className="home_currently_reading_container">
          <CurrentlyReadingPreview />
        </div>
        <div className="home_want_to_read_container">
        </div>
        <div className="home_bookshelves_list">
        </div>
      </div>
      <div className="home_right_container">
        <div className="home_main_reccomendation_list">

        </div>
      </div>
    </div>
  )
}

export default Home
