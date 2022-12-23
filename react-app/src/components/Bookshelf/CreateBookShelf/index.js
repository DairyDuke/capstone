import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// , useSelector
import './EditBookShelf.css'
import * as bookshelfActions from '../../../store/bookshelf'

const CreateEditBookShelf = () => {
  const dispatch = useDispatch();
  // const history = useHistory();
  // const bookshelves = useSelector(state => state.bookshelves.currentUser)
  // Determines if the new comment button exists or not.
  const [showNewShelfForm, setShowNewShelfForm] = useState(false);
  // Determines if the edit form should show.
  const [showEditShelfForm, setShowEditShelfForm] = useState(false);

  // Actual form data:
  const [shelfName, setShelfName] = useState("");
  // Error Handling
  const [errors, setErrors] = useState([]);
  // Character Counter
  const [shelfNameCharCount, setShelfNameCharCount] = useState(0);

  const [disableSubmit, setDisableSubmit] = useState(0);

  const cancelSubmit = async () => {
    setShowNewShelfForm(false)
    setShowEditShelfForm(false)
    setShelfName("")
    setErrors([])
    setShelfNameCharCount(0)
  }

  useEffect(() => {
    if (shelfNameCharCount > 35) {
      setDisableSubmit(true)
      setErrors("Bookshelf must be between 1 and 35 characters.")
    } else if (shelfNameCharCount > 0) {
      setDisableSubmit(false)
    } else {
      setDisableSubmit(true)
    }
  }, [shelfNameCharCount])

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    // NTW - rewrite this to be more like the others.
    const newShelf = await dispatch(bookshelfActions.createBookshelfThunk(shelfName))
    if (newShelf) {
      setErrors(newShelf.errors)
    } else {
      await dispatch(bookshelfActions.getAllCurrentUserBookshelvesThunk())
      cancelSubmit()
      window.location.reload()
    }
}

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
    <div id="create_bookshelf_main_container">
      {showNewShelfForm === false && (
        <>
          <button id="create_bookshelf_new_button" onClick={()=> setShowNewShelfForm(true)}>
            <span>Add shelf</span>
          </button>
        </>
      )}

      {showNewShelfForm === true && showEditShelfForm === false && (
        <>
          <form className="create_bookshelf_form" onSubmit={onSubmit}>
               {ErrorHandler}

          <div className="create_bookshelf_form_input_box">
            <label>Bookshelf Name:
            <input
              name='bookshelfName'
              type='text'
              placeholder='Give your bookshelf a Name!'
              value={shelfName}
              maxLength={35}
              onChange={(e)=> {
                setShelfName(e.target.value)
                setShelfNameCharCount(e.target.value.length)}}
              />
              </label>
              <div className="create_bookshelf_form_input_count">{shelfNameCharCount}/35</div>

          </div>
          <div className='create_bookshelf_form_footer'>
            <button className='create_bookshelf_cancel_button' onClick={cancelSubmit}>cancel</button>
            <button className='create_bookshelf_submit_button' type="submit" disabled={disableSubmit}>add</button>
          </div>
          </form>
        </>
      )}
    </div>
  )
}

export default CreateEditBookShelf
