import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header_folder/header'
import NavBar from './components/nav_bar/nav_bar'
import WeaponsRoutes from './components/weapons_routes/weapons_routes'
import Pubg_art from './components/main_screen/pubg_art'
import Calculator from './components/calculator_folder/calculator'

function App() {
  return (
    <BrowserRouter>
      <section className='wrapper'>
        <Header />
        <NavBar />

        <Routes>
          <Route path="/" element={<Pubg_art />} />
          <Route path="/weapons/*" element={<WeaponsRoutes />} />
          <Route path="/calculator" element={<Calculator />} />
        </Routes>
      </section>
    </BrowserRouter>
  )
}

export default App