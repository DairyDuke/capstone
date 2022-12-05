import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux"
import * as creatorActions from '../../../store/creator'

const EditCreator = ({ creatorData, setShowEditModal, showEditModal }) => {
  const dispatch = useDispatch()

  // Actual form data:
  const [creatorObject, setCreatorObject] = useState({...creatorData})
  // Error Handling
  const [errors, setErrors] = useState({name: "", role: "", summary: "", creatorImageUrl: "", form: "", newError: {} });
  // Character Counter
  const [creatorNameCharCount, setCreatorNameCharCount] = useState(0);
  const [creatorSummaryCharCount, setCreatorSummaryCharCount] = useState(0);
  const [creatorUrlCharCount, setCreatorUrlCharCount] = useState(0);

  const [disableSubmit, setDisableSubmit] = useState(true);
  const cancelSubmit = async () => {
    setShowEditModal(false)
    setErrors({name: "", role: "", summary: "", creatorImageUrl: "", form: "", newError: {} })
    setCreatorNameCharCount(0)
    setCreatorSummaryCharCount(0)
    setCreatorUrlCharCount(0)
  }

  useEffect(() => {
    if (showEditModal) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [showEditModal])

  // const editCreator = (bookData) => {
  //   dispatch(creatorActions.editCreatorThunk(bookData))
  // }

  useEffect(() => {
    if (creatorNameCharCount > 250) {
      setDisableSubmit(true)
      setErrors((prevState) => {
     return {...prevState, title: "Name must be between 1 and 250 characters."}
    })
    } else if (creatorNameCharCount > 0) {
      setDisableSubmit(false)
    } else {
      setDisableSubmit(true)
    }
    if (creatorSummaryCharCount > 1500) {
      setDisableSubmit(true)
      setErrors((prevState) => {
     return {...prevState, summary:"Creator summary must be between 0 and 1500 characters."}})
    } else if (creatorNameCharCount >= 0) {
      setDisableSubmit(false)
    } else {
      setDisableSubmit(true)
    }
    if (creatorUrlCharCount > 250) {
      setDisableSubmit(true)
      setErrors((prevState) => {
     return {...prevState, url:"Url must be between 1 and 250 characters."}})
    } else if (creatorUrlCharCount >= 0) {
      setDisableSubmit(false)
    } else {
      setDisableSubmit(true)
    }
    // if (creatorNameCharCount === 0
    //   && creatorRoleCharCount === 0
    //   && creatorSummaryCharCount === 0
    //   && creatorUrlCharCount === 0) {
    //     setErrors((prevState) => {
    //     return {...prevState, form:"In order to submit change, you must edit one value."}})

    // console.log(errors)
    //   }
  }, [creatorNameCharCount, creatorSummaryCharCount, creatorUrlCharCount])


  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors((prevState)=>{
      return {...prevState, newError: {}}
    });
    if (errors) { }
    // {name: "", role: "", summary: "", creatorImageUrl: "", form: "", newError: {} }
    const creatorDataObject = {
     "id": creatorObject.id,
     "name": creatorObject.name,
     "role_type_list": creatorObject.role,
     "creator_summary": creatorObject.summary,
     "creator_image_url": creatorObject.creatorImageUrl
    }
    const editCreator = await dispatch(creatorActions.updateCreatorThunk(creatorDataObject))
    .then(() => {
      cancelSubmit()
    })
    .catch(async (editCreator) => {
      const data = await editCreator.json();
      if (data && data.errors) {
        setErrors((prevState) => {
          return {...prevState, newError: data.errors}});
        // This console log is to make react happy - do not delete
        console.log("Errors "+errors)
      }
    })
  };

  return (


    <div id="edit_creator_form_container">
      <div id="edit_creator_form_text">
        <h2>Librarian, are you really sure you want to delete this book?</h2>
      </div>
      <div>
          <form className="edit_creator_form" onSubmit={onSubmit}>
            <div>
            </div>
          <div className="edit_creator_form_input_box">
            <label>Creator's Name:
            <input
              name='Creator Title'
              type='text'
              placeholder='Full Name Here'
              value={creatorObject.name}
              maxLength={250}
              onChange={(e)=> {
                const val = e.target.value;
                setCreatorObject((prevState) => {
                  return {...prevState, name: val}
                })
                // setBookTitle(e.target.value)
                setCreatorNameCharCount(e.target.value.length)}}
              />
              </label>
              {creatorNameCharCount > 0 && (<div className="edit_creator_form_input_count">{creatorNameCharCount}/250</div>)}
          </div>
          <div className="create_creator_form_input_box">
            <label>Select Creator's Role:
              <select name='Creator Role' defaultValue={creatorObject.role} value={creatorObject.role} onChange={(e)=> {
                const val = e.target.value;
                setCreatorObject((prevState) => {
                  return {...prevState, role: val}
                })}}>
                <option value='DEFAULT' hidden>Select Best</option>
                <option value="author" >Author</option>
                <option value="illustrator" >Illustrator</option>
                <option value="illustrator" >Translator</option>
              </select>
            </label>
              {/* <div>
                {!!errors && (
                  <>
                  {errors}
                  </>)}
              </div> */}
          </div>
          <div className="edit_creator_form_input_box">
            <label>Creator's Image (URL):
            <input
              name='Creator Image URL'
              type='url'
              placeholder='Full HTTPS or leave blank.'
              value={creatorObject.Cover}
              maxLength={250}
              onChange={(e)=>{
                const val = e.target.value;
                setCreatorObject((prevState) => {
                  return {...prevState, creatorImageUrl: val}
                })
                // creatorUrlCharCount
                setCreatorUrlCharCount(e.target.value.length)
                //  setBookCoverImageUrl(e.target.value)}
                }}
              />
              </label>
              {creatorUrlCharCount > 0 && (<div className="edit_creator_form_input_count">{creatorUrlCharCount}/250</div>)}
          </div>
          <div className="edit_creator_form_input_box">
            <label>Creator's Summary:
            <input
              name='Creator Summary'
              type='text'
              placeholder='Concise, Spoiler-free Summary Here!'
              value={creatorObject.summary}
              maxLength={1500}
              onChange={(e)=> {
                const val = e.target.value;
                setCreatorObject((prevState) => {
                  return {...prevState, summary: val}
                })
                // setBookSummary(e.target.value)
                setCreatorSummaryCharCount(e.target.value.length)}}
              />
              </label>
              {creatorSummaryCharCount >0 && (<div className="edit_creator_form_input_count">{creatorSummaryCharCount}/1500</div>)}
          </div>
          <div className='edit_creator_form_footer'>
            <button className='edit_creator_cancel_button' onClick={cancelSubmit}>cancel</button>
            <button className='edit_creator_submit_button' type="submit" disabled={disableSubmit} hidden={disableSubmit}>add</button>
          </div>
          </form>
    </div>
  </div>
  )
}

export default EditCreator;
