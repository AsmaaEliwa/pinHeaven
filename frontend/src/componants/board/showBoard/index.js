import "./board.css"
import React, { useState, useEffect ,useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import * as boardActions from "../../../store/board";
import Modal from "../../context/model";
import { useHistory } from 'react-router-dom';

function ShowBoard({ user }) {
  const dispatch = useDispatch();
  const [showBoardInfo, setShowBoardInfo] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null)
  const history=useHistory()
  const boards = useSelector((state) => {
    return user.boardIds.map((id) => {
      return state.boards[id];
    });
  });
  useEffect(() => {
 
    dispatch(boardActions.fetchBoards(user.id));
  }, [user.id]);
  if (!boards[0]) return null;

  const handleOutsideClick = ( board) => {
    setSelectedBoard(board);
 
    setShowBoardInfo(true);
    
  };
  const handleModalClose = () => {
    setShowBoardInfo(false);
  };
//   function handelEdite(pin) {
//     const user_id = user?.id; 
//     if (user_id) {
//     history.push(`/pins/edit/${pin.id}`);
//     }
  


  return (
    <div className="componant">
      {/* <h1>hello</h1> */}
      {/* {pins.map((pin) => {
        if (!pin) return null; 
        return <><div className="pins "> <img key={pin.id} src={`${pin.imgUrl}`} onClick={()=>handleOutsideClick(pin)} className="pinimg " /> <div className="edit"  > <FontAwesomeIcon icon={faPen} fade onClick={()=>handelEdite(pin)} /> </div> </div> </>
      })} */}
      {showBoardInfo && 
      <Modal onClose={handleModalClose} >
              <div className="imageinfo">

                <div className="sidinfo">
                <h2 className="pintitle"> {selectedBoard.title}</h2>
              </div>
              </div>
              </Modal>
              }
              
    </div>
  );
}
export default ShowBoard;


















