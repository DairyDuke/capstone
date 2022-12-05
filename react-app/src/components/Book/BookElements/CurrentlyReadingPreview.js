import React, { useEffect, useState } from "react";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import * as bookActions from '../../../store/book'
import * as bookshelfActions from '../../../store/bookshelf'
import * as creatorActions from '../../../store/creator'
import './CurrentlyReadingPreview'


const CurrentlyReadingPreview = () => {
  const dispatch = useDispatch();
  const bookobj = useSelector(state => state.books);
  const books = Object.values(bookobj) || [];
  const bookshelfobj = useSelector(state => state.bookshelves.currentUser);
  // const bookshelves = Object.values(bookshelfobj) || [];
  const history = useHistory();
  const [errors, setErrors] = useState([]);

  useEffect(()=> {
    dispatch(bookActions.getAllBooksThunk())
    // dispatch(bookActions.getSingleBookThunk(2))
    // dispatch(bookshelfActions.getAllBookshelvesThunk())
    dispatch(bookshelfActions.getAllCurrentUserBookshelvesThunk())
    // dispatch(creatorActions.getAllCreatorsThunk())
  },[dispatch])

  // need to pull books, then pull author/creator
  // title, summary, id, genre, createdAt, updatedAt
  let UserShelves;
  for (let shelf in bookshelfobj){

    if (bookshelfobj[shelf].bookshelfName === "read") {

      UserShelves = bookshelfobj[shelf]
    }
  }

// id genre summary title cat,uat
// bookobj[book.id].Cover
// bookobj[book.id].Creators
// bookobj[book.id].AverageRating
  let PreviewBook = []
  if (UserShelves && UserShelves.Stacks.length > 1 ){

      PreviewBook = UserShelves['Stacks'].map((book)=>
  (
    <div className="currently_reading_preview_container">
      <a><img src={bookobj[book.id].Cover} alt={book.title} /></a>
      <div className="currently_reading_preview_info_box">
        <div className="currently_reading_preview_book_title">
          {book.title}
        </div>
        <div className="currently_reading_preview_author_name">
          by {bookobj[book.id]["Creators"].find((creator)=> creator['role'] === "author")['name'].toUpperCase()}
        </div>
        <div>
        {bookobj[book.id]['AverageRating']}
        </div>
        <div className="currently_reading_preview_summary">
          {book.summary}
        </div>
      </div>
    </div>
  )
  )}


  // if (!bookshelves) {
  //   return (
  //     <>
  //     <h1>Get to Reading!</h1>
  //     </>
  //   )
  // } else {
  return (
    <>
    "hey"
    {PreviewBook}
    </>
  )
}
export default CurrentlyReadingPreview
