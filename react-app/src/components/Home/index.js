import React, { useEffect, useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import * as bookActions from '../../store/book'
import * as bookshelfActions from '../../store/bookshelf'
import * as creatorActions from '../../store/creator'

import './Home.css'
import CurrentlyReadingPreview from '../Book/BookElements/CurrentlyReadingPreview.js'


const Home = ()=>{
  const dispatch = useDispatch();
  const bookobj = useSelector(state => state.books);
  const bookshelvobj = useSelector(state => state.bookshelves);
  const userBookshelvobj = useSelector(state => state.bookshelves.currentUser);
  const books = Object.values(bookobj) || [];
  const history = useHistory();
  const [errors, setErrors] = useState([]);

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


  let UserShelves=[];
  let ShowCurrent;
  let UserShelfList = [];
  let ShowShelfList;
  let UserWantRead = [];
  let ShowWantRead;
  for (let shelf in userBookshelvobj){
    if (userBookshelvobj[shelf].bookshelfName === "currently reading") {
      if (userBookshelvobj[shelf].Stacks.length > 0) {
        userBookshelvobj[shelf].Stacks.map((stack)=>
          UserShelves.push(stack)
          )
      }
    }
    UserShelfList.push([[userBookshelvobj[shelf].bookshelfName], userBookshelvobj[shelf].Stacks.length])
    if (userBookshelvobj[shelf].bookshelfName === "want to read") {
      if (userBookshelvobj[shelf].Stacks.length > 0) {
        userBookshelvobj[shelf].Stacks.map((stack)=>
          UserWantRead.push(stack)
        )
      }
    }
  }

  ShowShelfList = UserShelfList.map((shelf)=> (
      <div>
        <span>{shelf[1]}    {shelf[0]}</span>
      </div>
  ))

  ShowWantRead = UserWantRead.map((book)=> (
    <NavLink to={`/books/${book.id}`} key={book.id}>
      <div>
        <img src={bookobj[book.id].Cover} alt={book.title}/>
      </div>
    </NavLink>
  ))

  ShowCurrent = UserShelves.map((stack)=> (
    <CurrentlyReadingPreview book={stack}/>
  ))

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
    <div className="home_main_container">
      <div className="home_left_container">
        <div className="home_currently_reading_container">
          <h3>CURRENTLY READING</h3>
          {ShowCurrent}
        </div>
        <div className="home_want_to_read_container">
          <h3>WANT TO READ</h3>
          {ShowWantRead}
        </div>
        <div className="home_bookshelves_list">
          <h3>BOOKSHELVES</h3>
          {ShowShelfList}
        </div>
      </div>
      <div className="home_right_container">
        <div className="home_main_reccomendation_list">
            {RenderElement}
        </div>
      </div>
    </div>
  )
}

export default Home
