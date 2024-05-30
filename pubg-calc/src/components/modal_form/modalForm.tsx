import React, { useState } from 'react';
import './modalForm.css';

interface ModalFormProps {
  onClose: () => void;
  mode: 'registration' | 'login';
  isLoggedIn: boolean;
}

const ModalForm: React.FC<ModalFormProps> = ({ onClose, mode, isLoggedIn }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'registration') {
      await handleRegistration();
    } else {
      await handleLogin();
    }
    onClose();
  };

  const handleRegistration = async () => {
    const response = await fetch(`http://localhost:3001/users?username=${login}`);
    const users = await response.json();
    if (users.length > 0) {
      alert('Username already exists!');
      return;
    }

    const registerResponse = await fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: login, password })
    });

    if (registerResponse.ok) {
      alert('Registration successful!');
    } else {
      alert('Registration failed!');
    }
  };

  const handleLogin = async () => {
    const response = await fetch(`http://localhost:3001/users?username=${login}&password=${password}`);
    const users = await response.json();
    if (users.length > 0 && users[0].password === password) {
      localStorage.setItem('loggedInUser', JSON.stringify(users[0]));
      alert('Login successful!');
    } else {
      alert('Make sure there is no bagula in both of your login and password');
    }
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close_button" onClick={onClose}>&times;</span>
        <h2>{mode === 'registration' ? 'Registration' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Login:
            <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} required />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <button type="submit" className='submit_button' disabled={isLoggedIn}>{mode === 'registration' ? 'Register' : 'Login'}</button>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
