import { NavLink } from 'react-router-dom';
import { useSelector,useDispatch  } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import * as userActions from "../../store/users";
import ShowPin from '../pin/showPin';
function UserProfile() {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users[userId]);
    // debugger
    useEffect(() => {
      dispatch(userActions.fetchUser(userId));
    }, [userId]);
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