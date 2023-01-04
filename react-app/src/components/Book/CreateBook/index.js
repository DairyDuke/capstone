import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './CreateBook.css'
import * as bookActions from '../../../store/book'


const CreateBook = ({showModal, setShowModal, status}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // These variable are for AWS Picture Saving
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
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

  const defaultImg = "https://i.imgur.com/iL99VfD.jpg"

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

  useEffect(() => {
    if (showNewBookForm) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
      setShowNewBookForm(false)
    }
  }, [showNewBookForm, setShowNewBookForm])

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
    // if (bookUrlCharCount > 100) {
    //   setDisableSubmit(true)
    //   setErrors("Book Cover must be between 0 and 100 characters.")
    // } else if (bookUrlCharCount >= 0) {
    //   setDisableSubmit(false)
    //   handleHidden()
    // } else {
    //   setDisableSubmit(true)
    // }
  }, [bookTitleCharCount, bookGenreCharCount, bookSummaryCharCount])

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

    let currentImg = defaultImg
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
     "title": bookTitle,
     "genre": bookGenre,
     "summary": bookSummary,
     "cover_image_url": currentImg
    }
    const newBook = await dispatch(bookActions.createBookThunk(bookDataObject))
    .catch(async (newBook) => {
      // const data = await newBook.JSON()
      // const data = await newBook.json();
      if (newBook && newBook.errors) {
        setErrors(Object.values(newBook.errors));
        // This console log is to make react happy - do not delete
        console.log("Errors "+errors)
      }
    })
    if (newBook && newBook.errors) {
      setErrors(newBook.errors)
    } else {
    await dispatch(bookActions.getSingleBookThunk(newBook.id))
    cancelSubmit()
      history.push(`/books/${newBook.id}`)
    }
  };
    // if (newBook.ok) {
    //   window.reload()
    //   window.scrollTo(0,0)
    // }

    const updateImage = (e) => {
      const file = e.target.files[0];
      setImage(file);
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

  return(
      <form id="create_book_form" onSubmit={onSubmit}>
        <div id="create_book_text">
          <h1>
            <img src="https://i.imgur.com/WwOdFuk.png" alt="My Reader's Journey logo."/>
            <br />
            My Reader's Journey</h1>
            <h2> Create Book </h2>
        </div>
        <div id="create_book_errors">
          {ErrorHandler}
        </div>

        <div className="create_book_form_input_box">
          <label>Book's Title:</label>
          <div className="create_book_form_input_count">
            <input
              name='Book Title'
              type='text'
              placeholder='Full Title Here'
              value={bookTitle}
              required
              minLength={3}
              maxLength={250}
              onChange={(e)=> {
                setBookTitle(e.target.value)
                setBookTitleCharCount(e.target.value.length)}}
              />
              {bookTitleCharCount > 0 && (<div className="create_book_character_count">Remaining Characters: {bookTitleCharCount}/250</div>)}
          </div>
        </div>
        <div className="create_book_form_input_box">
          <label>Book's Genre:</label>
          <div className="create_book_form_input_count">
            <input
              name='Book Genre'
              type='text'
              placeholder='Pick the most relevant!'
              value={bookGenre}
              required
              minLength={6}
              maxLength={100}
              onChange={(e)=> {
                setBookGenre(e.target.value)
                setBookGenreCharCount(e.target.value.length)}}
              />
              {bookGenreCharCount > 0 && (<div className="create_book_character_count">Remaining Characters: {bookGenreCharCount}/100</div>)}
          </div>
        </div>
        <div className="create_book_form_input_box">
          <label>Book's Cover Image (URL):</label>
          <div className="create_book_form_input_count">
          <input
              type="file"
              accept="image/*"
              onChange={updateImage}
            />
            {/* <input
              name='Book Cover Image URL'
              type='url'
              placeholder='Full HTTPS or leave blank.'
              value={bookCoverImageUrl}

              maxLength={100}
              onChange={(e)=> setBookCoverImageUrl(e.target.value)}
              />
              {bookUrlCharCount > 0 && (<div className="create_book_character_count">{bookUrlCharCount}/100</div>)} */}
          </div>
        </div>
        <div className="create_book_form_input_box">
          <label>Book's Summary:</label>
          <div className="create_book_form_input_count">
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
              {bookSummaryCharCount > 0 && (<div className="create_book_character_count">{bookSummaryCharCount}/1500</div>)}
          </div>
        </div>
      <div className='create_book_form_footer'>
        <button className='create_book_cancel_button' onClick={cancelSubmit}>Cancel</button>
        <button className='create_book_submit_button' type="submit" disabled={disableSubmit}>CREATE</button>
      </div>
        {(imageLoading)&& <p>Loading...</p>}
    </form>
  )
}

export default CreateBook
