import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import './index.css'

const Header = () => {
    const location = useLocation();
    return (
        <div className='header_main_container'>
            <div className='header_inner_container'>
                {location.pathname !== "/" ? (
                <div id='header_home_logo_link'>
                   <NavLink to='/' exact={true} >
                        <img src="/favicon.png" alt="Home Button" />
                    </NavLink>
                </div>
                ) : (
                <div id='header_home_logo_link'>
                    <img src="./favicon.png" alt="Home Button" />
                </div>
                )}
                <NavBar />
            </div>
        </div>
    )
}

export default Header
