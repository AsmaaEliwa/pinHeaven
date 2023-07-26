import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../../store/pin";
import { useHistory } from "react-router-dom";
function CreatePinFprm() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('pin[title]', title);
        formData.append('pin[description]', description);
        formData.append('pin[user_id]', sessionUser?.id);
        if (image) {
            formData.append('pin[image]', image);
        }
        setLoading(true);
        setErrors([]);
        return dispatch(sessionActions.createPin(formData))
            .catch(async (res) => {
                setLoading(false)

                let data;
                try {
                    // .clone() essentially allows you to read the response body twice
                    data = await res.clone().json();
                } catch {
                    // debugger;
                    data = await res.text(); // Will hit this case if the server is down
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            }).then(() => {
                history.push("/username")
            })

    };
    const handleFile = ({ currentTarget }) => {
        const image = currentTarget.files[0];
        console.log(image)
        setImage(image);
        if (image) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(image);
            fileReader.onload = () => setImage(fileReader.result);
        } else setImage(null);
    }
    let preview = null;
    if (image) preview = <img src={image} alt="" />;
    return (
        <div className='signup_form'>
            {preview}
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map(error => <li className='error' key={error}>{error}</li>)}
                </ul>
                <label>
                    Image
                    <input
                        onChange={handleFile}
                        className='email'
                        type="file"
                        //   value={image}         
                        required
                    />
                </label>
                <label>
                    Title
                    <input
                        className='password'
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Description
                    <input
                        className='password'
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>

                <button type="submit" className="loginbtn">Add pin</button>
                {loading && <i className="fa-solid fa-spinner fa-spin-pulse loading"></i>}

            </form>
        </div>
    );
}


export default CreatePinFprm;