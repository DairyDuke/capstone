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
        <h1>
          <img src="https://i.imgur.com/WwOdFuk.png" alt="My Reader's Journey logo."/>
          <br />
          My Reader's Journey</h1>
        <h2>Librarian, are you really sure you want to delete this bookshelf?</h2>
        <h3></h3>
      </div>
      <div className="confirm_delete_footer">
        <button onClick={() => setShowDeleteModal(false)} className='confirm_delete_cancel'>Cancel</button>
        <button onClick={() => deleteBookshelf(bookshelfid)} className="confirm_delete_submit">DELETE</button>
      </div>
    </div>
  )
}

export default DeleteBookshelf;
