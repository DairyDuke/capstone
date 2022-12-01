import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoginFormModal from '../../auth/Login/LoginFormModal';
import LogoutButton from '../../auth/LogoutButton';
import SignUpFormModal from '../../auth/Signup/SignUpFormModal';
import './NavBar.css'

// Modal Imports

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)
  // const dispatch = useDispatch()
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  return (
    <div className="navbar_container">
      <nav>
        {!sessionUser && (
          <div id='navbar_auth_buttons'>
            {/* <DemoUserButton /> */}
            <LoginFormModal />
            <SignUpFormModal />
          </div>)
        }
        {sessionUser && (
          <div id="navbar_session_container">
            <div id="navbar_session_links">
              <NavLink to="/" exact={true}>
                <span className="navbar_menu_text">Home</span>
              </NavLink>
              <NavLink to="/mybooks" exact={true}>
                <span className="navbar_menu_text">My Books</span>
              </NavLink>
              {/* <NavLink to="/mybooks" exact={true}>
                <span className="header_menu_text">My Books</span>
              </NavLink> */}
            </div>
            <div onClick={toggleMenu} id='navbar_profile_button'>
              <img src="https://i.imgur.com/pZlkRiA.png" alt="User Menu" />
            </div>
            {showMenu && (
              <div id='profile-dropdown-container'>
                <div id='profile-dropdown'>
                  <div id="dropdown-header">
                    <p>Account</p>
                      <LogoutButton />
                  </div>
                  <div>
                    <NavLink to={`/users/${sessionUser.id}`} exact={true} className='dropdown-option image-option'>
                      <img id='navbar-profile-img' className='profile-img' alt='profile' src={sessionUser.profileImageUrl} />
                      <div className='navbar-username-container'>
                        <p className='navbar-username'>{sessionUser.username}</p>
                        <p className='navbar-username your-posts'>Your posts</p>
                      </div>
                    </NavLink>
                    <NavLink to='/following' exact={true} className='dropdown-option dropdown-followlink'>
                      <div className='dropdown-option-child'>
                        <div id='follow-icon'>
                          <i className="fa-solid fa-user-plus" />
                        </div>
                        <p>Following</p>
                      </div>
                      <div className='dropdown-option-child'>
                        <p>{}</p>
                      </div>
                    </NavLink>
                    <NavLink to='/followers' exact={true} className='dropdown-option dropdown-followlink'>
                      <div className='dropdown-option-child'>
                        <div id='follow-icon'>
                          <i className="fa-solid fa-users"></i>
                        </div>
                        <p>Followers</p>
                      </div>
                      <div className='dropdown-option-child'>
                        <p>{}</p>
                      </div>
                    </NavLink>

                  </div>
                </div>
              </div>
            )}
            {/* <CreateFormModal /> */}
          </div>)
          }


      {/* <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/mybooks' exact={true} activeClassName='active'>
            My Books
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
        </li>
      </ul> */}
    </nav>
  </div>
  );
}

export default NavBar;
