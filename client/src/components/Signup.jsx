import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState(''); // Nuevo estado para el correo electrónico
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: signupUsername,
          password: signupPassword,
          email: signupEmail, // Incluye el campo de correo electrónico en la solicitud
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Manejar el registro exitoso
        console.log('Signup successful', data);
        // Realizar la redirección
        navigate(data.redirect);
      } else {
        // Manejar el fallo de registro
        console.error('Signup failed', data);
      }
    } catch (error) {
      console.error('Error during signup', error);
    }
  };
  

  return (
    <div>
      <h2>Sign Up</h2>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={signupUsername}
            onChange={(e) => setSignupUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
          />
        </label>
        <br />
        <label>
  Email:
  <input
    type="email"
    value={signupEmail}
    onChange={(e) => setSignupEmail(e.target.value)}
  />
</label>

        <br />
        <button type="button" onClick={handleSignup}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
