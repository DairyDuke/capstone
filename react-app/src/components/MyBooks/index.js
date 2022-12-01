import React, { useEffect, useState } from "react";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import CreateEditBookShelf from '../CreateEditBookShelf'
import './MyBooks.css'


const MyBooks = ()=>{
  const dispatch = useDispatch();
  const bookobj = useSelector(state => state.books);
  const books = Object.values(bookobj) || [];
  const history = useHistory();
  const [errors, setErrors] = useState([]);

  // useEffect(()=> {
  //   dispatch(bookActions.getAllBooksThunk())
  //   dispatch(bookActions.getSingleBookThunk(2))
  //   dispatch(bookshelfActions.getAllBookshelvesThunk())
  //   dispatch(bookshelfActions.getAllCurrentUserBookshelvesThunk())
  //   dispatch(creatorActions.getAllCreatorsThunk())
  // },[dispatch])

  // let DisplayBooks;
  // if (books.length > 1 ) {
  //   DisplayBooks =  groups.map((group) => <GroupDetail group={group}/>)

  // } else {
  //   DisplayGroups = (
  //   <>
  //    <h2> No groups yet! </h2>
  //   </>
  //   )
  // }


   const imgAddress = "https://juneau.org/wp-content/uploads/2021/09/Fall-in-love-with-reading-banner-1200x382.jpg"
  return(
    <>
      <div className="splash_main_container">
        <div className="splash_full_length_banner">
          <img src={imgAddress} alt="Reading is Love Banner" />
          {/* <h1>Welcome👋</h1> */}
           <div id="splash_login_module">
              <h2>Discover & read more</h2>
              <div>
                "Create Bookshelf"
                <CreateEditBookShelf />
              </div>
              <div>
                "Already a Member?" "Log In"
              </div>
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
                <div className="splash_discover_reccomendations_books">
                </div>
                <div className="splash_discover_reccomendations_books">
                </div>
                <div className="splash_discover_reccomendations_books">
                </div>
            </div>
            <div className="splash_best_books_rating_container">
            </div>
        </div>
      </div>
    </>
  )
}

export default MyBooks
