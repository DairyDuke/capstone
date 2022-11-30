import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect, NavLink, useLocation } from 'react-router-dom';
// import ModalFunctions from '../Modals';
import './Footer.css';

const Footer = () => {
  const location = useLocation()
  // console.log("History "+location)
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(sessionActions.logout());
  };
  return (
  <div className="footer-container">
    <div className="footer-content">
        {/* <div className="create-button-box">
          <span className="footer-heavy-text"> Create your own Groupup group. </span>
          {!sessionUser && <NavLink to="/signup" className="get-started-button">Get Started</NavLink>}
          {sessionUser && <NavLink to="/new-group" className="get-started-button">Get Started</NavLink>}
        </div>
        <br />
        <br /> */}
      <span className="bottom-menu">
        <div className="footer_width_half">
          <span className="footer-heavy-text">COMPANY</span>
            <ul className="footer-item-padding">
              <li className="footer-item-padding">
                <NavLink to="/" className="footer-menu-links">
                  About us
                </NavLink>
              </li>
              <li className="footer-item-padding">
                <NavLink to="/login" className="footer-menu-links">
                  Placeholder
                </NavLink>
              </li>
            </ul>
        </div>
        <div className="footer_width_half">
          <span className="footer-heavy-text">Connect</span>
            <div className="footer-item-padding">
              Placeholder EMOJIS
              <br/>
              ℹ️🐤📥
            </div>
        </div>
      </span>
    </div>
  </div>
  )
}

export default Footer;
