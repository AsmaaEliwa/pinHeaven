import "./boardPin.css"
import { useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import { useDispatch } from "react-redux";
import * as boardActions from "../../../store/board"
function BoardPinCreate({user}){
  // debugger
  const dispatch = useDispatch();
  const boardsData = useSelector((state) => {
    return user?.boardIds.map((boardId) => Object.values(state.boards)[boardId]);
  });

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

console.log(boards)
// if(boards.length != 0) {
//   debugger
//    setShowBoards(true)
// }


return (
<div className='pickboard'>
  

<select>
<option>All Pins</option>
{ boards.map(board=>  <option>{board.title}</option> )}
</select>
</div>
)
}
export default BoardPinCreate;