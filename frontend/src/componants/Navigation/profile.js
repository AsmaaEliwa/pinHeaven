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
  function redirectToProfile() {
    return history.push(`/users/${user.id}`)
  }
  
  return (
    <>
      <ProfileNavBAr user={user} />

      <div ref={menuRef} className="profile">

        <button onClick={toggleMenu} className="dropdown">
        <FontAwesomeIcon icon={faChevronDown} size="lg" />  </button>
        {showMenu && (

          <div className="profile-dropdown">
            <p> Currently in</p>
            <div className="username" onClick={redirectToProfile}>
              <li>{user.username}</li>
              <li>{user.email}</li>
            </div>
            <li>
              <NavLink to="/update" className="settings">Settings</NavLink>
              <button onClick={logout} className="logout">Log Out</button>
            </li>
          </div>
        )}
      </div>
    </>

  );
}
export default Profile;