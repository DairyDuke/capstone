import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux"
import * as bookActions from '../../../store/book'
import './EditBook.css'

const EditBook = ({ bookData, setShowEditModal, showEditModal }) => {
  const dispatch = useDispatch()
  const [showInput, setShowInput] = useState(false)

  // Actual form data:
  const [bookObj, setBookObj] = useState({...bookData})
  // These variable are for AWS Picture Saving
  const [image, setImage] = useState(bookObj.Cover);
  const [imageLoading, setImageLoading] = useState(false);
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
    // if (bookUrlCharCount > 250) {
    //   setDisableSubmit(true)
    //   setErrors((prevState) => {
    //  return {...prevState, url:"Url must be between 1 and 250 characters."}})
    // } else if (bookUrlCharCount >= 0) {
    //   setDisableSubmit(false)
    // } else {
    //   setDisableSubmit(true)
    // }
    // if (bookTitleCharCount === 0
    //   && bookGenreCharCount === 0
    //   && bookSummaryCharCount === 0
    //   && bookUrlCharCount === 0) {
    //     setErrors((prevState) => {
    //     return {...prevState, form:"In order to submit change, you must edit one value."}})

    // console.log(errors)
    //   }
  }, [bookTitleCharCount, bookGenreCharCount, bookSummaryCharCount])


  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors([])

    let currentImg = defaultImg
    if (bookObj.Cover) {
      currentImg = bookObj.Cover
    }
    const formData = new FormData();
      formData.append("image", image);

      // aws uploads can be a bit slow—displaying
      // some sort of loading message is a good idea
      setImageLoading(true);

      const bookCoverUpload = await dispatch(bookActions.uploadImageThunk(formData))

      if (bookCoverUpload) {
        setImageLoading(false);
        currentImg = bookCoverUpload.url;
      }
      else {
          setImageLoading(false);
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

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleCancel = () => {
    setShowInput(false)
    setImage(bookObj.Cover)
  }
  // const coverImgChange = {showInput ? (<span onClick={()=> setShowInput(false)}> Cancel </span>) :
  //   (<span id="edit_book_cover_preview" onClick={()=> setShowInput(true)}> UPDATE </span>)}

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
    <form id="edit_book_form" onSubmit={onSubmit}>
      <div id="edit_book_text">
        <h1>
          <img src="https://i.imgur.com/WwOdFuk.png" alt="My Reader's Journey logo."/>
          <br />
          My Reader's Journey</h1>
        <h2> Edit Book </h2>
      </div>
      <div id="edit_book_errors">
        {ErrorHandler}
      </div>
      <div className="edit_book_input_containers">
        <div className="edit_book_form_input_box">
          <label>Book's Title:</label>
          <div className="edit_book_form_input_count">
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
              {bookTitleCharCount > 0 && (<div className="edit_book_character_count">Remaining Characters: {bookTitleCharCount}/250</div>)}
          </div>
        </div>
        <div className="edit_book_form_input_box">
          <label>Book's Genre: </label>
          <div className="edit_book_form_input_count">
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

              {bookGenreCharCount > 0 && (<div className="edit_book_character_count">Remaining Characters: {bookGenreCharCount}/100</div>)}
          </div>
        </div>
        <div className="edit_book_form_input_box">
          <label>Update Cover Image? {showInput ? (<span id="edit_book_cover_preview"  onClick={handleCancel}> Cancel </span>) :
    (<span id="edit_book_cover_preview" onClick={()=> setShowInput(true)}> UPDATE </span>)}</label>

          <div className="edit_book_form_input_count">
            {showInput ? (<>
            <input
                type="file"
                accept="image/*"
                // value={bookObj.Cover}
                placeholder={bookObj.Cover}
                onChange={updateImage}
              />
              </>): (<br />)}
            {/* <input
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
              {bookUrlCharCount > 0 && (<div className="edit_book_character_count">Remaining Characters: {bookUrlCharCount}/250</div>)} */}
          </div>
        </div>
        <div className="edit_book_form_input_box">
          <label>Book's Summary:</label>
          <div className="edit_book_form_input_count">
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

              {bookSummaryCharCount >0 && (<div className="edit_book_character_count">Remaining Characters: {bookSummaryCharCount}/1500</div>)}
          </div>
        </div>
      </div>
      <div className='edit_book_form_footer'>
        <button className='edit_book_cancel_button' onClick={cancelSubmit}>Cancel</button>
        <button className='edit_book_submit_button' type="submit" disabled={disableSubmit} hidden={disableSubmit}>Confirm</button>
      </div>
        {(imageLoading)&& <p>Loading...</p>}
    </form>
  )
}

export default EditBook;
