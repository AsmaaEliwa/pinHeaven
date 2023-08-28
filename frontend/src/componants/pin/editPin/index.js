import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as pinActions from "../../../store/pin";
import { useHistory } from "react-router-dom";
import "../createPin/createPin.css"
import "./editPin.css"
import { useParams } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Modal from "../../context/model"
import * as boardActions from "../../../store/board"
import * as boardPinActions from "../../../store/boardPins"
function EditPinForm(){
    // debugger
    const {pinId}=useParams();
    const pin=useSelector(state=> state.pin[pinId] )
    const user=useSelector(state=> state.session.user)
    const dispatch = useDispatch();
    const [title, setTitle] = useState(pin?.title);
    const [description, setDescription] = useState(pin?.description);
    const history = useHistory();
    const [deletePin , setDeletePin]=useState(false)
    const boards=useSelector(state=>Object.values(state.boards))
    const [selectedBoard,setSelectedBoard]=useState()
    const [fetch,setfetch]=useState(false)
    const boardPins=useSelector(state=>state.boardPins)
    const boardIds=Object.keys(boardPins)
    const pinsInBoard= Object.values(boardPins).flat()
    const isInBoard=pinsInBoard.includes(Number(pinId))
    const boardId = boardIds.find((id) => {
      const boardPinsForId = boardPins[id];
      if (boardPinsForId?.includes(Number(pinId))) {
        return id;
      }
    });

    
    console.log('boardId:', boardId);
    
    useEffect(()=>{
        if (!pin){
            dispatch(pinActions.fetchPin(pinId)).then((pin)=>{
            setDescription(pin.description);
            dispatch(boardPinActions.fetchBoardPins(user.id))
            setTitle(pin.title);
            })
        }
        dispatch(boardActions.fetchBoards(user.id))

    },[pinId])
    if(!pin)return null
    const pinCreator=pin.userId===user.id
    console.log(isInBoard)
    // function  handleSubmit(e){
    //     e.preventDefault();
    //     // debugger
    //     const boardPin={board_id:selectedBoard,pin_id:pinId}
    //     if(fetch){
    //         if (isInBoard){
    //         dispatch(boardPinActions.updateBoardPin(boardId,pinId,
    //             {board_id:selectedBoard ,pin_id: pin.id,}))
    //         }else{
    //             dispatch(boardPinActions.createBoardPin(boardPin))                    }


    //     }
    //     dispatch(pinActions.updatePin({...pin ,title,description})).then(()=>{
    //         history.push(`/users/${user.id}`)
    //     });
      

    //   };
            function  handleSubmit(e){
                e.preventDefault();
                debugger
                const boardPin={board_id:selectedBoard,pin_id:pinId}
                if(fetch){
                    if (isInBoard){
                        dispatch(boardPinActions.updateBoardPin(boardId,pinId,{board_id:selectedBoard ,pin_id: pin.id,}))          
                    }
                    else {dispatch(boardPinActions.createBoardPin(boardPin))}

                }
                dispatch(pinActions.updatePin({...pin ,title,description})).then(()=>{
                    history.push(`/users/${user.id}`)
                });
              
    
              };

              function handelDelete(e){
                  e.preventDefault()
                  setDeletePin(true)
              
              }
              function willDelete(e){
                e.preventDefault();
    if (pinCreator) {
      dispatch(pinActions.removePin(pinId))
        .then(() => {
          history.push(`/users/${user.id}`);
        })
        .catch((error) => {
        //   setError(error.message);
        });
    } else {
      dispatch(boardPinActions.removeBoardPin({ boardId, pinId }))
        .then(() => {
          history.push(`/users/${user.id}`);
        })
        .catch((error) => {
        //   setError(error.message);
        });
    }
              }
              function handelClode(e){
                  e.preventDefault()
                  setDeletePin(false)
              }
              function handelSelectBoard(e){
                  e.preventDefault()
                  setSelectedBoard( parseInt(e.target.value, 10));
                  setfetch(true)
              }
   
        return (
            <>
            <div className='createpin'>
                <div className='createpin_form'>
                     <h1 className="h1Title">Edit this Pin</h1>

                <form className="editform" onSubmit={handleSubmit} >   
                <div className="pinedit">

                <div className="flex">
                  <label className="editLabel"> Board
                    </label>
                       <select className='editSelect' value="Decorations" onChange={handelSelectBoard}>
                           <option>All Pins</option>
                           { boards.map(board=> <option  key={board.id} value={board.id}>{board.title}</option> )}
                       </select> 
                     </div>                   


                     <div className="flex">
                  <label className="editLabel"> Section
                    </label>
                       <select className='editSelect not-allow' value="Decorations">
                           <option  value=""selected disabled > Decorations</option>
                           <option></option>
                           <option></option>
                       </select> 
                     </div>                   
                     <hr className="line"/>


                     <div className="flex">
                    <label className="editLabel"> Title
                    </label>
                        <input
                            className='editTitle'
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                     </div>                   
                     <hr className="line"/>
                
                                 
    
                   <div className="flex">
                    <label className="editLabel">Description
                    </label>
                        <input
                            className='editDescription'
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}                                           
                        />
                   </div>
                   <hr className="line"/>

                   <div className="flex">
                    <label className="editLabel">Website
                    </label>
                        <input
                            className='editDescription'
                            type="text"
                        />
                   </div>

                    </div>

                    
                    

                    <div className="imgedit">
                        <img src={pin?.imgUrl} className="img-edit" />
                    </div>

                    {/* <div className="editbtn"> */}
                    <button type="submit" className="editpinnbtn">Save</button>
                    {/* </div> */}
                    
                </form>
                <div className="editbtn">
                    <button  className="deletepinnbtn" onClick={handelDelete} >Delete </button>
                    </div>

                </div>
            </div>

{deletePin&& <Modal onClose={handelClode}>
    <div className="are-u-sure">
    Are you sure you want to delete! 
    <><button onClick={willDelete} className="sure"> Yes Delete</button></>
    </div>
    </Modal>}



            </>

        );
    }
    
    

  
  export default EditPinForm;


  



















