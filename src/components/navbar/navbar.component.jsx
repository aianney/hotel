import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.styles.css'

const Navbar = () => (
  <div className="header">
    <Link to="/">
      <img
        className="logo-container"
        src="https://i.ibb.co/5k6zK7W/logo-wide.png"
        alt=""
      />
    </Link>
    <div className="options">
      <Link className="option" to="/">
        Home
      </Link>
      {/* <Link className="option" to="/guest-details">
        Guest Details
      </Link> */}
      <Link className="option" to="/contact-us">
        Contact Us
      </Link>
    </div>
  </div>
)

export default Navbar
