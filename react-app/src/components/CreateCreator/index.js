import React, { useState, useEffect } from 'react';
// import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// , useSelector
import './CreateCreator.css'
import * as creatorActions from '../../store/creator'

const CreateCreator = () => {
  const dispatch = useDispatch();
  // const history = useHistory();
  // const creators = useSelector(state => state.creators)
  // Determines if the new comment button exists or not.
  const [showNewCreatorForm, setShowNewCreatorForm] = useState(false);

  // Actual form data:
  const [creatorName, setCreatorName] = useState("");
  const [creatorImageUrl, setCreatorImageUrl] = useState("");
  const [creatorSummary, setCreatorSummary] = useState("");
  const [creatorRole, setCreatorRole] = useState("");
  // Error Handling
  const [errors, setErrors] = useState("");
  // Character Counter
  const [creatorNameCharCount, setCreatorNameCharCount] = useState(0);
  // const [creatorImageUrlCharCount, setCreatorImageUrlCharCount] = useState(0);
  const [creatorSummaryCharCount, setCreatorSummaryCharCount] = useState(0);

  const [disableSubmit, setDisableSubmit] = useState(0);

  const cancelSubmit = async () => {
    setShowNewCreatorForm(false)
    setCreatorName("")
    setCreatorImageUrl("")
    setCreatorSummary("")
    setCreatorRole("")
    setErrors("")
    setCreatorNameCharCount(0)
    // setCreatorImageUrlCharCount(0)
    setCreatorSummaryCharCount(0)
  }

  useEffect(() => {
    if (creatorNameCharCount > 50) {
      setDisableSubmit(true)
      setErrors("Creator name must be between 1 and 50 characters.")
    } else if (creatorNameCharCount > 0) {
      setDisableSubmit(false)
    } else {
      setDisableSubmit(true)
    }
    if (creatorSummaryCharCount > 1500) {
      setDisableSubmit(true)
      setErrors("Creator summary must be between 1 and 1500 characters.")
    } else if (creatorNameCharCount > 0) {
      setDisableSubmit(false)
    } else {
      setDisableSubmit(true)
    }
  }, [creatorNameCharCount, creatorSummaryCharCount])

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    if (errors) {

    }
    const creatorDataObject = {
      "role_type_list": creatorRole,
      "name": creatorName,
      "creator_image_url": creatorImageUrl,
      "creator_summary": creatorSummary
    }
    const newCreator = await dispatch(creatorActions.createCreatorThunk(creatorDataObject))
    .then(() => {
      cancelSubmit()
    })
    .catch(async (newCreator) =>{
      const data = await newCreator.json();
      if (data && data.errors) {
        setErrors(Object.values(data.errors));
        // This console log is to make react happy - do not delete
        console.log("Errors "+errors)
      }})
    }

  return(
    <div>
      {showNewCreatorForm === false && (
        <>
          <div id="create_creator_new_button" onClick={()=> setShowNewCreatorForm(true)}>
            <span>Create Creator</span>
          </div>
        </>
      )}

      {showNewCreatorForm && (
        <>
          <form className="create_creator_form" onSubmit={onSubmit}>
          <div className="create_creator_form_input_box">
            <label>Creator's Name:
            <input
              name='Creator Name'
              type='text'
              placeholder='Full Name Here'
              value={creatorName}
              maxLength={50}
              onChange={(e)=> {
                setCreatorName(e.target.value)
                setCreatorNameCharCount(e.target.value.length)}}
              />
              </label>
              <div className="create_creator_form_input_count">{creatorNameCharCount}/50</div>
              {/* <div>
                {!!errors && (
                  <>
                  {errors}
                  </>)}
              </div> */}
          </div>
          <div className="create_creator_form_input_box">
            <label>Creator's Image (URL):
            <input
              name='Creator Image URL'
              type='text'
              placeholder='Full HTTPS or leave blank.'
              value={creatorImageUrl}
              // maxLength={50}
              onChange={(e)=> setCreatorImageUrl(e.target.value)}
              />
              </label>
              {/* <div>
                {!!errors && (
                  <>
                  {errors}
                  </>)}
              </div> */}
          </div>
          <div className="create_creator_form_input_box">
            <label>Creator's Summary:
            <input
              name='Creator Summary'
              type='text'
              placeholder='Give a brief Creator summary!'
              value={creatorSummary}
              maxLength={1500}
              onChange={(e)=> {
                setCreatorSummary(e.target.value)
                setCreatorSummaryCharCount(e.target.value.length)}}
              />
              </label>
              <div className="create_creator_form_input_count">{creatorSummaryCharCount}/1500</div>
              {/* <div>
                {!!errors && (
                  <>
                  {errors}
                  </>)}
              </div> */}
          </div>
          <div className="create_creator_form_input_box">
            <label>Select Creator's Role:
              <select name='Creator Role' defaultValue={'DEFAULT'} value={creatorRole} onChange={(e)=> setCreatorRole(e.target.value)}>
                <option value='DEFAULT' hidden>Select Best</option>
                <option value="author" >Author</option>
                <option value="illustrator" >Illustrator</option>
                <option value="illustrator" >Translator</option>
              </select>
              {console.log("TEST",creatorRole)}
            </label>
              {/* <div>
                {!!errors && (
                  <>
                  {errors}
                  </>)}
              </div> */}
          </div>
          <div className='create_creator_form_footer'>
            <button className='create_creator_cancel_button' onClick={cancelSubmit}>cancel</button>
            <button className='create_creator_submit_button' type="submit" disabled={disableSubmit}>add</button>
          </div>
          </form>
        </>
      )}
    </div>
  )
}

export default CreateCreator
