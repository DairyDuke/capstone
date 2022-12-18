import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux"
import * as bookActions from '../../../store/book'
import './EditBook.css'

const EditBook = ({ bookData, setShowEditModal, showEditModal }) => {
  const dispatch = useDispatch()

  // Actual form data:
  const [bookObj, setBookObj] = useState({...bookData})
  // const [bookTitle, setBookTitle] = useState("");
  // const [bookGenre, setBookGenre] = useState("");
  // const [bookSummary, setBookSummary] = useState("");
  // const [bookCoverImageUrl, setBookCoverImageUrl] = useState("");
  // Error Handling
  const [errors, setErrors] = useState([])
  // ({title: "", genre: "", summary: "", url: "", form: "", newError: "" });
  // Character Counter
  const [bookTitleCharCount, setBookTitleCharCount] = useState(0);
  const [bookGenreCharCount, setBookGenreCharCount] = useState(0);
  const [bookSummaryCharCount, setBookSummaryCharCount] = useState(0);
  const [bookUrlCharCount, setBookUrlCharCount] = useState(0);

  const [disableSubmit, setDisableSubmit] = useState(true);
  const defaultImg = "https://i.imgur.com/iL99VfD.jpg"

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
    setShowEditModal(false)
    setBookObj({...bookData})
    // setBookTitle("")
    // setBookCoverImageUrl("")
    // setBookSummary("")
    // setBookGenre("")
    setErrors([])
      // {title: "", genre: "", summary: "", url: "", form: "", newError: "" })
    setBookTitleCharCount(0)
    setBookGenreCharCount(0)
    setBookSummaryCharCount(0)
  }

  useEffect(() => {
    if (showEditModal) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [showEditModal])

  // const editBook = (bookData) => {
  //   dispatch(bookActions.editBookThunk(bookData))
  // }

  useEffect(() => {
    if (bookTitleCharCount > 250) {
      setDisableSubmit(true)
      setErrors((prevState) => {
     return {...prevState, title: "Title must be between 1 and 250 characters."}
    })
    } else if (bookTitleCharCount > 0) {
      setDisableSubmit(false)
    } else {
      setDisableSubmit(true)
    }
    if (bookSummaryCharCount > 1500) {
      setDisableSubmit(true)
      setErrors((prevState) => {
     return {...prevState, summary:"Book summary must be between 0 and 1500 characters."}})
    } else if (bookTitleCharCount >= 0) {
      setDisableSubmit(false)
    } else {
      setDisableSubmit(true)
    }
    if (bookGenreCharCount > 100) {
      setDisableSubmit(true)
      setErrors((prevState) => {
     return {...prevState, genre:"Genre must be between 0 and 100 characters."}})
    } else if (bookTitleCharCount >= 0) {
      setDisableSubmit(false)
    } else {
      setDisableSubmit(true)
    }
    if (bookUrlCharCount > 250) {
      setDisableSubmit(true)
      setErrors((prevState) => {
     return {...prevState, url:"Url must be between 1 and 250 characters."}})
    } else if (bookUrlCharCount >= 0) {
      setDisableSubmit(false)
    } else {
      setDisableSubmit(true)
    }
    // if (bookTitleCharCount === 0
    //   && bookGenreCharCount === 0
    //   && bookSummaryCharCount === 0
    //   && bookUrlCharCount === 0) {
    //     setErrors((prevState) => {
    //     return {...prevState, form:"In order to submit change, you must edit one value."}})

    // console.log(errors)
    //   }
  }, [bookTitleCharCount, bookGenreCharCount, bookSummaryCharCount, bookUrlCharCount])


  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors([])

    let currentImg = defaultImg
    if (bookObj.Cover) {
      currentImg = bookObj.Cover
    }

    const bookDataObject = {
      "id": bookObj.id,
     "title": bookObj.title,
     "genre": bookObj.genre,
     "summary": bookObj.summary,
     "coverImageURL": currentImg
    }
    let id = bookObj.id
    const newBook = await dispatch(bookActions.editBookThunk(bookDataObject, id))
    if (newBook) {
      console.log("Test")
      setErrors(newBook.errors)
    } else {
     await dispatch(bookActions.getSingleBookThunk(bookDataObject.id))
      cancelSubmit()
    }

    // .then((newBook) => {
    //   console.log("This")
    //   console.log(newBook)
    //   if (newBook.errors) {
    //     setErrors(newBook.errors)
    //     // setErrors((prevState) => {
    //     //   return {...prevState, newBook.errors}});
    //     // This console log is to make react happy - do not delete
    //     console.log("Errors "+errors)
    //   }
    //   // console.log("HETY", bookDataObject)
    //   // cancelSubmit()
    // }).catch(async (newBook) => {
    //   // console.log("That", newBook)
    //   // const data = await newBook.json();
    // })
    // console.log(newBook)
  };

  let ErrorHandler = [];
  if (errors) {
    // console.log(errors)
    for (let error in errors) {
      // console.log(error)
      // console.log(errors[error])
        ErrorHandler.push((
      <>
        <span>
          <h2>{error}:{errors[error]}</h2>
        </span>
      </>
      ))}
  }

  return (


    <div id="edit_book_form_container">
      <div id="edit_book_text">
        <h2>Librarian, are you really sure you want to Edit this book?</h2>
      </div>
      <div>
          <form className="edit_book_form" onSubmit={onSubmit}>
            <div>
            {ErrorHandler}
            </div>
          <div className="edit_book_form_input_box">
            <label>Book's Title:
            <input
              name='Book Title'
              type='text'
              placeholder='Full Title Here'
              value={bookObj.title}
              maxLength={250}
              onChange={(e)=> {
                const val = e.target.value;
                setBookObj((prevState) => {
                  return {...prevState, "title": val}
                })
                // setBookTitle(e.target.value)
                setBookTitleCharCount(e.target.value.length)}}
              />
              </label>
              {bookTitleCharCount > 0 && (<div className="edit_book_form_input_count">{bookTitleCharCount}/250</div>)}
          </div>
          <div className="edit_book_form_input_box">
            <label>Book's Genre:
            <input
              name='Book Genre'
              type='text'
              placeholder='Pick the most relevant!'
              value={bookObj.genre}
              maxLength={100}
              onChange={(e)=> {
                const val = e.target.value;
                setBookObj((prevState) => {
                  return {...prevState, genre: val}
                })
                // setBookGenre(e.target.value)
                setBookGenreCharCount(e.target.value.length)}}
              />
              </label>
              {bookGenreCharCount > 0 && (<div className="edit_book_form_input_count">{bookGenreCharCount}/100</div>)}
          </div>
          <div className="edit_book_form_input_box">
            <label>Book's Cover Image (URL):
            <input
              name='Book Cover Image URL'
              type='url'
              placeholder='Full HTTPS or leave blank.'
              value={bookObj.Cover}
              maxLength={250}
              onChange={(e)=>{
                const val = e.target.value;
                setBookObj((prevState) => {
                  return {...prevState, Cover: val}
                })
                // bookUrlCharCount
                setBookUrlCharCount(e.target.value.length)
                //  setBookCoverImageUrl(e.target.value)}
                }}
              />
              </label>
              {bookUrlCharCount > 0 && (<div className="edit_book_form_input_count">{bookUrlCharCount}/250</div>)}
          </div>
          <div className="edit_book_form_input_box">
            <label>Book's Summary:
            <textarea
              name='Book Summary'
              type='text'
              placeholder='Concise, Spoiler-free Summary Here!'
              value={bookObj.summary}
              maxLength={1500}
              onChange={(e)=> {
                const val = e.target.value;
                setBookObj((prevState) => {
                  return {...prevState, summary: val}
                })
                // setBookSummary(e.target.value)
                setBookSummaryCharCount(e.target.value.length)}}
              />
              </label>
              {bookSummaryCharCount >0 && (<div className="edit_book_form_input_count">{bookSummaryCharCount}/1500</div>)}
          </div>
          <div className='edit_book_form_footer'>
            <button className='edit_book_cancel_button' onClick={cancelSubmit}>cancel</button>
            <button className='edit_book_submit_button' type="submit" disabled={disableSubmit} hidden={disableSubmit}>add</button>
          </div>
          </form>
    </div>
  </div>
  )
}

export default EditBook;
