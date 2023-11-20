import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import './Index.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'kelompok29' && password === '12345678') {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <>
      <form action="/login" method="post" class="form login" onSubmit={handleLogin}>
        <div class="form__field">
          <label for="login__username">
            <FontAwesomeIcon className="icon" icon={faUser} />
            <span class="hidden">Username</span>
          </label>
          <input id="login__username" type="text" name="username" class="form__input" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div class="form__field">
          <label for="login__password">
            <FontAwesomeIcon className="icon" icon={faLock} />
            <span class="hidden">Password</span>
          </label>
          <input id="login__password" type="password" name="password" class="form__input" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div class="form__field">
          <input type="submit" value="Sign In" />
        </div>
      </form>
    </>
  );
}
