import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import LoginFormModal from '../../auth/Login/LoginFormModal';
import LogoutButton from '../../auth/LogoutButton';
import SignUpFormModal from '../../auth/Signup/SignUpFormModal';
import CreateBookModal from '../../Book/CreateBook/CreateBookModal.js'
import './NavBar.css'

// Modal Imports

const NavBar = () => {
  // const location = useLocation();
  // console.log(location.pathname)
  const sessionUser = useSelector(state => state.session.user)
  const [status, setStatus] = useState(false);
  // const dispatch = useDispatch()
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);
  const handleCreate = (e)=> {
    e.stopPropagation();
    setStatus(!!status)
  }

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setStatus(false)
      setShowMenu(false);
    };

    if (status === false) {
    document.addEventListener('click', closeMenu);
  } else {
    document.body.addEventListener('click', closeMenu);
  }

    return () => {
      document.removeEventListener("click", closeMenu)
      document.body.removeEventListener("click", closeMenu)
    };
  }, [showMenu, status]);


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
              {/* <NavLink to="/" exact={true}>
                <span className="navbar_menu_text">Home</span>
              </NavLink> */}
              <NavLink to="/mybooks" exact={true}>
                <span className="navbar_menu_text">My Books</span>
              </NavLink>
              {/* <NavLink to="/mybooks" exact={true}>
                <span className="header_menu_text">My Books</span>
              </NavLink> */}
            </div>
            <div id="test">
              <div onClick={toggleMenu} id='navbar_profile_button'>
                <img src="https://i.imgur.com/pZlkRiA.png" alt="User Menu" />
              </div>

            {showMenu && (
              <div id='profile-dropdown-container'>
                <div id='profile-dropdown'>
                  <div id="dropdown-header">
                    {/* <NavLink to={`/users/${sessionUser.id}`} exact={true} className='dropdown-option image-option'> */}
                    <div className='dropdown-option image-option'>
                      <img id='navbar-profile-img' className='profile-img' alt='profile' src={sessionUser.profileImageUrl} />
                          <p>{sessionUser.username}</p>
                    </div>
                    {/* </NavLink> */}
                      <LogoutButton />

                  </div>
                  <div>
                    <NavLink to='/mybooks' exact={true} className='dropdown-option dropdown-followlink'>
                      <div className='dropdown-option-child'>
                        <p>My Books</p>
                      </div>
                      <div className='dropdown-option-child'>
                        <p>{}</p>
                      </div>
                    </NavLink>
                    <div className="dropdown_border-line">
                      <span>Librarian Powers</span>
                    </div>
                    {/* <NavLink to='/create-book' exact={true} className='dropdown-option dropdown-followlink'> */}
                      <div className='dropdown-option-child' onClick={handleCreate}>
                        {/* <p>Create Book</p> */}
                        <CreateBookModal showModal={showModal} setShowModal={setShowModal}/>
                      </div>
                      <div className='dropdown-option-child'>
                        <span>{}</span>
                      </div>
                    {/* </NavLink> */}
                  </div>
                </div>
              </div>
            )}
            </div>
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
