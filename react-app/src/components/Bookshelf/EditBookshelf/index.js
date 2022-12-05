import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './EditBookshelf.css'
import * as bookshelfActions from '../../../store/bookshelf'

const EditBookshelf = ({shelfId, shelfname}) => {
  const dispatch = useDispatch();
  // Determines if the edit form should show.
  const [showEditShelfForm, setShowEditShelfForm] = useState(false);

  // Actual form data:
  const [shelfName, setShelfName] = useState(shelfname || "");
  // Error Handling
  const [errors, setErrors] = useState({bookshelf_name: "", newError: ""});
  // Character Counter
  const [shelfNameCharCount, setShelfNameCharCount] = useState(0);

  const [disableSubmit, setDisableSubmit] = useState(true);

  const cancelSubmit = async () => {
    setShowEditShelfForm(false)
    setShelfName("")
    setErrors({bookshelf_name: "", newError: ""})
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
    setErrors({bookshelf_name: ""});
    if (errors) {

    }
    const newShelf = await dispatch(bookshelfActions.editBookshelfThunk(shelfId, shelfName)).then(()=> cancelSubmit())
    .catch(async (response) =>{
      const data = await response.json();
      if (data && data.errors) {
        setErrors((prevState) => {
          return {...prevState, newError: data.errors}});
        // This console log is to make react happy - do not delete
        console.log("Errors "+errors)
      }

    if (newShelf.ok) {
      window.reload()
      window.scrollTo(0,0)
    }
  })
}

  return(
    <div >
      {showEditShelfForm === false && (
        <>
          <div id="edit_bookshelf_new_button" onClick={()=> setShowEditShelfForm(true)}>
            <span><i class="fa-solid fa-pen-to-square"></i></span>
          </div>
        </>
      )}

      {showEditShelfForm && (
        <>
          <form className="edit_bookshelf_form" onSubmit={onSubmit}>
            <div>
              {/* Error div */}
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
            <button className='edit_bookshelf_submit_button' type="submit" disabled={disableSubmit}>add</button>
          </div>
          </form>
        </>
      )}
    </div>
  )
}

export default EditBookshelf
