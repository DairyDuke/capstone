import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux"
import * as bookActions from '../../../store/book'
import './CreateReview.css'

const CreateReview = ({ reviewData, setShowReviewModal, showReviewModal }) => {
  const dispatch = useDispatch()
  // Actual form data:
  const [reviewObj, setReviewObj] = useState({...reviewData})
  // Error Handling
  const [errors, setErrors] = useState([])

  // Character Counter
  const [reviewTextCharCount, setReviewTextCharCount] = useState(0);

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
    setShowReviewModal(false)
    setReviewObj({...reviewData})
    setErrors([])
    setReviewTextCharCount(0)
    setReviewRatingCharCount(0)
  }

  useEffect(() => {
    if (showReviewModal) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [showReviewModal])

  useEffect(() => {
    if (reviewTextCharCount > 2000) {
      setDisableSubmit(true)
      setErrors((prevState) => {
     return {...prevState, title: "Title must be between 1 and 250 characters."}
    })
    } else if (reviewTextCharCount > 0) {
      setDisableSubmit(false)
    } else {
      setDisableSubmit(true)
    }
  }, [reviewTextCharCount])


  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors([])

    const reviewDataObject = {
     "review_text": reviewObj.text,
     "rating": reviewObj.rating
    }
    const newReview = await dispatch(bookActions.editBookThunk(reviewDataObject))

    if (newReview) {
      setErrors(newReview.errors)
    } else {
     await dispatch(bookActions.getSingleBookThunk(reviewDataObject.id))
      cancelSubmit()
    }
  };

  const handleCancel = () => {
    setShowInput(false)
    setImage(reviewObj.Cover)
  }

  let ErrorHandler = [];
  if (errors) {
    for (let error in errors) {
        ErrorHandler.push((
      <>
        <span>
          <h2>{error}:{errors[error]}</h2>
        </span>
      </>
      ))}
  }

  return (
    <form id="create_review_form" onSubmit={onSubmit}>
      <div id="create_review_text">
        <h1>
          <img src="https://i.imgur.com/WwOdFuk.png" alt="My Reader's Journey logo."/>
          <br />
          My Reader's Journey</h1>
        <h2> Create Review </h2>
      </div>
      <div id="create_review_errors">
        {ErrorHandler}
      </div>
      <div className="create_review_input_containers">
        <div className="create_review_form_input_box">
          <label>Review's Text:</label>
          <div className="create_review_form_input_count">
            <input
              name='Review Text'
              type='text'
              placeholder='Your review here!'
              value={reviewObj.reviewText}
              maxLength={2000}
              onChange={(e)=> {
                const val = e.target.value;
                setReviewObj((prevState) => {
                  return {...prevState, "reviewText": val}
                })
                setReviewTextCharCount(e.target.value.length)}}
              />
              {reviewTextCharCount > 0 && (<div className="create_review_character_count">Remaining Characters: {reviewTextCharCount}/2000</div>)}
          </div>
        </div>
        <div className="create_review_form_input_box">
          <label>Rating: </label>
          <div className="create_review_form_input_count">
            <input
              name='Rating'
              type='text'
              placeholder='Pick the most relevant!'
              value={reviewObj.rating}
              maxLength={1}
              onChange={(e)=> {
                const val = e.target.value;
                setReviewObj((prevState) => {
                  return {...prevState, rating: val}
                })}}
              />
          </div>
        </div>
      </div>
      <div className='create_review_form_footer'>
        <button className='create_review_cancel_button' onClick={cancelSubmit}>Cancel</button>
        <button className='create_review_submit_button' type="submit" disabled={disableSubmit} hidden={disableSubmit}>Confirm</button>
      </div>
        {(imageLoading)&& <p>Loading...</p>}
    </form>
  )
}

export default CreateReview;
