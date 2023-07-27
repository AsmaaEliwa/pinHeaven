import React from 'react';
import { useSelector } from 'react-redux';
import Profile from './profile.js';
import "./navigation.css"
import { Redirect } from 'react-router-dom';


function Navigation() {


  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
    <>
        {/* <Redirect to="/profile" /> */}

      <Profile user={sessionUser} />
        </>

    );
  } else {
    sessionLinks = (
      <>
      <Redirect to="/home" />
  
   </>
    );
  }

  return (
    <>
        {sessionLinks}
    </>
  );
}

export default Navigation;