import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate(data.redirect === '/api/admin/panel' ? '/admin/panel' : '/inicio');
      } else {
        console.error('Login failed', data);
      }
    } catch (error) {
      console.error('Error during login', error);
    }
  };

  return (
    <div className="containere">
      <div className="heading">Ingresar</div>
      <form onSubmit={handleLogin} className="form">
        <input
          required
          className="input"
          type="text"
          name="usuario"
          id="usuario"
          placeholder="usuario"
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <input
          required
          className="input"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <input className="login-button" type="submit" value="iniciar sesion" />
      </form>
      <Link className='deco' to={"/signup"}>
        <span className="agreement">Si no tiene una cuenta REGISTRARSE</span>
      </Link>
    </div>
  );
};

export default Login;
