import './nav_bar.css'
import { Link } from 'react-router-dom'

function NavBar() {
    return (
      <nav className='buttons_container'>
        <Link to='/weapons' className='nav_link'>Weapons</Link>
        <Link to='/calculator' className='nav_link'>Damage calculator</Link>
      </nav>
    )
}

export default NavBar