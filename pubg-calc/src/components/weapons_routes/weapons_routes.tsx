import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import AR from '../weapon_folder/AssualtRifle/AR'
import DMR from '../weapon_folder/DesignatedMarksmanRifle/DMR'
import SMG from '../weapon_folder/SubmachineGun/SMG'
import SR from '../weapon_folder/SniperRifle/SR'
import ShotGun from '../weapon_folder/ShotGun/ShotGun'
import HandGun from '../weapon_folder/HandGun/HandGun'
import Weapons from '../weapon_folder/weapons'

function WeaponsRoutes() {
  const location = useLocation()

  return (
    <Routes>
      <Route path="/weapons" element={<Weapons />}>
        {!['/weapons/AR', '/weapons/DMR', '/weapons/SMG', '/weapons/SR', '/weapons/Shotgun', '/weapons/Handgun'].includes(location.pathname) && (
          <Route path="" element={<Navigate to="AR" />} />
        )}
        <Route path="AR" element={<AR />} />
        <Route path="DMR" element={<DMR />} />
        <Route path="SMG" element={<SMG />} />
        <Route path="SR" element={<SR />} />
        <Route path="Shotgun" element={<ShotGun />} />
        <Route path="Handgun" element={<HandGun />} />
      </Route>
    </Routes>
  );
}

export default WeaponsRoutes