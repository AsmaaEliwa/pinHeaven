// import React, { useState, useEffect, useRef } from "react";
// import { useDispatch } from "react-redux";
// import * as sessionActions from "../../store/session";
// import "./profile.css"
// import { NavLink, useHistory } from "react-router-dom";
// function CreatePinBut({ user }) {
//   const dispatch = useDispatch();
//   const [showMenu, setShowMenu] = useState(false);
//   const menuRef = useRef(null);
//   const history = useHistory();
//   useEffect(() => {
//     const handleOutsideClick = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setShowMenu(false);
//        }
//     };
//     document.addEventListener("click", handleOutsideClick);
//     return () => document.removeEventListener("click", handleOutsideClick);
//   }, []);
//   const toggleMenu = () => {
//     setShowMenu((prevShowMenu) => !prevShowMenu);
//   };

//   function redirectToProfile() {
//     return history.push(`/pins/new`)
//   }
  
//   return (
//     <>

//       <div ref={menuRef} className="profile">

//         <button onClick={toggleMenu} className="dropdown">
//           <i className="fa-solid fa-chevron-down "  ></i>    </button>
//         {showMenu && (

//           <div className="profile-dropdown">
//             <div className="username" onClick={redirectToProfile}>
//               <li>Create Pin</li>
//             </div>
//             <li>
//               <NavLink to="/update" className="settings">Settings</NavLink>

//             </li>
//           </div>
//         )}
//       </div>
//     </>

//   );
// }
// export default CreatePinBut;