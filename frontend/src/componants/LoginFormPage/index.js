import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import "./login.css"
import login from "./login.png"
function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [loading,setLoading]=useState(false)
  if (sessionUser) return <Redirect to="/" />;
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        setLoading(false)
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors)setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  }
  function demoLogin(){
    setLoading(true);

    return dispatch(sessionActions.login({ credential:"demo@user.io", password:"password" }))

  }

  return (
    <div className='login_form'>
      <img  className='logologin' src={login}/>
      <h1>
      Welcome to PinHeaven
      </h1>
    <form onSubmit={handleSubmit}>
      <label>
         Email or username
        <input
        placeholder='Email'
        className='email'
          type="text"
          onChange={(e) => setCredential(e.target.value)}
          required
        />
         {errors.map(error => <li className='error' key={error}>{error}</li>)}
      </label>
      <label>
        Password
        <input
        placeholder='Password'
        className='password'
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Link className='forget_pass'>Forgot your password?</Link>
      </label>
      <button type="submit" className='loginbtn'>Log In</button>
      <p>OR</p>
      <button className='facbtn' onClick={demoLogin}>Continue as Demo</button>
      <button className='gmailbtn'>Continue as</button>
      {loading&& <i className="fa-solid fa-spinner fa-spin-pulse loading"></i> }
      {/* <p className='more'>By continuing, you agree to Pinterest's Terms of Service; Opens a new tab and acknowledge you've read our Privacy Policy; Opens a new tab. Notice at collection; Opens a new tab.</p> */}
    </form>
    </div>
  );
}

export default LoginFormPage;