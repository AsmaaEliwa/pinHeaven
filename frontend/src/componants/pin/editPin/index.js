import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as pinActions from "../../../store/pin";
import { useHistory } from "react-router-dom";
import "../createPin/createPin.css"
import "./editPin.css"
import { useParams } from "react-router-dom";
import { Redirect } from "react-router-dom";
function EditPinForm(){
    const {pinId}=useParams();
    const pin=useSelector(state=> state.pin[pinId] )
    const user=useSelector(state=> state.session.user)
    // console.log(pin) 
    const dispatch = useDispatch();
    const [title, setTitle] = useState(pin?.title);
    const [description, setDescription] = useState(pin?.description);
    const history = useHistory();
    useEffect(()=>{
        if (!pin){
            dispatch(pinActions.fetchPin(pinId)).then((pin)=>{
                setDescription(pin.description);
                setTitle(pin.title);
            })
        }
    },[pinId])

    
      
            const handleSubmit = async (e) => {
                e.preventDefault();
          
                dispatch(pinActions.updatePin({...pin ,title,description})).then(()=>{
                    history.push(`/users/${user.id}`)
                });
    
              };
              function handelDelete(){
                dispatch(pinActions.removePin(pinId)).then(()=>{
                    history.push(`/users/${user.id}`)
                })
              }
   
        return (
            <div className='createpin'>
                <div className='createpin_form'>
                     <h1 className="h1Title">Edit this Pin</h1>

                <form className="editform"  onSubmit={handleSubmit}>   
                <div className="pinedit">

                <div className="flex">
                  <label className="editLabel"> Board
                    </label>
                       <select className='editSelect' value="Decorations">
                           <option  value=""selected disabled > Decorations</option>
                           <option></option>
                           <option></option>
                       </select> 
                     </div>                   


                     <div className="flex">
                  <label className="editLabel"> Section
                    </label>
                       <select className='editSelect' value="Decorations">
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

                    <div className="editbtn">
                    <button type="submit" className="editpinnbtn">Save </button>
                    </div>
                    <div className="editbtn">
                    <button  className="deletepinnbtn" onClick={handelDelete} >Delete </button>
                    </div>
                </form>


                </div>
            </div>
        );
    }
    
    

  
  export default EditPinForm;


  



















