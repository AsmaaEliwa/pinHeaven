import { NavLink } from 'react-router-dom';
import { useSelector,useDispatch  } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import * as userActions from "../../store/users";
import ShowPin from '../pin/showPin';
import { useHistory } from 'react-router-dom';
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons"; // Import the faPlus icon
import ShowBoard from '../board/showBoard';
import SgowBoardPin from '../boardPins/boardPinShow';
import * as pinActions from "../../store/pin"
import NotFound from '../erorrPage';
function UserProfile() {
    // debugger
    const { userId } = useParams() || { userId: null };
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users[userId]);
    const history=useHistory()
    useEffect(() => {
      dispatch(userActions.fetchUser(userId));
      dispatch(pinActions.fetchAllPins())

    }, [userId]);
    if (!userId || !user) {
        return <NotFound />;
    }
    function handelCreateBoard(){
        const user_id = user?.id; 
        if (user_id) {
        history.push("/boards/new")
        }
    }
    // debugger
   

    return (
        <div className="userProfile">
            <div className="firstlitter"> {user?.username[0].toUpperCase()}</div>
            <div className='nameEmail'>
            <h1>{user?.username}</h1>
            <p>{user?.email}</p>
            </div>
           
            {/* <div className='follow'> follow </div> */}

            <div className='addBoard' onClick={handelCreateBoard}><FontAwesomeIcon icon={faPlus} beat /></div>
            <ShowBoard user={user}/>
            <hr/>
            <h2 className='allpins'>Unorganized ideas</h2>
            <ShowPin user={user} />
            {/* <SgowBoardPin/> */}
        </div>
    )
}
export default UserProfile