import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import * as pinActions from "../../store/pin"
import * as userAction from "../../store/users"
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PinModal from "../pinModal/index"
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
                {pins[0] && pins?.map(pin => <div className='allPins'> <img className='allPinImg' src={pin?.imgUrl}  /> <div className="image-overlay" onClick={() => handelShowPinInfo(pin)}></div></div>)}
            </div>
            {showPinInfo &&
                <PinModal onClose={handelModalClose} className="pinshow">
                    <div className='pinInfo'>
                        <div>
                            <img className='allPinImg' src={selectedPin.imgUrl} />
                        </div>
                        <div className='info'>
                            <h2 className='pinT'>{selectedPin.title}</h2>
                            <p>{selectedPin.description}</p>

                            <NavLink to={`/users/${selectedPin.userId}`}  className="visituser"> <div className='firstlitter'>{getUserById(selectedPin.userId).username[0].toUpperCase()} </div>      <div className='pinCreator'>{getUserById(selectedPin.userId).username}</div></NavLink>

                        </div>
                    </div>
                </PinModal>
            }
        </>
    )
}
export default ProfileHome