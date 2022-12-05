import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../../store/session';

const SignUpForm = ({showModal, setShowModal}) => {
  const [errors, setErrors] = useState({});
  const [username, setUsername] = useState('');
  const [usernameCharCount, setUsernameCharCount] = useState(0);
  const [email, setEmail] = useState('');
  const [emailCharCount, setEmailCharCount] = useState(0)


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


  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      console.log("Pro", profileUrl)
      let profileImageUrl = defaultProfilePictureImage
      if (profileUrl) {
        return profileImageUrl = profileUrl
      }
      const data = await dispatch(signUp({username, email, profileImageUrl, password}));
      if (data) {
        setErrors(data)
        console.log("Errors ", errors)
      }
    } else {
      setErrors([{'repeat_password':'Password and confirm password must match'}])
    }
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

  const ErrorHandler = (errors) => {
    for (let error in errors) {
      return (<>{error}</>)
      }
    }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form id="signup_form" onSubmit={onSignUp}>
      <div>
        {/* {console.log(errors)}
        {errors && <ErrorHandler />} */}
      </div>
      <div className="signup_input_container">
        <label>Your Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
          required
          maxLength={40}
        ></input>
        {usernameCharCount > 0 && (<div className='char-count'>{usernameCharCount}/40</div>)}
      </div>
      <div className="signup_input_container">
        <label>Email</label>
        <input
          type='email'
          name='email'
          onChange={updateEmail}
          value={email}
          required
          minLength={6}
          maxLength={255}
        ></input>
        {emailCharCount > 0 && (<div className='char-count'>{emailCharCount}/255</div>)}
      </div>
      <div className="signup_input_container">
        <label>Profile Picture</label>
        <input
          type='url'
          name='profile picture'
          onChange={updateProfilePic}
          value={profileUrl}
          maxLength={255}
        ></input>
        {profileUrlCharCount > 0 && (<div className='char-count'>{profileUrlCharCount}/255</div>)}
      </div>
      <div className="signup_input_container">
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          required
          minLength={6}
          maxLength={40}
        ></input>
        {passwordCharCount > 0 && (<div className='char-count'>{passwordCharCount}/40</div>)}
      </div>
      <div className="signup_input_container">
        <label>Re-enter Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          minLength={6}
          maxLength={40}
        ></input>
        {repeatPasswordCharCount > 0 && (<div className='char-count'>{repeatPasswordCharCount}/40</div>)}
      </div>
      <div className="signup_buttons">
        <button id="cancel_button" type='button' onClick={() => setShowModal(false)}>Close</button>
        <button id="signup_button" type='submit'>Sign Up</button>
      </div>
    </form>
  );
};

export default SignUpForm;
