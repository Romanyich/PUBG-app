import './header.css'
import pubg_logo from './images/pubg_logo.png'
import { Link } from 'react-router-dom'

function Header() { 
    return(
        <section className="header">
            <div className="logo_container">
                <Link to='/'>
                    <img src={pubg_logo} className='logo' alt="PUBG Logo" />
                </Link>
            </div>
            <form className='reg_form'>
                <button className="themeChanger">Change theme</button>
                <button className='registration'>Registration</button>
                <button className='sign_in'>Sign in</button>
            </form>
        </section>
    )
}

export default Header