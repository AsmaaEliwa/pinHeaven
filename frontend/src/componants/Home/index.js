import logoImage from './ph.png';
import LoginFormModal from '../loginFormModel/index.js';
import SignUpFormModal from '../signUpFormModel/index.js';
import { NavLink,Link } from 'react-router-dom';
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
        <a className="about" href="https://www.linkedin.com/in/asmaa-eliwa-38a38621a/" target="_blank">Linkedin</a>
        <a className="business" href="https://github.com/AsmaaEliwa" target="_blank">Github</a>
        <a className="blog" href="https://asmaaeliwa.github.io/" target="_blank">Portfolio</a>
        <LoginFormModal></LoginFormModal>
        <SignUpFormModal></SignUpFormModal>
      </div>
      <AnimationPage/>
      <TryIt/>
      </>
    )
}
export default Home;