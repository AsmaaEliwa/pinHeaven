import logoImage from './ph.png';
import LoginFormModal from '../loginFormModel/index.js';
import SignUpFormModal from '../signUpFormModel/index.js';
import { NavLink } from 'react-router-dom';
import AnimationPage from '../animation';
import "./navigation.css"
import {useEffect} from "react"
import TryIt from '../tryIt';
import { useSelector } from 'react-redux';
function Home(){
  const currentUser=useSelector(state=> state.session.user)
  useEffect(() => {
    // If the user is already signed in, redirect them to their profile page.
    if (currentUser) {
      window.location.href = '/profile'; // Replace '/profile' with the URL of the user's profile page
    }
  }, [currentUser]);

    return(
      <>
        <div className='nav_bar' >
        <img className='logo' src={logoImage} alt="Logo" />
        <NavLink className="about" to="/home">About</NavLink>
        <NavLink className="business" to="/home">Business</NavLink>
        <NavLink className="blog" to="/home">Blog</NavLink>
        <LoginFormModal></LoginFormModal>
        <SignUpFormModal></SignUpFormModal>
      </div>
      <AnimationPage/>
      <TryIt/>
      </>
    )
}
export default Home;