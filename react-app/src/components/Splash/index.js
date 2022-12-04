import React, { useEffect, useState } from "react";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import './Splash.css'
import * as bookActions from '../../store/book'
import * as bookshelfActions from '../../store/bookshelf'
import * as creatorActions from '../../store/creator'

const Splash = ()=>{
  const dispatch = useDispatch();
  const bookobj = useSelector(state => state.books);
  const bookshelvobj = useSelector(state => state.bookshelves);
  const books = Object.values(bookobj) || [];
  const history = useHistory();
  const [errors, setErrors] = useState([]);

  useEffect(()=> {
    dispatch(bookActions.getAllBooksThunk())
    // dispatch(bookActions.getSingleBookThunk())
    // dispatch(bookActions.removeSingleBookThunk())
    dispatch(bookshelfActions.getAllBookshelvesThunk())
    dispatch(bookshelfActions.getAllCurrentUserBookshelvesThunk())
    dispatch(creatorActions.getAllCreatorsThunk())
  },[dispatch])

  let UserBooks
  UserBooks = books.map((book)=> (
    <NavLink to={`/books/${book.id}`}>
        <div key={book.id} className="splash_discover_reccomendations_books">
          <img src={book.Cover} alt={book.title} />
          "Testing"
        </div>
    </NavLink>
      ))
      console.log("ND ", UserBooks)

   const imgAddress = "https://i.imgur.com/RmycZv9.png"
  return(
    <>
      <div className="splash_main_container">
        <div className="splash_full_length_banner">
          <img src={imgAddress} alt="Reading is Love Banner" />
           <div id="splash_login_module">
            <h1>Meet your next favorite book.</h1>
           </div>
        </div>
        <div className="splash_content_container">
            <div className="splash_description_box_container">
              <div id="splash_description_box_left">
                <h2>Deciding what to read next?</h2>

                <p>You’re in the right place. Tell us what titles or genres you’ve enjoyed in the past, and we’ll give you surprisingly insightful recommendations.</p>
              </div>
              <div id="splash_description_box_right">
                <h2>What are your friends reading?</h2>

                <p>Chances are your friends are discussing their favorite (and least favorite) books on Goodreads.</p>
              </div>
            </div>
            <div id="splash_discover_reccomendations">
                <span id="splash_what_discover_box">
                  What will you discover?
                </span>
                {UserBooks}

            </div>
            <div className="splash_best_books_rating_container">
            </div>
        </div>
      </div>
    </>
  )
}

export default Splash
