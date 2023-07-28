import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as pinActions from "../../../store/pin";
import "./showPinstyle.css"
function ShowPin({ user }) {
  const dispatch = useDispatch();
  const [showInfo, setShowInfo] = useState(false);
  const pins = useSelector((state) => {
    return user.pinIds.map((id) => {
      return state.pin[id];
    });
  });

  useEffect(() => {
 
    dispatch(pinActions.fetchPins(user.id));
  }, []);
  function handelImage(){
    setShowInfo(last=> !last);
  }

  if (!pins[0]) return null;

  return (
    <div>
      {/* <h1>hello</h1> */}
      {pins.map((pin) => {
        return <img key={pin.id} src={`${pin.imgUrl}`} className="pinimg" onClick={handelImage}/>;
      })}
      {showInfo && 
              <div className="imageinfo">
                hello im here
              </div>}
    </div>
  );
}
export default ShowPin;


















