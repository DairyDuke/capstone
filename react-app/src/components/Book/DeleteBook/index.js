import { useDispatch } from "react-redux"
import { useEffect } from "react"
import * as bookActions from '../../../store/book'

const DeleteBook = ({ bookid, setShowDeleteModal, showDeleteModal }) => {

  const dispatch = useDispatch()

  useEffect(() => {
    if (showDeleteModal) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [showDeleteModal])

  const deleteBook = (bookid) => {
    dispatch(bookActions.deleteBookThunk(bookid))
  }

  return (
    <div id="confirm-delete-form">
      <div id="confirm-delete-text">
        <h2>Librarian, are you really sure you want to delete this book?</h2>
      </div>
      <div className="form-footer">
        <button onClick={() => setShowDeleteModal(false)} className='cancel-button'>Cancel</button>
        <button onClick={() => deleteBook(bookid)} className="save-edit-button">YES</button>
      </div>
    </div>
  )
}

export default DeleteBook;
