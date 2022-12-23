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

  return (
    <form id="login_form" onSubmit={onLogin}>
      <div id="signin_declaration">
        <h1>my reader's journey</h1>
        <h3> Sign In </h3>
      </div>
      <div id="login_errors">
        {ErrorHandler}
      </div>
      <div id="alignment_buttons">
      <div className="login_input_container">
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          type='email'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
          required
          maxLength={255}
        />
       {emailCharCount > 0 && (<div className='char-count'>{emailCharCount}/255</div>)}
      </div>
      <div className="login_input_container">
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
          required
          maxLength={40}
        />
        {passwordCharCount > 0 && (<div className='char-count'>{passwordCharCount}/40</div>)}
      </div>
    </div>
      <div id="login_form_buttons">
        <button id="login_form_cancel" type='button' onClick={()=> setShowModal(false)}>Close</button>
        <button id="login_form_submit" type='submit'>Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
