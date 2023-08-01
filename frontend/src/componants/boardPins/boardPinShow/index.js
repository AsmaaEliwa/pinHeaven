import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as boardPinActions from "../../../store/boardPins"
import { useSelector } from 'react-redux';
function SgowBoardPin(){
    const dispatch=useDispatch()
    const user=useSelector(state=> state.session.user)
    useEffect(()=>{
        dispatch(boardPinActions.fetchBoardPins(user.id))
    },[user.id])
return (
    <>
    <h1>hello boardPins</h1>
    </>
)
}
export default SgowBoardPin