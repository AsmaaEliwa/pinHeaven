import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as pinActions from "../../../store/pin";
import { useHistory } from "react-router-dom";
import "./createPin.css"
import { useRef } from "react";
function CreatePinFprm({user}) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const history = useHistory();
    const fileInputRef = useRef(null);

  
        const handleSubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append("pin[description]", description);
            formData.append("pin[user_id]", sessionUser.id);
            formData.append("pin[title]", title);
           

            if (image) {
              formData.append("pin[image]", image);
            }
          
            dispatch(pinActions.createPin(formData)).then(()=>{
                history.push("/")
            });

          };
          const handleFile = ({ currentTarget }) => {
            const file = currentTarget.files[0];
            setImage(file);
            if (file) {
              const fileReader = new FileReader();
              fileReader.readAsDataURL(file);
              fileReader.onload = () => setImageUrl(fileReader.result);
            } else setImageUrl(null);
          };
          let preview = null;
  if (image) preview = <img src={imageUrl} alt="" className="image-pin" />;
  
    return (
        <div className='createpin'>
            {/* {preview} */}
            <div className='createpin_form'>
            <form className="form"  onSubmit={handleSubmit}>
                <label className="imageinput">
                   {!imageUrl && <div className="imagestyle"><div className="uploadimage" > <i class="fa-solid fa-circle-arrow-up fa-bounce uploadimageicon"></i>
                   <p>Drag and drop or clike to upload</p></div>
                   </div>}
                    {imageUrl && <div className="preview-image" style={{ backgroundImage: `url(${imageUrl})` }}></div>}
                   
                    <input
                        ref={fileInputRef}
                        onChange={handleFile}
                        className='imageinput'
                        type="file"
                        required
                    />
                </label>
            <div className="pin_inputs">

                <label>
                   
                    <input
                        className='title'
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="Add your title"
                    />
                </label>
                <div className="userinfo">
                <div className="userpin" >{user?.username[0]}</div>
                <p className="username">{user?.username}</p>
                </div>
                <label>
                    <input
                        className='description'
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        // required
                        placeholder="Tell every one what your pin is about                                     😃 "
                    />
                </label>
                </div>
                <div className="btn">
                <button type="submit" className="createpinnbtn">Save </button>
                </div>
            </form>
            </div>
        </div>
    );
}


export default CreatePinFprm;