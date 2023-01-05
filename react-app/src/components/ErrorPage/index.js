import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
// import { Redirect, useHistory, NavLink } from "react-router-dom";
import { useSelector } from "react-redux"
import "./ErrorPage.css"

const ErrorPage = ()=> {

  return (
    <div id="page-not-found-container">
    <h1>Page Not Found</h1>

    <p>The page you requested does'nt exist. Please check the url again, or visit the home page. </p>
    <NavLink to="/">
    <span>« go to the my reader's journey homepage</span>
    </NavLink>
    </div>
  )
}

export default ErrorPage
