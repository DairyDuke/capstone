import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import './BookDetails.css'
import * as bookActions from '../../store/book'
import * as bookshelfActions from '../../store/bookshelf'
import EditBookModal from '../Book/EditBook/EditBookModal.js'
import DeleteBookModal from '../Book/DeleteBook/DeleteBookModal.js'
import BookShelfStatusModal from '../BooksInShelves/BookShelfStatusModal.js'

const BookDetails = () => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  // const [showOnShelf, setShowOnShelf] = useState(false)
  const [currentShelf, setCurrentShelf] = useState("")
  const [showEditModal, setShowEditModal] = useState(false)
  const sessionUser = useSelector(state => state.session.user)
  const bookobj = useSelector(state => state.books.singleBook) || [];
  const userBookshelvobj = useSelector(state => state.bookshelves.currentUser) || [];

  const history = useHistory();
  // const [errors, setErrors] = useState([]);
  const bookId = useParams()
  useEffect(()=> {
    if (bookobj && bookobj.Shelved){
      const bookShelfCurrent = bookobj.Shelved.find((shelf) => shelf.userId == sessionUser.id && shelf.protected == true)
      if (bookShelfCurrent) {
        setCurrentShelf(bookShelfCurrent.bookshelfName)
      }
    }
  }, [bookobj])

  console.log(currentShelf)

  useEffect(()=> {
    async function checkBookData(bookId) {
      await dispatch(bookshelfActions.getAllCurrentUserBookshelvesThunk())
      await dispatch(bookActions.getSingleBookThunk(bookId))
      // .then((response)=> console.log('there'))
      .catch(async (response) => {
        await dispatch(bookActions.removeSingleBookThunk(bookId)).then(async ()=> await dispatch(bookActions.getAllBooksThunk())).then(()=>
        history.push('/')
        )
      })
    }
    checkBookData(bookId.bookId)
    // if (bookId) {
    //   console.log("Book, ", bookId)
    // }
    // else {history.push('/')}

  },[dispatch, bookId, history])

  // const addBookToShelf = async (bookId, bookobj) => {
  //   await dispatch(bookActions.addBookToShelfThunk(bookobj, bookId.bookId))
  //   .then(()=> {
  //   // setShowDeleteModal(false)
  //   window.location.reload()
  // }
  //   )
  // }



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
          <DeleteBookModal showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} bookid={bookId.bookId} />
          <EditBookModal showEditModal={showEditModal} setShowEditModal={setShowEditModal} bookData={bookobj} />
          </div>
          <div className="bookdetails_left_column_book_status" id="quick_box">
            {currentShelf && (<BookShelfStatusModal bookId={bookId} currentShelf={currentShelf} />)}
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
              <h2>Review Rating</h2>
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
