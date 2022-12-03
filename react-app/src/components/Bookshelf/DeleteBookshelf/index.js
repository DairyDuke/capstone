import { useDispatch } from "react-redux"
import { useEffect } from "react"
import * as bookshelfActions from '../../../store/bookshelf'

const DeleteBookshelf = ({ bookshelfid, setShowDeleteModal, showDeleteModal }) => {

  const dispatch = useDispatch()

  useEffect(() => {
    if (showDeleteModal) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [showDeleteModal])

  const deleteBookshelf = (bookshelfid) => {
    dispatch(bookshelfActions.deleteBookshelfThunk(bookshelfid))
  }

  return (
    <div id="confirm-delete-form">
      <div id="confirm-delete-text">
        <h2>Librarian, are you really sure you want to delete this bookshelf?</h2>
      </div>
      <div className="form-footer">
        <button onClick={() => setShowDeleteModal(false)} className='cancel-button'>Cancel</button>
        <button onClick={() => deleteBookshelf(bookshelfid)} className="save-edit-button">YES</button>
      </div>
    </div>
  )
}

export default DeleteBookshelf;
