import { useDispatch } from "react-redux"
import { useHistory  } from "react-router-dom";
import { useEffect } from "react"
import * as bookActions from '../../../store/book'
import './DeleteBook.css'

const DeleteBook = ({ bookid, setShowDeleteModal, showDeleteModal }) => {
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

  const deleteBook = async (bookid) => {
    // await dispatch(bookActions.deleteBookThunk(bookid)).then(async ()=> await dispatch(bookActions.removeSingleBookThunk(bookid))).then(async ()=> await dispatch(bookActions.getAllBooksThunk())).then(()=> history.push('/'))
    await dispatch(bookActions.deleteBookThunk(bookid))
    await dispatch(bookActions.removeSingleBookThunk(bookid))
    await dispatch(bookActions.removeBookFromShelfThunk({"bookshelf_name":"all", "custom_bookshelf_name":null}, bookid))
    await dispatch(bookActions.getAllBooksThunk())
    // history.push({pathname: '/'})
  }

  return (
    <div id="confirm_delete_form">
      <div id="confirm_delete_text">
        <h1>
          <img src="https://i.imgur.com/WwOdFuk.png" alt="My Reader's Journey logo."/>
          <br />
          My Reader's Journey</h1>
        <h2>Librarian, are you really sure you want to delete this book?</h2>
        <h3></h3>
      </div>
      <div className="confirm_delete_form_footer">
        <button onClick={() => setShowDeleteModal(false)} className='confirm_delete_cancel'>Cancel</button>
        <button onClick={() => deleteBook(bookid)} className="confirm_delete_submit">YES</button>
      </div>
    </div>
  )
}

export default DeleteBook;
