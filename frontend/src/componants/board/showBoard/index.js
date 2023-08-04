import "./board.css"
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as boardActions from "../../../store/board";
import { useHistory, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../context/model"
import { useParams } from "react-router-dom";
import *  as boardPinsActions from "../../../store/boardPins"
function ShowBoard() {
  const { userId } = useParams();
  const user = useSelector((state) => state.users[userId]);
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [showBoardEdit, setShowBoardEdit] = useState(false);
  const [title, setTitle] = useState("")
  const [selectedBoard, setSelectedBoard] = useState(null)
  const history = useHistory()
  const boards = useSelector((state) => {

    const boardIds = user.boardIds ? user.boardIds : [];
    return boardIds.map((id) => {
      return state.boards[id];
    });


  });
  useEffect(() => {
    dispatch(boardActions.fetchBoards(userId));
    dispatch(boardPinsActions.fetchBoardPins(userId))
  }, [userId]);
  const boardPins = useSelector(state => {
    return state.boardPins
  })
  const pins = useSelector(state => {
    return state.pin
  })



  function handelBoardPin(e, board) {
    e.preventDefault()
    history.push(`/boards/${board.id}`)
  }

  function handelEdite(e, board) {
    e.preventDefault()
    setTitle(board.title)
    setShowBoardEdit(true)
  }
  function handelModalClose(e) {
    e.preventDefault()
    setShowBoardEdit(false)
  }
  function handelEditSubmit(e) {
    e.preventDefault()
    const boardId = selectedBoard.id
    if (Number(userId) === currentUser.id) {
      dispatch(boardActions.updateBoard({ boardId, title })).then(() => { setShowBoardEdit(false) })
    }
  }
  function handelDeleteBoard(e) {
    e.preventDefault();
    if (Number(userId) === currentUser.id) {
      dispatch(boardActions.removeBoard({ boardId: selectedBoard.id, userId })).then(() => {
        history.push(`/users/${currentUser.id}`)
      })
    }
  }

  if (!boards[0]) return null;
  if (!boardPins) return null;

  return (
    <div className="boardContainer">
      <div className="allBoards">
        {boards?.map((board) => {
          const [firstPinId, secondPinId] = boardPins[board?.id] || [];
          return (
            <div className="allBoard" onClick={(e) => handelBoardPin(e, board)}>
              {firstPinId && <img className="imgBoard" src={`${pins[firstPinId]?.imgUrl}`} />}
              {firstPinId && <div className="btnimg"></div>}
              {secondPinId && <img className="img2Board" src={`${pins[secondPinId]?.imgUrl}`} />}

              <div className="boardEdit">
                <FontAwesomeIcon
                  icon={faPen}
                  onClick={(e) => {
                    setSelectedBoard(board);
                    e.stopPropagation();
                    handelEdite(e, board);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      {showBoardEdit &&
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
            <button className="createboardnbtn" onClick={handelDeleteBoard}>Delete </button>
          </form>
        </Modal>}
    </div>
  );
}
export default ShowBoard;


















