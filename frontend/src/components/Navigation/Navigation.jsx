import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from '/src/favicon.ico'
import './Navigation.css'
function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const location = useLocation()
  const sessionLinks = sessionUser ? (
    <div>

      <ProfileButton user={sessionUser} />
    </div>
  ) : (
    <div className='login-signup-div'>
        <NavLink to="/login" state={{ prev: location }} ><button className='nav-Btn'>Login</button></NavLink>
        <NavLink to="/signup" state={{ prev: location }}><button className='nav-Btn'>Sign Up</button></NavLink>
    </div>
  );

  return (
    <div className='navbar'>
        <div className='leftsideNav'>
            <NavLink to="/" className='homeBtn'>
              <img className='logo' src={logo} alt=''/>
            </NavLink>
        </div>
        <div className='filterTags'>
            <button onClick={() => alert('feature coming soon')} className='bioTag'>Biology</button>
            <button onClick={() => alert('feature coming soon')} className='chemTag'>Chemistry</button>
            <button onClick={() => alert('feature coming soon')} className='physTag'>Physics</button>
        </div>
        {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
