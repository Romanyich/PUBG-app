import { useState } from 'react';
import './header.css';
import pubg_logo from '../images/pubg_logo.png';
import { Link } from 'react-router-dom';
import ModalForm from '../modal_form/modalForm';

function Header({ onLogin }: { onLogin: (username: string | null) => void }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'registration' | 'login'>('registration');
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('loggedInUser'));

  const openModal = (mode: 'registration' | 'login') => {
    setModalMode(mode);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    onLogin(null);
    alert('Logged out successfully!');
    setLoggedIn(false);
  };

  return (
    <section className="header">
      <div className="logo_container">
        <Link to='/'>
          <img src={pubg_logo} className="logo" alt="PUBG logo" />
        </Link>
      </div>
      <form className='reg_form'>
        {!loggedIn && (
          <>
            <button type='button' className='registration' onClick={() => openModal('registration')}>Registration</button>
            <button type='button' className='sign_in' onClick={() => openModal('login')}>Sign in</button>
          </>
        )}
        {loggedIn && <button type='button' className='logout' onClick={handleLogout}>Exit</button>}
      </form>
      {modalOpen && (
        <ModalForm onClose={closeModal} mode={modalMode} isLoggedIn={loggedIn} />
      )}
    </section>
  );
}

export default Header