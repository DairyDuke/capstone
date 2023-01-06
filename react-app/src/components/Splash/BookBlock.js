import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux"
import './Splash.css'
import * as bookActions from '../../store/book'
// import * as bookshelfActions from '../../store/bookshelf'
// import * as creatorActions from '../../store/creator'

const BookBlock = ({book}) => {
  const dispatch = useDispatch();
  const dispatchSingle = (bookId) => {
    dispatch(bookActions.getSingleBookThunk(bookId))
  }

  return  (
    <>
    <NavLink to={`/books/${book.id}`} key={book.id} onClick={()=> dispatchSingle(book.id)}>
        <div className="splash_discover_reccomendations_books">
          <img src={book.Cover} alt={book.title} onError={e => { e.currentTarget.src = "https://i.imgur.com/iL99VfD.jpg"; }}/>
          <div className="splash_discover_reccomendations_details">
            <div className="splash_discover_reccomendations_title">
              <h2>{book.title}</h2>
            </div>
            <div className="splash_discover_reccomendations_averagerating">
              <h3>AVG. Rating: {book.AverageRating}</h3>
            </div>
            <div className="splash_discover_reccomendations_averagerating">
              <h3>{book.Creators.map((creator)=> (
                <span className="splash_creator_list">
                {creator.role}: {creator.name}
                </span>
              ))}</h3>
            </div>
            <div className="splash_discover_reccomendations_summary">
              <p id="splash_discover_reccomendations_summary_growing_paragraph">{book.summary}</p>
            </div>
          </div>
        </div>
    </NavLink>
    </>
      )
}

export default BookBlock
