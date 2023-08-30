import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import * as pinActions from "../../../store/pin"
function PinPage(){
    const {pinId}=useParams()
    const dispatch =useDispatch()
    const pins= useSelector(state=> state.pin)
    const myPin=pins[pinId]

    useEffect(()=>{
        dispatch(pinActions.fetchAllPins())
    },[])
    if(!myPin) return null
return (
    <div id="search-results-container">
    {
      <div className="pin-card" key={myPin.id}>
        <h2>{myPin.title}</h2>
        <p>{myPin.description}</p>
        <img src={`${myPin.imgUrl}`} alt={myPin.title} />
      </div>
    }
  </div>
)
}
export default PinPage;