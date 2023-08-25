import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "./profile.css"
import ProfileNavBAr from "../profileNavBar";
import { NavLink, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
function Profile({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const history = useHistory();
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
       }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const toggleMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  const logout = (e) => {
    e.preventDefault();
    // debugger
    dispatch(sessionActions.logout()).then(() => {
      // debugger
      history.push("/home")
    });
  };
  function redirectToProfile(e) {
    e.preventDefault()
    return history.push(`/users/${user.id}`)
  }
  function redirectToEditProfile() {
    return history.push("/update")
  }
  
  return (
    <>
      <ProfileNavBAr user={user} />

      <div ref={menuRef} className="profile">

        <button onClick={toggleMenu} className="dropdown" >
        <FontAwesomeIcon icon={faChevronDown} size="lg" />  </button>
        {showMenu && (

          <div className="profile-dropdown">
            <p> Currently in</p>
            {/* <div className="username" onClick={redirectToProfile}> */}
            <div className="username" onClick={redirectToProfile}>
  <li>{user.username}</li>
  <li>{user.email}</li>
</div>
<li>
  <button className="logout not-allow" onClick={(e) => e.stopPropagation()}>Add account</button>
  <button className="logout not-allow" onClick={(e) => e.stopPropagation()}>Convert to business</button>
  <div className="settings" onClick={redirectToEditProfile}>Settings</div>
  <button className="logout not-allow" onClick={(e) => e.stopPropagation()}>Turn your home feed</button>
  <button className="logout not-allow" onClick={(e) => e.stopPropagation()}>Your privacy rights</button>
  <button className="logout not-allow" onClick={(e) => e.stopPropagation()}>Get help</button>
  <button onClick={logout} className="logout">Log Out</button>
</li>
          </div>
        )}
      </div>
    </>

  );
}
export default Profile;