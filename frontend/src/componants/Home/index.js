import logoImage from './ph.png';
import LoginFormModal from '../loginFormModel/index.js';
import SignUpFormModal from '../signUpFormModel/index.js';
import { NavLink } from 'react-router-dom';
import AnimationPage from '../animation';
import "./navigation.css"
function Home(){
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
      </>
    )
}
export default Home;