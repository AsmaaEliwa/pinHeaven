import logo from "./logo.png"
import { NavLink, Redirect } from 'react-router-dom';
import "./profileNav.css"
import { useState } from 'react';
import UserProfile from "./userProfile";
function ProfileNavBAr({ user }) {
    const [showUser, setShowUser] = useState(false)
    function toggelUserProfile() {
        setShowUser(prevuse => !prevuse)
        // setShowUser(true)

    }

    return (
        <>
            <div className="profileNav">
                <img src={logo} className="plogo" />
                <NavLink to="/" className="home">Home</NavLink>
                <select id="dropdown" className="create">
                    <option value="option1">Create</option>
                    <option value="option2">Create Ideal Pin</option>
                    <option value="option3"> Create Pin</option>
                </select>
                <form id="searchForm">
                    <input type="text" id="searchInput" placeholder="Search " />
                </form>
                <button className="user" onClick={toggelUserProfile}>{user.username[0]}</button>
            </div>
            {showUser &&
                <>
                    <Redirect to="/username" />
                    {/* <UserProfile user={user}/> */}
                </>
            }
        </>
    )


}
export default ProfileNavBAr;