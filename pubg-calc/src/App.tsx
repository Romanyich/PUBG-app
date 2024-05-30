import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/header_folder/header';
import NavBar from './components/nav_bar/nav_bar';
import Weapons from './components/weapon_folder/weapons';
import Pubg_art from './components/main_screen/pubg_art';
import Calculator from './components/calculator_folder/calculator';
import AR from './components/weapon_folder/AssualtRifle/AR';
import DMR from './components/weapon_folder/DesignatedMarksmanRifle/DMR';
import SMG from './components/weapon_folder/SubmachineGun/SMG';
import SR from './components/weapon_folder/SniperRifle/SR';
import ShotGun from './components/weapon_folder/ShotGun/ShotGun';
import HandGun from './components/weapon_folder/HandGun/HandGun';

function AppContent() {
  const location = useLocation();

  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      const parsedUser = JSON.parse(user);
      setLoggedInUser(parsedUser.username);
    }
  }, []);

  const handleLogin = (username: string | null) => {
    setLoggedInUser(username);
  };

  const isWeaponRoute = [
    '/weapons/AR',
    '/weapons/DMR',
    '/weapons/SMG',
    '/weapons/SR',
    '/weapons/Shotgun',
    '/weapons/Handgun',
  ].includes(location.pathname);

  return (
    <section className='wrapper'>
      <Header onLogin={handleLogin} />
      <NavBar />
      <Routes>
        <Route path="/" element={<Pubg_art username={loggedInUser} />} />
        <Route path="/weapons" element={<Weapons />}>
          {!isWeaponRoute && <Route path="" element={<Navigate to="AR" />} />}
          <Route path="AR" element={<AR />} />
          <Route path="DMR" element={<DMR />} />
          <Route path="SMG" element={<SMG />} />
          <Route path="SR" element={<SR />} />
          <Route path="Shotgun" element={<ShotGun />} />
          <Route path="Handgun" element={<HandGun />} />
        </Route>
        <Route path="/calculator" element={<Calculator />} />
      </Routes>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
