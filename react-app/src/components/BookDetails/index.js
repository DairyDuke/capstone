import React, { useEffect, useState } from "react";
import { Redirect, useHistory, NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import './BookDetails.css'
import * as bookActions from '../../store/book'

const BookDetails = () => {
  const dispatch = useDispatch();
  const bookobj = useSelector(state => state.books.singleBook) || [];
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const bookId = useParams()
  console.log("HE", bookId.bookId)
  // book traits
  // id, title, genre, Cover, Shelved, Creators - [{}], Reviewed [{}] cAt,uAt

  useEffect(()=> {
    if (bookId) dispatch(bookActions.getSingleBookThunk(bookId.bookId))

  },[dispatch])


  let creators;
  if (bookobj["Creators"] && bookobj["Creators"].length > 0) {
    creators = bookobj["Creators"].map((creator) =>(
    <div key={creator.id}>
      <div id="bookdetails_right_column_creator_role">
        {creator.role}
      </div>
      <div id="bookdetails_right_column_creator_details">
        <div id="bookdetails_right_column_creator_picture">
          <img src={creator.creatorImageUrl} alt={creator.name} />
        </div>
        <div id="bookdetails_right_column_creator_name">
            <h3>{creator.name}</h3>
        </div>
      </div>
      <div id="bookdetails_right_column_creator_summary">
        <p>{creator.summary}</p>
      </div>
    </div>
    ))
  }
  return (
    <div className="bookdetails_main_container">
      <div className="bookdetails_left_column_sticky_container">
        <div className="bookdetails_left_column_box">
          <div id="bookdetails_left_column_book_cover">
            <img src={bookobj.Cover} alt={bookobj.title} />
          </div>
          <div id="bookdetails_left_column_book_status">
            {bookobj.Shelved}
          </div>
        </div>
      </div>
      <div className="bookdetails_right_column_container">
        <div id="bookdetails_right_column_main_content">
          <div id="bookdetails_right_column_book_title">
            <h2>{bookobj.title}</h2>
          </div>
          <div id="bookdetails_right_column_book_details">
            <div id="bookdetails_right_column_book_creator_list">
            </div>
            <div id="bookdetails_right_column_book_review_rating">
              <h2></h2>
            </div>
            <div id="bookdetails_right_column_book_summary">
              <p>{bookobj.summary}</p>
            </div>
            <div id="bookdetails_right_column_book_genre">
              <h3>{bookobj.genre}</h3>
            </div>
          </div>
          <div id="bookdetails_right_column_creator_section">
            {creators}
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
