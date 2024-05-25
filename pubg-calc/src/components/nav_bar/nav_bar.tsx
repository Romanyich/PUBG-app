import './nav_bar.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
/* bagula */
function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();
  
    const handleWeaponsClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      if (location.pathname.startsWith('/weapons')) {
        event.preventDefault();
        // Do nothing, stay on the current weapon route
      } else {
        navigate('/weapons');
      }
    };
  
    return (
      <nav className='buttons_container'>
        <Link to='/weapons' className='nav_link' onClick={handleWeaponsClick}>Weapons</Link>
        <Link to='/calculator' className='nav_link'>Damage calculator</Link>
      </nav>
    );
  }

export default NavBar