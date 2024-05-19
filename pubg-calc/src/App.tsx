import './App.css'
import Header from './components/header_folder/header'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Pubg_art from './components/main_screen/pubg_art'
import Weapons from './components/weapon_folder/weapons'
import Calculator from './components/calculator_folder/calculator'

function App() {
  return (
    <BrowserRouter>
      <section className='wrapper'>
        <Header />
        <nav className='buttons_container'>
          <Link to='/weapons' className='nav_link' >Weapons</Link>
          <Link to='/calculator' className='nav_link'>Damage calculator</Link>   
        </nav>

        <Routes>
          <Route path="/" element={<Pubg_art />} />
          <Route path='/weapons' element={<Weapons />} />
          <Route path='/calculator' element={<Calculator />} />
        </Routes>
      </section>
    </BrowserRouter>
  )
}

export default App