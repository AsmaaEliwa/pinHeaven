import logoImage from './ph.png';
import LoginFormModal from '../loginFormModel/index.js';
import SignUpFormModal from '../signUpFormModel/index.js';
import { NavLink } from 'react-router-dom';

function Home(){
    return(
        <div className='nav_bar' >
        <img className='logo' src={logoImage} alt="Logo" />
        <NavLink className="about" to="/">About</NavLink>
        <NavLink className="business" to="/">Business</NavLink>
        <NavLink className="blog" to="/">Blog</NavLink>
        <LoginFormModal></LoginFormModal>
        <SignUpFormModal></SignUpFormModal>
        
      </div>
    )
}
export default Home;