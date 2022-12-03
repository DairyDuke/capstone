import React, { useEffect, useState } from "react";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
// Bookshelf
import CreateBookShelf from '../Bookshelf/CreateBookShelf'
import EditBookshelf from '../Bookshelf/EditBookshelf'
import DeleteBookshelfModal from '../Bookshelf/DeleteBookshelf/DeleteBookshelfModal.js'
// Book
import CreateBook from '../Book/CreateBook'
import EditBookModal from '../Book/EditBook/EditBookModal.js'
import DeleteBookModal from '../Book/DeleteBook/DeleteBookModal.js'
// Creator
import CreateCreator from '../Creator/CreateCreator'

import * as bookActions from '../../store/book'
import './MyBooks.css'


const MyBooks = ()=>{
  const dispatch = useDispatch();
  const bookobj = useSelector(state => state.books);
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showShelfDeleteModal, setShowShelfDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const books = Object.values(bookobj) || [];
  const history = useHistory();
  const [errors, setErrors] = useState([]);

  useEffect(()=> {
    dispatch(bookActions.getAllBooksThunk())
    dispatch(bookActions.getSingleBookThunk(2))
    // dispatch(bookshelfActions.getAllBookshelvesThunk())
    // dispatch(bookshelfActions.getAllCurrentUserBookshelvesThunk())
    // dispatch(creatorActions.getAllCreatorsThunk())
  },[dispatch])

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
          <h1>Welcome👋</h1>
          <h2> This page is being used as a temp testing grounds!</h2>
           <div id="splash_login_module">
              <div>
                <h3>Create Book --></h3>
                <span>
                  <CreateBook />
                </span>
                <div className='comment-edit-option edit-reply-option' onClick={() => setShowEditModal(true)}>
                  <button id="edit-reply-button" className='edit-post-button edit-delete-post interface-text'>
                    Edit
                  </button>
                </div>
                <div className='comment-edit-option delete-reply-option' onClick={() => setShowDeleteModal(true)}>
                  <button id="delete-reply-button" className='delete-post-button edit-delete-post interface-text'>
                    Delete
                  </button>
                </div>
              </div>
              <DeleteBookModal showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} bookid={books.pop()} />
              <EditBookModal showEditModal={showEditModal} setShowEditModal={setShowEditModal} bookData={books.pop()} />

              <div>
                <h3>Create Bookshelf --></h3>
                <span>
                  <CreateBookShelf />
                </span>
                  <EditBookshelf shelfname={1} shelfId={1} />
                <div className='comment-edit-option delete-reply-option' onClick={() => setShowShelfDeleteModal(true)}>
                  <button id="delete-reply-button" className='delete-post-button edit-delete-post interface-text'>
                    Delete
                  </button>
                </div>
              </div>
              <DeleteBookshelfModal showDeleteModal={showShelfDeleteModal} setShowDeleteModal={setShowShelfDeleteModal} bookshelfid={1} />

              <div>
                <h3>Create Creator --></h3>
                <span>
                  <CreateCreator />
                </span>
              </div>
              <div>

              </div>
           </div>
        </div>
        <div className="splash_content_container">
            <div className="splash_description_box_container">
              <div id="splash_description_box_left">
                {/* <h2>Deciding what to read next?</h2>

                <p>You’re in the right place. Tell us what titles or genres you’ve enjoyed in the past, and we’ll give you surprisingly insightful recommendations.</p> */}
              </div>
              <div id="splash_description_box_right">
                {/* <h2>What are your friends reading?</h2>

                <p>Chances are your friends are discussing their favorite (and least favorite) books on Goodreads.</p> */}
              </div>
            </div>
            <div id="splash_discover_reccomendations">
                <span id="splash_what_discover_box">
                  {/* What will you discover? */}
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
