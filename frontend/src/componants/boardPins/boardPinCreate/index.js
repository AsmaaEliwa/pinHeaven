// import "./boardPin.css"
import { useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import { useDispatch } from "react-redux";
import * as boardActions from "../../../store/board"
import { useHistory } from 'react-router-dom';
function BoardPinCreate({user}){

  const history=useHistory()
  const dispatch = useDispatch();
  const boardsData = useSelector((state) => {
    return user?.boardIds.map((boardId) => Object.values(state.boards)[boardId]);
  });
  const [selectedBoard,setSelectedBoard]=useState(0)
  
  const [boards, setBoards] = useState([]);
  const [showBoards,setShowBoards]=useState(false)

  useEffect(() => {
    // Set the state when the boardsData is available
    if (boardsData) {
      setBoards(boardsData);
      // setShowBoards(true)
    }
  }, []);

  useEffect(() => {
    if (boards.length === 0) {
      // debugger
      setShowBoards(false)
      dispatch(boardActions.fetchBoards(user.id)).then((res) => {
      //  debugger
        setBoards(Object.values(res));
      });
    }
  }, [user.id ,boards,dispatch]);

// console.log(boards)
// if(boards.length != 0) {
//   debugger
//    setShowBoards(true)
// }

// function handelselectingBoard(board){

// // e.preventDefault();
// dispatch(boardPinActions.createBoardPin(board)).then(()=>{
//   history.push(`/users/${user.id}`)
// });


// }
function handelChange(e){
  e.preventDefault()
  setSelectedBoard( parseInt(e.target.value, 10));

// console.log(selectedBoard)
}

return (
<>
  

<select className="selectBoard" onChange={handelChange}>
<option>All Pins</option>
{ boards.map(board=>  <option  key={board.id} value={board.id}>{board.title}</option> )}
</select>
</>
)
}
export default BoardPinCreate;