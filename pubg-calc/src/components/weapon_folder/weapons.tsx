import './weapons.css'
import { Link, Outlet } from 'react-router-dom'

function Weapons() {
    return(
        <section className='weapons'>
            <div className='weapons_types_container'>
                <Link to ='/weapons/AR' className='weapon_type'>AR</Link>
                <Link to ='/weapons/DMR' className='weapon_type'>DMR</Link>
                <Link to ='/weapons/SMG' className='weapon_type'>SMG</Link>
                <Link to ='/weapons/SR' className='weapon_type'>SR</Link>
                <Link to ='/weapons/Shotgun' className='weapon_type'>Shotgun</Link>
                <Link to ='/weapons/Handgun' className='weapon_type'>Handgun</Link>
            </div>

            <Outlet />
        </section>
    )
}

export default Weapons