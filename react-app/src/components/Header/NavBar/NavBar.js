
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../../auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
  return (
    <div className="header_nav_container">
    <nav>
      <ul>
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
          <LogoutButton />
        </li>
      </ul>
    </nav>
    </div>
  );
}

export default NavBar;
