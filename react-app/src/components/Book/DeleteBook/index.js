import { useDispatch } from "react-redux"
import { useEffect } from "react"
import * as bookActions from '../../../store/book'
import './DeleteBook.css'

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
    <div id="confirm_delete_form">
      <div id="confirm_delete_text">
        <h2>Librarian, are you really sure you want to delete this book?</h2>
      </div>
      <div className="confirm_delete_form_footer">
        <button onClick={() => setShowDeleteModal(false)} className='confirm_delete_cancel'>Cancel</button>
        <button onClick={() => deleteBook(bookid)} className="confirm_delete_submit">YES</button>
      </div>
    </div>
  )
}

export default DeleteBook;
