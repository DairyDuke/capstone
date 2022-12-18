import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './EditBookshelf.css'
import * as bookshelfActions from '../../../store/bookshelf'

const EditBookshelf = ({shelfId, shelfname}) => {
  const dispatch = useDispatch();
  // Determines if the edit form should show.
  const [showEditShelfForm, setShowEditShelfForm] = useState(false);
  const [id, setId] = useState(shelfId)

  // Actual form data:
  const [shelfName, setShelfName] = useState(shelfname);
  // Error Handling
  const [errors, setErrors] = useState([]);
    // {bookshelf_name: "", newError: ""});
  // Character Counter
  const [shelfNameCharCount, setShelfNameCharCount] = useState(0);

  const [disableSubmit, setDisableSubmit] = useState(true);

  const cancelSubmit = async () => {
    setShowEditShelfForm(false)
    setId(shelfId)
    setShelfName(shelfname)
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
    const editedShelf = await dispatch(bookshelfActions.editBookshelfThunk(id, shelfName))

    if (editedShelf) {
      setErrors(editedShelf.errors)
    }
    else {
      await dispatch(bookshelfActions.getAllCurrentUserBookshelvesThunk())
      cancelSubmit()
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
    <div >
      {showEditShelfForm === false && (
        <>
          <div id="edit_bookshelf_new_button" onClick={()=> setShowEditShelfForm(true)}>
            <span><i className="fa-solid fa-pen-to-square"></i></span>
          </div>
        </>
      )}

      {showEditShelfForm && (
        <>
          <form className="edit_bookshelf_form" onSubmit={onSubmit}>
            <div>
              {ErrorHandler}
              </div>
          <div className="edit_bookshelf_form_input_box">
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
              {shelfNameCharCount > 0 && (<div className="edit_bookshelf_form_input_count">{shelfNameCharCount}/35</div>)}
          </div>
          <div className='edit_bookshelf_form_footer'>
            <button className='edit_bookshelf_cancel_button' onClick={cancelSubmit}>cancel</button>
            <button className='edit_bookshelf_submit_button' type="submit" disabled={disableSubmit}>edit</button>
          </div>
          </form>
        </>
      )}
    </div>
  )
}

export default EditBookshelf
