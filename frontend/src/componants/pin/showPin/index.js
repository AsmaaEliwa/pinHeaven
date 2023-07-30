import React, { useState, useEffect ,useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import * as pinActions from "../../../store/pin";
import Modal from "../../context/model";
import "./showPinstyle.css"
import EditPinForm from "../editPin";
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
function ShowPin({ user }) {
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const [showPinInfo, setShowPinInfo] = useState(false);
  const [selectedPin, setSelectedPin] = useState(null)
  const history=useHistory()
  const pins = useSelector((state) => {
    return user.pinIds.map((id) => {
      return state.pin[id];
    });
  });
  useEffect(() => {
 
    dispatch(pinActions.fetchPins(user.id));
  }, [user.id]);
  if (!pins[0]) return null;

  const handleOutsideClick = ( pin) => {
    setSelectedPin(pin);
 
    setShowPinInfo(true);
    
  };
  const handleModalClose = () => {
    setShowPinInfo(false);
  };
  function handelEdite(pin) {
    const user_id = user?.id; 
    if (user_id) {
    history.push(`/pins/edit/${pin.id}`);
    }
  }


  return (
    <div className="componant">
      {/* <h1>hello</h1> */}
      {pins.map((pin) => {
        if (!pin) return null; 
        return <><div className="pins "> <img key={pin.id} src={`${pin.imgUrl}`} onClick={()=>handleOutsideClick(pin)} className="pinimg " /> <div className="edit"  > <FontAwesomeIcon icon={faPen} fade onClick={()=>handelEdite(pin)} /> </div> </div> </>
      })}
      {showPinInfo && 
      <Modal onClose={handleModalClose} >
              <div className="imageinfo">
                
                {<img src={`${selectedPin.imgUrl}`} className="pininfo"/>
                   
                  }
                <div className="sidinfo">
                <h2 className="pintitle"> {selectedPin.title}</h2>
                
                {selectedPin.description}
                <div className="userinfo">
                <div className="userpin" >{user?.username[0]}</div>
                <p className="username">{user?.username}</p>
                </div>
              </div>
              </div>
              </Modal>
              }
              
    </div>
  );
}
export default ShowPin;


















