import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as boardActions from "../../../store/board"
import { useHistory } from "react-router-dom";
import "./boardForm.css"

function CreateBoardForm({user}) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [title, setTitle] = useState("");
    const history = useHistory();
    const formData = new FormData();
    formData.append("board[title]",title );
    formData.append("board[user_id]", sessionUser.id);
   
        const handleSubmit = async (e) => {
            e.preventDefault();
            const user_id = user?.id; 
            if (user_id) {
             dispatch(boardActions.createBoard(formData)).then(()=>{
                history.push(`/users/${user.id}`)
            })
        }

          };
       
  
  
    return (
        <div className='createBoard'>
            <div className='createBoardForm'>
                <h1 className="boardtitle">Create board</h1>
            <form  onSubmit={handleSubmit}>
                
            <div className="board_inputs">

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
                    {/* <input type="checkbox"  className="chek"/>Keep this board secret<br/>
                    <p className="secret">So only you and collaborators can see it. Learn more; Opens a new tab</p> */}
              
                <button type="submit" className="createboardnbtn">Create </button>
                
                </div>
              
            </form>
            </div>
        </div>
    );
}


export default CreateBoardForm;