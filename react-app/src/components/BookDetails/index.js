import React, { useEffect, useState } from "react";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import './BookDetails.css'
import * as bookActions from '../../store/book'
import * as bookshelfActions from '../../store/bookshelf'
import * as creatorActions from '../../store/creator'

const BookDetails = () => {
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
    <div className="bookdetails_main_container">
      <div className="bookdetails_left_column_sticky_container">
        <div className="bookdetails_left_column_box">
          <div id="cover picture center">
          </div>
          <div id="book actions -shelf status- review status">
          </div>
        </div>
      </div>
      <div className="bookdetails_right_column_container">
        <div id="main content container">
          <div id="title of book">
          </div>
          <div id="book details">
            <div id="creator list">
            </div>
            <div id="review rating">
            </div>
            <div id="book summary">
            </div>
            <div id="genre">
            </div>
          </div>
          <div id="About the author section">
              <div id="about the {role}">
              </div>
              <div id="author details">
                <div id="author picture">
                </div>
                <div id="author name">
                </div>
              </div>
              <div id="author summary">
              </div>
          </div>
        </div>
        <div id="Reccomendations">
        </div>
        <div id="Reviews, if any">
        </div>
      </div>
    {/* exterior book box details bin */}
      {/* book details expanded */}
      {/* creator details expanded */}
      {/* book reccomendations */}
      {/* reviews for book */}
    </div>
  )
}

export default BookDetails
