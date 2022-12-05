import { useDispatch } from "react-redux"
import { useEffect } from "react"
import * as bookshelfActions from '../../../store/bookshelf'
import './DeleteBookshelf.css'

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

  const deleteBookshelf = async (bookshelfid) => {
    await dispatch(bookshelfActions.deleteBookshelfThunk(bookshelfid))
    .then(()=> {
    setShowDeleteModal(false)
    window.location.reload()
  }
    )
  }

  return (
    <div id="confirm_delete_bookshelf_form">
      <div id="confirm_delete_bookshelf_text">
        <h2>Librarian, are you really sure you want to delete this bookshelf?</h2>
      </div>
      <div className="confirm_delete_footer">
        <button onClick={() => setShowDeleteModal(false)} className='cancel-button'>Cancel</button>
        <button onClick={() => deleteBookshelf(bookshelfid)} className="save-edit-button">YES</button>
      </div>
    </div>
  )
}

export default DeleteBookshelf;
