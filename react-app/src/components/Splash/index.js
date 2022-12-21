import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import './Splash.css'
import * as bookActions from '../../store/book'
import * as bookshelfActions from '../../store/bookshelf'
import * as creatorActions from '../../store/creator'

const Splash = ()=>{
  const dispatch = useDispatch();
  const bookobj = useSelector(state => state.books);
  // const bookshelvobj = useSelector(state => state.bookshelves);
  // const books = Object.values(bookobj) || [];
  // const history = useHistory();
  // const [errors, setErrors] = useState([]);

  // const tx = document.getElementsByClassName("growing_paragraph");
  // for (let i = 1; i < tx.length; i++) {
  //   tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px");
  //   tx[i].addEventListener("input", OnInput, false);
  // }
  // function OnInput() {
  //   this.style.height = 0;
  //   this.style.height = (this.scrollHeight) + "px";
  // }

  useEffect(()=> {
    dispatch(bookActions.getAllBooksThunk())
    // dispatch(bookActions.getSingleBookThunk())
    // dispatch(bookActions.removeSingleBookThunk())
    dispatch(bookshelfActions.getAllBookshelvesThunk())
    dispatch(bookshelfActions.getAllCurrentUserBookshelvesThunk())
    dispatch(creatorActions.getAllCreatorsThunk())
  },[dispatch])

  let UserBooks = []
  let RenderElement

  for (let book in bookobj) {
    if (book !== "singleBook") {
      UserBooks.push(bookobj[book])
    }
  }
  if (UserBooks && UserBooks.length > 1) {
      RenderElement = UserBooks.map((book)=>
    (
      <NavLink to={`/books/${book.id}`} key={book.id}>
          <div className="splash_discover_reccomendations_books">
            <img src={book.Cover} alt={book.title} />
            <div className="splash_discover_reccomendations_details">
              <div className="splash_discover_reccomendations_title">
                <h2>{book.title}</h2>
              </div>
              <div className="splash_discover_reccomendations_averagerating">
                <h3>{book.AverageRating}</h3>
              </div>
              <div className="splash_discover_reccomendations_averagerating">
                <h3>{book.Creators.map((creator)=> (
                  <span className="splash_creator_list">
                  {creator.role}: {creator.name}
                  </span>
                ))}</h3>
              </div>
              <div className="splash_discover_reccomendations_summary">
                <p className="growing_paragraph">{book.summary}</p>
              </div>
            </div>
          </div>
      </NavLink>
        )
  )}



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

                <p>Chances are your friends are discussing their favorite (and least favorite) books on their own Reader's Journey!</p>
              </div>
            </div>
            <div id="splash_discover_reccomendations">
                <span id="splash_what_discover_box">
                  What will you discover?
                </span>
                {RenderElement}

            </div>
            <div className="splash_best_books_rating_container">
            </div>
        </div>
      </div>
    </>
  )
}

export default Splash
