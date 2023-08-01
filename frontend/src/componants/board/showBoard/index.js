import "./board.css"
import React, { useState, useEffect ,useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import * as boardActions from "../../../store/board";
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../context/model"
import { useParams } from "react-router-dom";
function ShowBoard() {
  const { userId } = useParams();
  const user = useSelector((state) => state.users[userId]);
  const dispatch = useDispatch();
  const [showBoardEdit, setShowBoardEdit] = useState(false);
  const[title,setTitle]=useState("")
  const [selectedBoard, setSelectedBoard] = useState(null)
  const history=useHistory()
  const boards = useSelector((state) => {
    return user.boardIds.map((id) => {
      return state.boards[id];
    });
  });
  useEffect(() => {
    dispatch(boardActions.fetchBoards(userId)); 
  }, [userId]);


function handelBoardPin(e,board){
  e.preventDefault()
  history.push(`/boards/${board.id}`)
}

function handelEdite(e,board){
  // debugger
  e.preventDefault()
  setTitle(board.title)
  setShowBoardEdit(true)
}
function handelModalClose(e){
  e.preventDefault()
  setShowBoardEdit(false)
}
function handelEditSubmit(e){
  e.preventDefault()
  const boardId=selectedBoard.id
  dispatch(boardActions.updateBoard({boardId,title})).then(()=>{setShowBoardEdit(false)})
}
function handelDeleteBoard(e){
e.preventDefault()
dispatch(boardActions.removeBoard({boardId:selectedBoard.id,userId})).then(()=> {
  history.push(`/users/${user.id}`)})
}
// debugger
if (!boards[0]) return null;

 
  return (
    <div className="boardContainer">
    <div className="allBoards">
      {boards.map((board) => (
        <div className="allBoard" onClick={ (e)=>handelBoardPin(e,board)}>
          {board.title}
          <div className="imgBoard"></div>
          <div className="img2Board"></div>
          <div className="boardEdit">
            <FontAwesomeIcon
              icon={faPen}
              onClick={(e) => {
                setSelectedBoard(board)
                e.stopPropagation();
                handelEdite(e,board);
              }}
            />
          </div>
        </div>
      ))}
    </div>
    {showBoardEdit&&
    <Modal onClose={handelModalClose} >
     <form onSubmit={handelEditSubmit} className="editBoard"> 
      <h1>Edit this board</h1>
      <label className="boardName">Name
      </label>
      <input
          className='boardTitle'
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder={`Like "Places To Go" or "Recipes To Make"`}
                    />
      <button type="submit" className="editboardnbtn">Done </button>
      <button  className="createboardnbtn" onClick={handelDeleteBoard}>Delete </button>
      </form>
      </Modal>}
  </div>
  );
}
export default ShowBoard;


















