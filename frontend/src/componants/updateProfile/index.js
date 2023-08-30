import "./updateProfile.css"
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import Footer from "../Footer/index";
function UpdateProfileForm({ user }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [username, setUsername] = useState((sessionUser?.username ? sessionUser.username : null));
    console.log(sessionUser)
    const [password, setPassword] = useState("");
    const [birth_date, setBirthDate] = useState((sessionUser?.birth_date ? sessionUser.birth_date : null));
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false)

    // if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors([]);
        return dispatch(sessionActions.update({ username, password, birth_date }))
            .catch(async (res) => {
                setLoading(false)

                let data;
                try {
                    // .clone() essentially allows you to read the response body twice
                    data = await res.clone().json();
                } catch {
                    data = await res.text(); // Will hit this case if the server is down
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
    };
    if(sessionUser?.id===1)return (<div className="demo-no-edit">You can not edit Demo User!</div>)

    return (
        <div className="update">
        <div className='update_form'>
            <h2 className="h2TAG">Public profile</h2>
             <p className="pTAG">People visiting your profile will see the following info</p>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map(error => <li className='error' key={error}>{error}</li>)}
                </ul>


                <label className="updatelabel">
                    Username
                    </label>

                    <input
                        className='updateInput'
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                <label className="updatelabel">
                    Password
                    </label>

                    <input
                        className='updateInput'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                <label className="updatelabel">
                    Birth date
                </label>

                    <input
                        className='updateInput'
                        type="date"
                        value={birth_date}
                        onChange={(e) => setBirthDate(e.target.value)}
                        required
                    />
                <footer>
                <button type="submit" className="confirmUpdate">confirm</button>
                </footer>
                {/* {loading && <i className="fa-solid fa-spinner fa-spin-pulse loading"></i>} */}

            </form>
        </div>
        </div>

    )
}
export default UpdateProfileForm