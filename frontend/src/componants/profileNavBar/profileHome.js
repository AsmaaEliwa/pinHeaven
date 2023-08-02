import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import * as pinActions from "../../store/pin"
import * as userAction from "../../store/users"
import { useSelector } from 'react-redux';
import Modal from "../context/model";
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
function ProfileHome() {
    const dispatch = useDispatch()
    const pins = useSelector(state => Object.values(state.pin))
    const [showPinInfo, setShowPinInfo] = useState(false)
    const [selectedPin, setSelectedPin] = useState(null)
    useEffect(() => {
        dispatch(pinActions.fetchAllPins())
        dispatch(userAction.fetchUsers())
    }, [])
    function handelShowPinInfo(pin) {
        setShowPinInfo(true)
        setSelectedPin(pin)
        // debugger

    }
    function handelModalClose() {
        setShowPinInfo(false);
    }

    const users = useSelector(state => {
        return state.users || null
    })
    const getUserById = (userId) => {

        return users[userId] || null;
    };

    console.log(pins)

    if (!pins[0]) return null
    if (!users) {
        return <p>Loading...</p>;
    }
    // debugger

    return (
        <>
            <div className='pinscontainer'>
                {pins[0] && pins?.map(pin => <div className='allPins'> <img className='allPinImg' src={pin?.imgUrl} onClick={() => handelShowPinInfo(pin)} /></div>)}
            </div>
            {showPinInfo &&
                <Modal onClose={handelModalClose} className="pinshow">
                    <div className='pinInfo'>
                        <div>
                            <img className='allPinImg' src={selectedPin.imgUrl} />
                        </div>
                        <div className='info'>
                            <h2 className='pinT'>{selectedPin.title}</h2>
                            <h2 className='pinT'>{selectedPin.description}</h2>
                            <NavLink to={`/users/${selectedPin.userId}`}  className="visituser"> <div className='firstlitter'>{getUserById(selectedPin.userId).username[0].toUpperCase()} </div>      <div className='pinCreator'>{getUserById(selectedPin.userId).username}</div></NavLink>

                        </div>
                    </div>
                </Modal>
            }
        </>
    )
}
export default ProfileHome