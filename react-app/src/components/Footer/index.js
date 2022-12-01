import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect, NavLink, useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const location = useLocation()
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(sessionActions.logout());
  };
  return (
  <div className="footer_container">
    <div className="footer_content">
        {/* <div className="create-button-box">
          <span className="footer-heavy-text"> Create your own Groupup group. </span>
          {!sessionUser && <NavLink to="/signup" className="get-started-button">Get Started</NavLink>}
          {sessionUser && <NavLink to="/new-group" className="get-started-button">Get Started</NavLink>}
        </div>
        <br />
        <br /> */}
      <span className="foot_bottom_menu">
        <div className="footer_width_half">
          <span className="footer_heavy_text">Bradley Lewter</span>
            <ul className="footer_item_padding">
              <li>
                <a href="https://www.linkedin.com/in/bradley-lewter/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin fa-2x"></i></a>
              </li>
              <li>
              <a href="https://github.com/DairyDuke" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-square-github fa-2x"></i></a>
              </li>
            </ul>
        </div>
        {/* <div className="footer_width_half">
          <span className="footer_heavy_text">Placeholder - About Page Modal</span>
            <div className="footer_social_medias">

              <br/>
              🐤📥
            </div>
        </div> */}
      </span>
    </div>
  </div>
  )
}

export default Footer;
