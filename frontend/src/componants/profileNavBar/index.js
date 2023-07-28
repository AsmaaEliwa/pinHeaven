import logo from "./logo.png"
import { NavLink, Redirect } from 'react-router-dom';
import "./profileNav.css"
import { useState } from 'react';
import { useHistory } from "react-router-dom";

function ProfileNavBAr({ user }) {
    const history = useHistory();
    const [showUser, setShowUser] = useState(false)

    function toggelUserProfile() {
        setShowUser(prevuse => !prevuse)
    }
    function handelCreatePin(){
      console.log("cliked")
      debugger
      history.push("/pins/new")
    }

    return (
        <>
            <div className="profileNav">
                <img src={logo} className="plogo" />
                <NavLink to="/" className="home">Home</NavLink>
                {/* <select id="dropdown" className="create"> */}
                <NavLink to="/pins/new" className="create">Create Pin  <i className="fa-solid fa-chevron-down "  ></i> </NavLink>
                {/* </select> */}
                <form id="searchForm">
                    <input type="text" id="searchInput" placeholder="Search " />
                </form>
                <button className="user" onClick={toggelUserProfile}>{user.username[0]}</button>
            </div>
              {showUser &&
                <>
                         { history.push(`/users/${user.id}`)}

                </>
              }
        </>
    )


}
export default ProfileNavBAr;