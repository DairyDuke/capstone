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
          <div id="bookdetails_left_column_book_cover">
          </div>
          <div id="bookdetails_left_column_book_status">
          </div>
        </div>
      </div>
      <div className="bookdetails_right_column_container">
        <div id="bookdetails_right_column_main_content">
          <div id="bookdetails_right_column_book_title">
          </div>
          <div id="bookdetails_right_column_book_details">
            <div id="bookdetails_right_column_book_creator_list">
            </div>
            <div id="bookdetails_right_column_book_review_rating">
            </div>
            <div id="bookdetails_right_column_book_summary">
            </div>
            <div id="bookdetails_right_column_book_genre">
            </div>
          </div>
          <div id="bookdetails_right_column_creator_section">
              <div id="bookdetails_right_column_creator_role">
              </div>
              <div id="bookdetails_right_column_creator_details">
                <div id="bookdetails_right_column_creator_picture">
                </div>
                <div id="bookdetails_right_column_creator_name">
                </div>
              </div>
              <div id="bookdetails_right_column_creator_summary">
              </div>
          </div>
        </div>
        <div id="bookdetails_right_column_reccomendations">
        </div>
        <div id="bookdetails_right_column_reviews">
        </div>
      </div>
    </div>
  )
}

export default BookDetails
