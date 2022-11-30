import React from "react";
import { NavLink } from 'react-router-dom';
import './Splash.css'

const Splash = ()=>{
  return(
    <>
      <div className="splash_main_container">
        <div className="splash_full_length_banner">
          <h1>Welcome👋</h1>
           <div id="splash_login_module">
              <h2>Discover & read more</h2>
              <div>
                "Signup"
              </div>
              <div>
                "Already a Member?" "Log In"
              </div>
           </div>
        </div>
        <div className="splash_content_container">
            <div id="splash_description_box">
              Deciding what to read next?
              <br />
              You’re in the right place. Tell us what titles or genres you’ve enjoyed in the past, and we’ll give you surprisingly insightful recommendations.
            </div>
            <div id="splash_description_box">
              What are your friends reading?
            <br />
              Chances are your friends are discussing their favorite (and least favorite) books on Goodreads.
            </div>
            <div id="splash_discover_reccomendations">
                <span id="splash_what_discover_box">
                  What will you discover?
                </span>
                <div className="splash_discover_reccomendations_books">
                </div>
                <div className="splash_discover_reccomendations_books">
                </div>
                <div className="splash_discover_reccomendations_books">
                </div>
            </div>
            <div className="splash_best_books_rating_container">
            </div>
        </div>
      </div>
    </>
  )
}

export default Splash
