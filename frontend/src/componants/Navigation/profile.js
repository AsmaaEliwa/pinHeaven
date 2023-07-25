import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "./profile.css"
import ProfileNavBAr from "../profileNavBar";
import { NavLink, useHistory } from "react-router-dom";
function Profile({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const history =useHistory();
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
     dispatch(sessionActions.logout()).then(()=>{
      history.push("/home")

     })
  };
  return (
    <>
        <ProfileNavBAr user={user}/>

    <div ref={menuRef} className="profile">
      <button onClick={toggleMenu} className="dropdown">
      <i className="fa-solid fa-chevron-down "  ></i>    </button>
      {showMenu && (
        
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
            <NavLink to="/update">Settings</NavLink>
          </li>
        </ul>
      )}
    </div>
    </>

  );
}
export default Profile;