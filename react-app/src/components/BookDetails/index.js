import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import './BookDetails.css'
import * as bookActions from '../../store/book'
// import * as bookshelfActions from '../../store/bookshelf'
import EditBookModal from '../Book/EditBook/EditBookModal.js'
import DeleteBookModal from '../Book/DeleteBook/DeleteBookModal.js'
// import CreateBookModal from '../Book/CreateBook/CreateBookModal.js'
import BookShelfStatusModal from '../BooksInShelves/BookShelfStatusModal.js'
import LoginFormModalButton from '../auth/Login/LoginFormModalButton';


const BookDetails = () => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const params = useParams()
  const bookId = params["bookId"]

  // Variables for the Edit, Delete, and Shelf Modals
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  // const [showModal, setShowModal] = useState(false)

  // Store Data
  const user = useSelector(state => state.session.user) || null
  const [sessionUser, setSessionUser] = useState(user)
  const book = useSelector(state => state.books.singleBook) || []
  const [bookobj, setBookobj] = useState(book)

  const [currentShelf, setCurrentShelf] = useState("")
  // UseEfect to Load data
  useEffect(()=> {
    dispatch(bookActions.getSingleBookThunk(bookId))
  },[dispatch, bookId])

  // UseEffect to Update State Values
  useEffect(()=>{
    setBookobj(book)
    setCurrentShelf(bookobj['CurrentShelved'])
  }, [book, bookobj])
  // const addBookToShelf = async (bookId, bookobj) => {
  //   await dispatch(bookActions.addBookToShelfThunk(bookobj, bookId.bookId))
  //   .then(()=> {
  //   // setShowDeleteModal(false)
  //   window.location.reload()
  // }
  //   )
  // }
let AverageRating = 0;
let MathRating = "Not Rated!";
if (bookobj.Reviewed && bookobj.Reviewed.length > 0 ) {

  for (let review in bookobj.Reviewed){
    AverageRating = AverageRating + bookobj.Reviewed[review].rating
  }
  MathRating = AverageRating / bookobj.Reviewed.length

}
// {bookobj.Reviewed.length > 0 : }
  // useEffect(()=> {
  //   if (bookobj) {
  //     // const bookShelfCurrent = bookobj.Shelved.find((shelf) => shelf.userId === sessionUser.id && shelf.protected === true)
  //     // if (bookShelfCurrent) {
  //       setCurrentShelf(bookobj['CurrentShelved'])
  //     // }
  //   }
  // }, [sessionUser, currentShelf])
  let creators;
  if (bookobj && bookobj["Creators"] && bookobj["Creators"].length > 0) {
    creators = bookobj["Creators"].map((creator) =>(
    <div key={creator.id}>
      <div>
        <div id="bookdetails_right_column_creator_role">
          <h3>{creator.role}</h3>
        </div>
        <div id="bookdetails_right_column_creator_picture">
          <img src={creator.creatorImageUrl} alt={creator.name} />
        </div>
      </div>
      <div id="bookdetails_right_column_creator_details">
        <div id="bookdetails_right_column_creator_name">
            <h3>{creator.name}</h3>
        </div>
      <div id="bookdetails_right_column_creator_summary">
        <p>{creator.summary}</p>
      </div>
      </div>
    </div>
    ))
  } else { creators = (
  <>
    <h2>No Creators linked to this book as of yet!</h2>
      <h3> Do you know who created this book? Contact your Librarian today!</h3>
  </>
  )}
  return (
    <div className="bookdetails_main_container">
      <div className="bookdetails_left_column_sticky_container">
        <div className="bookdetails_left_column_box">
          <div id="bookdetails_left_column_book_cover">
            <img src={bookobj.Cover} alt={bookobj.title} />
          </div>
          <div id="quick_box">
         {sessionUser && (<div className='bookdetails_edit_button' onClick={() => setShowEditModal(true)}>
            <button id="edit-reply-button" className='edit-post-button edit-delete-post interface-text'>
              Edit Book
            </button>
          </div>)}
          {sessionUser && (<div className='bookdetails_delete_button' onClick={() => setShowDeleteModal(true)}>
          <button id="delete-reply-button" className='delete-post-button edit-delete-post interface-text'>
              Delete Book
            </button>
          </div>)}
          <DeleteBookModal showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} bookid={bookId} />
          <EditBookModal showEditModal={showEditModal} setShowEditModal={setShowEditModal} bookData={bookobj} />
          </div>
          <div className="bookdetails_left_column_book_status" id="quick_box">
            {/* <CreateBookModal showModal={showModal} setShowModal={setShowModal}/> */}
            {sessionUser ? (<BookShelfStatusModal bookId={bookId} currentShelf={currentShelf} />) : (<LoginFormModalButton linkText={"Add To Shelf"} />)}
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
              <h2>Average Rating: {MathRating}</h2>
            </div>
            <div id="bookdetails_right_column_book_summary">
              <p>{bookobj.summary}</p>
            </div>
            <div id="bookdetails_right_column_book_genre">
              <h3>Genre: {bookobj.genre}</h3>
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
