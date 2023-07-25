import "./updateProfile.css"
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
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

    return (
        <div className='signup_form'>

            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map(error => <li className='error' key={error}>{error}</li>)}
                </ul>


                <label>
                    Username
                    <input
                        className='password'
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        className='password'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Birth date
                    <input
                        className='password'
                        type="date"
                        value={birth_date}
                        onChange={(e) => setBirthDate(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" className="loginbtn">confirm</button>
                {loading && <i className="fa-solid fa-spinner fa-spin-pulse loading"></i>}

            </form>
        </div>

    )
}
export default UpdateProfileForm