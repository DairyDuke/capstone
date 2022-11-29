import React from 'react';
import { NavLink } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import './index.css'

const Header = () => {
    return (
        <div className='header_main_container'>
            <div className='header_inner_container'>
                <div id='header_home_logo_link'>
                    <NavLink to='/' exact={true} >
                        <img src="https://i.imgur.com/pUomO8z.jpg" alt="Placeholder Home Button" />
                    </NavLink>
                </div>
                <NavBar />
            </div>
        </div>
    )
}

export default Header
