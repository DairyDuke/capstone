import { useDispatch } from "react-redux"
import { useHistory  } from "react-router-dom";
import { useEffect } from "react"
import * as bookActions from '../../../store/book'
import './DeleteReview.css'

const DeleteReview = ({ reviewId, setShowDeleteModal, showDeleteModal }) => {
  const history = useHistory();
  const dispatch = useDispatch()

  useEffect(() => {
    if (showDeleteModal) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [showDeleteModal])

  const deleteBook = async (reviewId) => {
    // await dispatch(bookActions.deleteBookThunk(reviewId)).then(async ()=> await dispatch(bookActions.removeSingleBookThunk(reviewId))).then(async ()=> await dispatch(bookActions.getAllBooksThunk())).then(()=> history.push('/'))
    await dispatch(bookActions.deleteBookThunk(reviewId))
    await dispatch(bookActions.removeSingleBookThunk(reviewId))
    // await dispatch(bookActions.removeBookFromShelfThunk(reviewId))
    await dispatch(bookActions.getAllBooksThunk())
    history.push('/')
  }

  return (
    <div id="confirm_delete_form">
      <div id="confirm_delete_text">
        <h1>
          <img src="https://i.imgur.com/WwOdFuk.png" alt="My Reader's Journey logo."/>
          <br />
          My Reader's Journey</h1>
        <h2>Are you really sure you want to delete your review?</h2>
        <h3></h3>
      </div>
      <div className="confirm_delete_form_footer">
        <button onClick={() => setShowDeleteModal(false)} className='confirm_delete_cancel'>Cancel</button>
        <button onClick={() => deleteBook(reviewId)} className="confirm_delete_submit">YES</button>
      </div>
    </div>
  )
}

export default DeleteReview;
