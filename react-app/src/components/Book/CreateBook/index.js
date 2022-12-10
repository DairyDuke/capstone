import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './CreateBook.css'
import * as bookActions from '../../../store/book'


const CreateBook = ({showModal, setShowModal, status}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const creators = useSelector(state => state.creators)
  // Determines if the new comment button exists or not.
  const [showNewBookForm, setShowNewBookForm] = useState(showModal || false);
  // Actual form data:
  const [bookTitle, setBookTitle] = useState("");
  const [bookGenre, setBookGenre] = useState("");
  const [bookSummary, setBookSummary] = useState("");
  const [bookCoverImageUrl, setBookCoverImageUrl] = useState("");
  // Error Handling
  const [errors, setErrors] = useState([]);
  // Character Counter
  const [bookTitleCharCount, setBookTitleCharCount] = useState(0);
  const [bookGenreCharCount, setBookGenreCharCount] = useState(0);
  const [bookSummaryCharCount, setBookSummaryCharCount] = useState(0);
  const [bookUrlCharCount, setBookUrlCharCount] = useState(0);

  const [disableSubmit, setDisableSubmit] = useState(true);
  const tx = document.getElementsByTagName("textarea");
  for (let i = 1; i < tx.length; i++) {
    tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px");
    tx[i].addEventListener("input", OnInput, false);
  }
  function OnInput() {
    this.style.height = 0;
    this.style.height = (this.scrollHeight) + "px";
  }
  const cancelSubmit = async () => {
    setShowNewBookForm(false)
    setShowModal(false)
    setBookTitle("")
    setBookCoverImageUrl("")
    setBookSummary("")
    setBookGenre("")
    setErrors([])
    setBookTitleCharCount(0)
    setBookGenreCharCount(0)
    setBookSummaryCharCount(0)
    setBookUrlCharCount(0)
  }

  const handleHidden = () => {
  //   let element = document.getElementsByClassName("create_book_submit_button");
  //   if (element && element.hidden) {
  //     element[0].hidden = false;
  //  } else {
  //   element[0].hidden = true;
  //  }
  }

  useEffect(() => {
    if (bookTitleCharCount > 250) {
      setDisableSubmit(true)
      setErrors("Title must be between 1 and 250 characters.")
    } else if (bookTitleCharCount > 0) {
      setDisableSubmit(false)
      handleHidden()
    } else {
      setDisableSubmit(true)
    }
    if (bookSummaryCharCount > 1500) {
      setDisableSubmit(true)
      setErrors("Book summary can be between 0 and 1500 characters.")
    } else if (bookTitleCharCount > 0) {
      setDisableSubmit(false)
      handleHidden()
    } else {
      setDisableSubmit(true)
    }
    if (bookGenreCharCount > 100) {
      setDisableSubmit(true)
      setErrors("Genre must be between 1 and 100 characters.")
    } else if (bookTitleCharCount > 0) {
      setDisableSubmit(false)
      handleHidden()
    } else {
      setDisableSubmit(true)
    }
    if (bookUrlCharCount > 100) {
      setDisableSubmit(true)
      setErrors("Book Cover must be between 0 and 100 characters.")
    } else if (bookUrlCharCount >= 0) {
      setDisableSubmit(false)
      handleHidden()
    } else {
      setDisableSubmit(true)
    }
  }, [bookTitleCharCount, bookGenreCharCount, bookSummaryCharCount, bookUrlCharCount])

  // useEffect(() => {
  //   if (showModal) {
  //     document.body.style.overflow = 'hidden';
  //   }
  //   return () => {
  //     document.body.style.overflow = 'unset';
  //     setShowModal(false)
  //   }
  // }, [showModal, setShowModal])

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    if (errors) { }
    const bookDataObject = {
     "title": bookTitle,
     "genre": bookGenre,
     "summary": bookSummary,
     "cover_image_url": bookCoverImageUrl
    }
    const newBook = await dispatch(bookActions.createBookThunk(bookDataObject))
    .then(async (newBook) => {
      // const data = await newBook.json()
      console.log(newBook)
      cancelSubmit()
      history.push(`/books/${newBook.id}`)
      window.scrollTo(0,0)

    })
    .catch(async (newBook) => {
      console.log(newBook)
      // const data = await newBook.JSON()
      // const data = await newBook.json();
      if (newBook && newBook.errors) {
        setErrors(Object.values(newBook.errors));
        // This console log is to make react happy - do not delete
        console.log("Errors "+errors)
      }
    })
  };
    // if (newBook.ok) {
    //   window.reload()
    //   window.scrollTo(0,0)
    // }

  return(
    <div>
      {/* {showNewBookForm === false && (
        <>
          <div id="create_book_new_button" onClick={()=> setShowNewBookForm(true)}>
            <span>Create Book</span>
          </div>
        </>
      )} */}

      {showNewBookForm && (
        <>
          <form className="create_book_form" onSubmit={onSubmit}>
          <div id="signin_declaration">
        <h1>my reader's journey</h1>
        <h3> Create Book </h3>
      </div>
          <div className="create_book_form_input_box">
            <label>Book's Title:
            <input
              name='Book Title'
              type='text'
              placeholder='Full Title Here'
              value={bookTitle}
              required
              maxLength={250}
              onChange={(e)=> {
                setBookTitle(e.target.value)
                setBookTitleCharCount(e.target.value.length)}}
              />
              </label>
              {bookTitleCharCount > 0 && (<div className="create_book_form_input_count">{bookTitleCharCount}/250</div>)}
              {/* <div>
                {!!errors && (
                  <>
                  {errors}
                  </>)}
              </div> */}
          </div>
          <div className="create_book_form_input_box">
            <label>Book's Genre:
            <input
              name='Book Genre'
              type='text'
              placeholder='Pick the most relevant!'
              value={bookGenre}
              required
              maxLength={100}
              onChange={(e)=> {
                setBookGenre(e.target.value)
                setBookGenreCharCount(e.target.value.length)}}
              />
              </label>
              {bookGenreCharCount > 0 && (<div className="create_book_form_input_count">{bookGenreCharCount}/100</div>)}
              {/* <div>
                {!!errors && (
                  <>
                  {errors}
                  </>)}
              </div> */}
          </div>
          <div className="create_book_form_input_box">
            <label>Book's Cover Image (URL):
            <input
              name='Book Cover Image URL'
              type='text'
              placeholder='Full HTTPS or leave blank.'
              value={bookCoverImageUrl}
              maxLength={100}
              onChange={(e)=> setBookCoverImageUrl(e.target.value)}
              />
              </label>
              {bookUrlCharCount > 0 && (<div className="create_book_form_input_count">{bookUrlCharCount}/100</div>)}

              {/* <div>
                {!!errors && (
                  <>
                  {errors}
                  </>)}
              </div> */}
          </div>
          <div className="create_book_form_input_box">
            <label>Book's Summary:
            <textarea
              name='Book Summary'
              type='text'
              placeholder='Concise, Spoiler-free Summary Here!'
              value={bookSummary}
              maxLength={1500}
              onChange={(e)=> {
                setBookSummary(e.target.value)
                setBookSummaryCharCount(e.target.value.length)}}
              />
              </label>
              {bookSummaryCharCount > 0 && (<div className="create_book_form_input_count">{bookSummaryCharCount}/1500</div>)}
              {/* <div>
                {!!errors && (
                  <>
                  {errors}
                  </>)}
              </div> */}
          </div>
          <div className='create_book_form_footer'>
            <button className='create_book_cancel_button' onClick={cancelSubmit}>cancel</button>
            <button className='create_book_submit_button' type="submit" disabled={disableSubmit}>add</button>
          </div>
          </form>
        </>
      )}
    </div>
  )
}

export default CreateBook
