import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import * as pinActions from "../../store/pin"
import * as userAction from "../../store/users"
import { useSelector } from 'react-redux';
import Modal from "../context/model";
import { useState } from 'react';
function ProfileHome(){
    const dispatch=useDispatch()
    const pins=useSelector(state=>Object.values(state.pin))
    const [showPinInfo,setShowPinInfo]=useState(false)
    const [selectedPin,setSelectedPin]=useState(null)
    useEffect(()=>{
        dispatch(pinActions.fetchAllPins())
        dispatch(userAction.fetchUsers())
    },[])
    function handelShowPinInfo(pin){
        setShowPinInfo(true)
        setSelectedPin(pin)
    // console.log(selectedPin.userId)

    }
    function handelModalClose(){
        setShowPinInfo(false);
    }

    const user=useSelector(state=>{
        // return state.users[selectedPin.userId]
        console.log(state.users)
    })
    // console.log(user)

    return (
        <>
        <div className='pinscontainer'>
        {pins.map(pin=> <div className='allPins'> <img className='allPinImg' src={pin.imgUrl} onClick={()=>handelShowPinInfo(pin)}/></div>)}
        </div>
        {showPinInfo&&
        <Modal onClose={handelModalClose} className="pinshow">
            <div className='pinInfo'>
                <div>
                <img className='allPinImg' src={selectedPin.imgUrl}/>
                </div>
                <div className='info'>
                <h2 className='pinT'>{selectedPin.title}</h2>
                <h2 className='pinT'>{selectedPin.description}</h2>

                </div>
            </div>
        </Modal>
        }
        </>
    )
}
export default ProfileHome