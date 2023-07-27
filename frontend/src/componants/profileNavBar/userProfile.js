import { NavLink } from 'react-router-dom';
import ShowPin from '../pin/showPin';
function UserProfile({ user }) {

    if (!user) return null;
    return (
        <div className="userProfile">
            <div className="firstlitter"> {user.username[0]}</div>
            <h1>{user.username}</h1>
            <p>{user.email}</p>
            <NavLink to="/pins/new"> Create a Pin</NavLink>
            <ShowPin user={user} />
        </div>
    )
}
export default UserProfile