import { useEffect,useState } from 'react';
import { useDispatch } from 'react-redux';
import * as boardPinActions from "../../../store/boardPins"
import * as pinActions from "../../../store/pin"
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import "../../profileNavBar/profileNav.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import PinModal from "../../pinModal/index"
import "./showBoardPin.css"
import * as boardActions from "../../../store/board"
function SgowBoardPin(){
    const {boardId}= useParams()
    const dispatch=useDispatch()
    const history=useHistory()

    const user=useSelector(state=> state.session.user)
    const [showPinInfo, setShowPinInfo] = useState(false);
    const [selectedPin, setSelectedPin] = useState(null)
    useEffect(()=>{
        dispatch(boardPinActions.fetchBoardPins(user.id))
        dispatch(pinActions.fetchPins(user.id))
        dispatch(boardActions.fetchBoards(user.id))

    },[user.id])
    const pinIds= useSelector(state=> {

      return state.boardPins[Number(boardId)]
    })

    const pins= useSelector(state=> {

        return pinIds?.map(id=> state.pin[id])
      })

      const boards=useSelector(state=>{
        return state.boards
      })


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

function addMorePins(e){
e.preventDefault();
history.push("/pins/new")
}
function redirectToProfile(){
history.push(`/users/${user.id}`)

}


if (!pinIds) return null
if (!pins) return null
if (!boards) return null
return (
    <>
 <h1 className='board-titile'>{boards[boardId]?.title}</h1>
 <div className='middle'>
<div className='firstlitter-board' onClick={redirectToProfile}>{user.username[0].toUpperCase()}</div>
<div className='firstlitter-board left' onClick={addMorePins}>+</div>
</div>
<h2 className='n-pins'>{pins.length} Pins</h2>
    <div className='pinscontainer'>
    {pins?.map(pin => (
  <div className="allPins-board" key={pin?.id}>
    <div className="imageContainer" onClick={() => handleOutsideClick(pin)}>
      <img src={`${pin?.imgUrl}`} className="allPinImg" />
      <div className='overall'></div>
      <div className="editIcon">
        <FontAwesomeIcon icon={faPen} onClick={() => handelEdite(pin)} />
      </div>
    </div>
  </div>
))}
    </div>
    {showPinInfo && 
      <PinModal onClose={handleModalClose} >
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
              </PinModal>
              }
    
    </>
)
}
export default SgowBoardPin