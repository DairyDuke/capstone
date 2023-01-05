import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../../store/session';
import * as bookActions from '../../../store/book'
import * as bookshelfActions from '../../../store/bookshelf'
import "./SignUpForm.css";

const SignUpForm = ({showModal, setShowModal}) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [usernameCharCount, setUsernameCharCount] = useState(0);
  const [email, setEmail] = useState('');
  const [emailCharCount, setEmailCharCount] = useState(0)

  // These variable are for AWS Picture Saving
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const [profileUrl, setProfileUrl] = useState('');
  const [profileUrlCharCount, setProfileUrlCharCount] = useState(0)

  const [password, setPassword] = useState('');
  const [passwordCharCount, setPasswordCharCount] = useState(0)
  const [repeatPassword, setRepeatPassword] = useState('');
  const [repeatPasswordCharCount, setRepeatPasswordCharCount] = useState(0)

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const defaultProfilePictureImage = "https://i.imgur.com/XlI0gZD.png"

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
      setShowModal(false)
    }
  }, [showModal, setShowModal])

  const updateStore = async () => {
    await dispatch(bookshelfActions.getAllCurrentUserBookshelvesThunk())
    await dispatch(bookshelfActions.getAllBookshelvesThunk())
  }

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      let profileImageUrl = defaultProfilePictureImage
      const formData = new FormData();
      formData.append("image", image);

      // aws uploads can be a bit slow—displaying
      // some sort of loading message is a good idea
      setImageLoading(true);

      const profilePic = await dispatch(bookActions.uploadImageThunk(formData))

      if (profilePic) {
        setImageLoading(false);
        profileImageUrl = profilePic.url;
      }
      else {
          setImageLoading(false);
      }

      const data = await dispatch(signUp({username, email, profileImageUrl, password}));

      if (data) {
        setErrors(data.errors)
      } else updateStore()
    } else {
      setErrors({'repeat_password':'Password and confirm password must match'})
    }
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
    setUsernameCharCount(e.target.value.length);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
    setEmailCharCount(e.target.value.length);
  };

  const updateProfilePic = (e) => {
    setProfileUrl(e.target.value);
    setProfileUrlCharCount(e.target.value.length);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
    setPasswordCharCount(e.target.value.length);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
    setRepeatPasswordCharCount(e.target.value.length);
  };

  let ErrorHandler = [];
  if (errors) {
    for (let error in errors) {
        ErrorHandler.push((
      <>
        <span>
          <h2>{errors[error]}</h2>
        </span>
      </>
      ))}
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form id="signup_form" onSubmit={onSignUp}>
    <div id="signup_declaration">
      <h1>
        <img src="https://i.imgur.com/WwOdFuk.png" alt="My Reader's Journey logo."/>
        <br />
         My Reader's Journey</h1>
      <h2> Create Account </h2>
    </div>
      <div id="signup_errors">
        {ErrorHandler}
      </div>
      <div className="signup_input_section">
        <div className="signup_input_container">
          {/* <label>Your Role</label> */}
          <div>
            <fieldset id="role_selection">
              <legend>Select your intended role:</legend>
              <div id="role_selection_divs">
                <label for="librarian">Librarian</label>
                <input type="radio" id="librarian" name="user_role" value="Librarian" checked />
                <span id="role_spacer">Librarian role currently unavailable!</span>
              </div>

              <div>
                <label for="user">User</label>
                <input type="radio" id="user" name="user_role" value="user" disabled="true" />
                <span>User role currently unavailable!</span>
              </div>

            </fieldset>
          </div>
        </div>
        <div className="signup_input_container">
          <label>Your Name</label>
          <div>
            <input
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
              required
              maxLength={40}
            ></input>
            {usernameCharCount > 0 && (<span className='signup_character_count'>Remaining Characters: {usernameCharCount}/40</span>)}
          </div>
        </div>
        <div className="signup_input_container">
          <label>Email</label>
          <div>
          <input
            type='email'
            name='email'
            onChange={updateEmail}
            value={email}
            required
            minLength={6}
            maxLength={255}
          ></input>
          {emailCharCount > 0 && (<span className='signup_character_count'>Remaining Characters: {emailCharCount}/255</span>)}
          </div>
        </div>
        <div className="signup_input_container">
          <label>Profile Picture</label>
          <div>
          <input
              type="file"
              accept="image/*"
              onChange={updateImage}
            />
          {/* <input
            type='url'
            name='profile picture'
            onChange={updateProfilePic}
            value={profileUrl}
            maxLength={255}
          ></input>
          {profileUrlCharCount > 0 && (<span className='signup_character_count'>Remaining Characters: {profileUrlCharCount}/255</span>)} */}
          </div>
        </div>
        <div className="signup_input_container">
          <label>Password</label>
          <div>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            required
            minLength={6}
            maxLength={40}
          ></input>
          {passwordCharCount > 0 && (<span className='signup_character_count'>Remaining Characters: {passwordCharCount}/40</span>)}
          </div>
        </div>
        <div className="signup_input_container">
          <label>Re-enter Password</label>
          <div>
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            minLength={6}
            maxLength={40}
          ></input>
          {repeatPasswordCharCount > 0 && (<span className='signup_character_count'>Remaining Characters: {repeatPasswordCharCount}/40</span>)}
          </div>
        </div>
      </div>
      <div className="signup_form_button">
        <button id="signup_form_submit" type='submit'>Sign Up</button>
        {(imageLoading)&& <p>Loading...</p>}
      </div>
    </form>
  );
};

export default SignUpForm;
