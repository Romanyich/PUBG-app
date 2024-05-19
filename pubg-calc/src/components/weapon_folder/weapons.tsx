import './weapons.css'
import {Routes, Route, Link } from 'react-router-dom'
import AR from './AssualtRifle/AR'
import DMR from './DesignatedMarksmanRifle/DMR'
import SMG from './SubmachineGun/SMG'
import SR from './SniperRifle/SR'
import ShotGun from './ShotGun/ShotGun'
import HandGun from './HandGun/HandGun'
import Miramar from './back.jpg'

function Weapons() {
    return(
        <section className='weapons'>
            <img src={Miramar}></img>
            <h1>Weapons</h1>
            <div className='weapons_types_container'>
                <Link to ='/weapons/AR' className='weapon_type'>AR</Link>
                <Link to ='/DMR' className='weapon_type'>DMR</Link>
                <Link to ='/SMG' className='weapon_type'>SMG</Link>
                <Link to ='/SR' className='weapon_type'>SR</Link>
                <Link to ='/Shotgun' className='weapon_type'>Shotgun</Link>
                <Link to ='/Handgun' className='weapon_type'>Handgun</Link>
            </div>

            <Routes>
                <Route path='/AR' element={<AR />} />
                <Route path='/DMR' element={<DMR />} />
                <Route path='/SMG' element={<SMG />} />
                <Route path='/SR' element={<SR />} />
                <Route path='/Shotgun' element={<ShotGun />} />
                <Route path='/Handgun' element={<HandGun />} />
            </Routes>
        </section>
    )
}

export default Weapons