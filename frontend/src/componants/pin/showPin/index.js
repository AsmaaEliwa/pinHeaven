import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as pinActions from "../../../store/pin";
import PinModal from "../../pinModal/index";
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
  const history = useHistory()
  const pins = useSelector((state) => {
    const pinIds = user.pinIds ? user.pinIds : [];
    return pinIds.map((id) => {
      return state.pin[id];
    });
  });
  useEffect(() => {

    dispatch(pinActions.fetchPins(user.id));
  }, [user.id]);
  if (!pins[0]) return null;

  const handleOutsideClick = (pin) => {
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
    <div className="conainer" >
      {pins?.map((pin) => {
        if (!pin) return null;
        return <><div className="pins "> <img key={pin?.id} src={`${pin?.imgUrl}`}className="pinimg " /><div className="image-overlay"  onClick={() => handleOutsideClick(pin)} ></div>  <FontAwesomeIcon icon={faPen} fade onClick={() => handelEdite(pin)} />  </div> </>
      })}
      {showPinInfo &&
        <PinModal onClose={handleModalClose} >
          <div className="imageinfo">

            {<img src={`${selectedPin?.imgUrl}`} className="pininfo" />

            }
            <div className="sidinfo">
              <h2 className="title"> {selectedPin?.title}</h2>
              <p>{selectedPin.description}</p> 
              <div className="pin-userinfo">
                <div className="userpin" >{user?.username[0]}</div>
                <p className="username">{user?.username}</p>
              </div>
            </div>
          </div>
        </PinModal>
      }

    </div>
  );
}
export default ShowPin;


















