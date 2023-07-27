import * as pinActions from "../../../store/pin"
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useState } from "react";
import { useSelector } from 'react-redux';
import "./showPinstyle.css";


function ShowPin({user}){
    const dispatch=useDispatch()
    const  pinIds=user.pinIds
    const [pinsData, setPinsData] = useState([]);
    const pins = useSelector(state => state.pin)

    useEffect(()=>{
        const fetchPins = async () => {
            // debugger
            const fetchedPins = await Promise.all(pinIds.map(id => dispatch(pinActions.fetchPin(id))))
            setPinsData(fetchedPins);
          };
      
          fetchPins(); 
    },[pinIds])
    // console.log(pinsData[0].pin.imgUrl)
    return(
         <div>
             <h1>hello</h1>
      {pinsData.map(pinObject => {
       return   <img src={`${pinObject.pin.imgUrl}`} className="pinimg"/>
      })}
    </div>
    )
}
export default ShowPin