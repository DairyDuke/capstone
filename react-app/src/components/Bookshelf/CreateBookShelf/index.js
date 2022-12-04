import React, { useState, useEffect } from 'react';
// import { useHistory, Redirect } from 'react-router-dom';
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
  const [errors, setErrors] = useState("");
  // Character Counter
  const [shelfNameCharCount, setShelfNameCharCount] = useState(0);

  const [disableSubmit, setDisableSubmit] = useState(0);

  const cancelSubmit = async () => {
    setShowNewShelfForm(false)
    setShowEditShelfForm(false)
    setShelfName("")
    setErrors("")
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
    if (errors) {

    }
    const newShelf = await dispatch(bookshelfActions.createBookshelfThunk(shelfName))
    .catch(async (response) =>{
      const data = await response.json();
      if (data && data.errors) {
        setErrors(Object.values(data.errors));
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
    <div id="create_bookshelf_main_container">
      {showNewShelfForm === false && (
        <>
          <div id="create_bookshelf_new_button" onClick={()=> setShowNewShelfForm(true)}>
            <span>Add Bookshelf</span>
          </div>
        </>
      )}

      {showNewShelfForm === true && showEditShelfForm === false && (
        <>
          <form className="create_bookshelf_form" onSubmit={onSubmit}>
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
              <div>
                {!!errors && (
                  <>
                  {errors}
                  </>)}
              </div>
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
