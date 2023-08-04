import logo from "./logo.png"
import { NavLink, Redirect } from 'react-router-dom';
import "./profileNav.css"
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import SearchBar from "./searchBar";
import { Link } from "react-router-dom";
function ProfileNavBAr({ user }) {
    const history = useHistory();
    const [showUser, setShowUser] = useState(false)

    function toggelUserProfile() {
        setShowUser(prevuse => !prevuse)
    }

    
    return (
        <>
            <div className="profileNav">
                <img src={logo} className="plogo" />
                <NavLink to="/" className="home">Home</NavLink>
                <NavLink to="/pins/new" className="create">Create Pin  <FontAwesomeIcon icon={faChevronDown} size="lg" /> </NavLink>
                <SearchBar/>
                <div className="contactgit">
                <a href="https://github.com/AsmaaEliwa" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} style={{ color: 'darkgray' }} /></a> 
                </div>
                <div className="contactlink">
                <a href="https://www.linkedin.com/in/asmaa-eliwa-38a38621a/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} style={{ color: 'darkgray' }} /></a> 
                </div>
                <button className="user" onClick={toggelUserProfile}>{user.username[0].toUpperCase()}</button>
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