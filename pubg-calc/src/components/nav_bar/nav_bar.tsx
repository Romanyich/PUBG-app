import './nav_bar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleWeaponsClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (location.pathname.startsWith('/weapons')) {
      event.preventDefault();
    } else {
      navigate('/weapons');
    }
  };

  const isActiveLink = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  const isActiveWeaponsLink = (path: string) => {
    return location.pathname.startsWith(path) ? 'active' : '';
  };

  return (
    <nav className="buttons_container">
      <Link
        to='/weapons'
        className={`nav_link ${isActiveWeaponsLink('/weapons')}`}
        onClick={handleWeaponsClick}
      >
        Weapons
      </Link>
      <Link
        to='/calculator'
        className={`nav_link ${isActiveLink('/calculator')}`}
      >
        Damage calculator
      </Link>
    </nav>
  );
}

export default NavBar;
