import './weapons.css';
import { Link, Outlet, useLocation } from 'react-router-dom';

function Weapons() {
  const location = useLocation();

  const isActiveLink = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <section className="weapons">
      <div className="weapons_types_container">
        <Link to='/weapons/AR' className={`weapon_type ${isActiveLink('/weapons/AR')}`}>AR</Link>
        <Link to='/weapons/DMR' className={`weapon_type ${isActiveLink('/weapons/DMR')}`}>DMR</Link>
        <Link to='/weapons/SMG' className={`weapon_type ${isActiveLink('/weapons/SMG')}`}>SMG</Link>
        <Link to='/weapons/SR' className={`weapon_type ${isActiveLink('/weapons/SR')}`}>SR</Link>
        <Link to='/weapons/Shotgun' className={`weapon_type ${isActiveLink('/weapons/Shotgun')}`}>Shotgun</Link>
        <Link to='/weapons/Handgun' className={`weapon_type ${isActiveLink('/weapons/Handgun')}`}>Handgun</Link>
      </div>
      <Outlet />
    </section>
  );
}

export default Weapons;