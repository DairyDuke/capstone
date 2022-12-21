import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import * as bookActions from '../../../store/book'
import * as bookshelfActions from '../../../store/bookshelf'
// import * as creatorActions from '../../../store/creator'
import './CurrentlyReadingPreview.css'


const CurrentlyReadingPreview = ({book}) => {
  //cat,uat, id, genre, summary, title
  // what we need - creator.
  const dispatch = useDispatch();
  const bookobj = useSelector(state => state.books);
  // const history = useHistory();
  // const [creatorList, setCreatorList] = useState([])
  // const [errors, setErrors] = useState([]);

  useEffect(()=> {
    dispatch(bookActions.getAllBooksThunk())
    // dispatch(bookActions.getSingleBookThunk(2))
    // dispatch(bookshelfActions.getAllBookshelvesThunk())
    dispatch(bookshelfActions.getAllCurrentUserBookshelvesThunk())
    // dispatch(creatorActions.getAllCreatorsThunk())
  },[dispatch])

  // console.log("This is currently reading, ", book)
  // console.log("This is currently reading 2, ", bookobj)
  // console.log("This is currently reading 3, ", bookobj[book.id])
  // console.log(bookobj[book.id].Creators)
  // need to pull books, then pull author/creator
  // title, summary, id, genre, createdAt, updatedAt
  // let UserShelves;
  // for (let shelf in bookshelfobj){

  //   if (bookshelfobj[shelf].bookshelfName === "read") {

  //     UserShelves = bookshelfobj[shelf]
  //   }
  // }

// id genre summary title cat,uat
// bookobj[book.id].Cover
// bookobj[book.id].Creators
// bookobj[book.id].AverageRating
  // let PreviewBook = []
  // if (UserShelves && UserShelves.Stacks.length > 1 ){

  //     PreviewBook = UserShelves['Stacks'].map((book)=>
  // (
  //   <div className="currently_reading_preview_container">
  //     <a><img src={bookobj[book.id].Cover} alt={book.title} /></a>
  //     <div className="currently_reading_preview_info_box">
  //       <div className="currently_reading_preview_book_title">
  //         {book.title}
  //       </div>
  //       <div className="currently_reading_preview_author_name">
  //         by {bookobj[book.id]["Creators"].find((creator)=> creator['role'] === "author")['name'].toUpperCase()}
  //       </div>
  //       <div>
  //       {bookobj[book.id]['AverageRating']}
  //       </div>
  //       <div className="currently_reading_preview_summary">
  //         {book.summary}
  //       </div>
  //     </div>
  //   </div>
  // )
  // )}


  // if (!bookshelves) {
  //   return (
  //     <>
  //     <h1>Get to Reading!</h1>
  //     </>
  //   )
  // } else {
  if (!book || !bookobj[book.id]) {
    return (
      <>
      </>
    )
  } else {
  return   (
    <div className="currently_reading_preview_container">
      <NavLink to={`/books/${book.id}`} key={book.id}>
        <img src={bookobj[book.id].Cover} alt={book.title} />
      </NavLink>
      <div className="currently_reading_preview_info_box">
        <div className="currently_reading_preview_book_title">
          <h2>{book.title}</h2>
        </div>
        <div className="currently_reading_preview_author_name">
          by {bookobj[book.id]["Creators"].find((creator)=> creator['role'] === "author")['name']}
        </div>
        <div>
        {bookobj[book.id]['AverageRating']}
        </div>
        <div className="currently_reading_preview_summary">
          {/* {book.summary} */}
        </div>
      </div>
    </div>
  )}
}
export default CurrentlyReadingPreview
