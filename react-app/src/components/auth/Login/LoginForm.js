import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../../store/session';
import './LoginForm.css'

const LoginForm = ({showModal, setShowModal}) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailCharCount, setEmailCharCount] = useState(0)
  const [passwordCharCount, setPasswordCharCount] = useState(0)

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
      setShowModal(false)
    }
  }, [showModal, setShowModal])

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data.errors);
    } else {window.location.reload()}
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
    setEmailCharCount(e.target.value.length);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
    setPasswordCharCount(e.target.value.length);
  };

  let ErrorHandler = [];
  if (errors) {
    for (let error in errors) {
        ErrorHandler.push((
      <>
        <span key={error}>
          <h2>{errors[error]}</h2>
        </span>
      </>
      ))}
  }

  if (user) {
    return <Redirect to='/' />;
  }
// Passwords must be at least 6 characters.
  return (
    <form id="login_form" onSubmit={onLogin}>
      <div id="signin_declaration">
        <h1>
          <img src="https://i.imgur.com/WwOdFuk.png" alt="My Reader's Journey logo."/>
          <br />
           My Reader's Journey</h1>
        <h2> Sign in </h2>
      </div>
      <div id="login_errors">
        {ErrorHandler}
      </div>
      <div className="login_input_section">
        <div className="login_input_container">
          <label htmlFor='email'>Email</label>
            <div className="login_input_bar_count">
            <input
              name='email'
              type='email'

              value={email}
              onChange={updateEmail}
              required
              maxLength={255}
              />
              {emailCharCount > 0 ? (<span className='login_character_count'>Remaining Characters: {emailCharCount}/255</span>) : (<span id="nothing_render"></span>)}
            </div>
        </div>
        <div className="login_input_container">
          <label htmlFor='password'>Password</label>
            <div className="login_input_bar_count">
            <input
              name='password'
              type='password'

              value={password}
              onChange={updatePassword}
              required
              maxLength={40}
              minLength={6}
            />
            {passwordCharCount > 0 && (<div className='login_character_count'>Remaining Characters: {passwordCharCount}/40</div>)}
          </div>
        </div>
      </div>
      <div id="login_form_buttons">
        <button id="login_form_submit" type='submit'>Sign in</button>
      </div>
    </form>
  );
};

export default LoginForm;
