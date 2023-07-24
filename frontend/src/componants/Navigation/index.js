import React ,{useRef,useState}from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Profile from './profile.js';
import "./navigation.css"
import logoImage from './ph.png';
import LoginFormModal from '../loginFormModel/index.js';
import SignUpFormModal from '../signUpFormModel/index.js';
// import { useEffect } from 'react';


function Navigation() {


  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
    
      <Profile user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <div className='nav_bar' >
        <img className='logo' src={logoImage} alt="Logo" />
        <NavLink className="about" to="/">About</NavLink>
        <NavLink className="business" to="/">Business</NavLink>
        <NavLink className="blog" to="/">Blog</NavLink>
        <LoginFormModal></LoginFormModal>
        <SignUpFormModal></SignUpFormModal>
      </div>
    );
  }

  return (
    <>
      {/* <li> */}
        {/* <NavLink exact to="/">Home</NavLink> */}
        {sessionLinks}
      {/* </li> */}
    </>
  );
}

export default Navigation;