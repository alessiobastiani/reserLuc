import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import AdminPanel from './components/AdminPanel';
import Signup from './components/signup';
import UltimaReservaPage from './components/UltimaReservaPage';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // Importa el locale en español
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Importa el plugin de zona horaria
dayjs.extend(utc);
dayjs.extend(timezone);

// Establece la zona horaria predeterminada para toda la aplicación
dayjs.tz.setDefault('America/Argentina/Buenos_Aires');

const App = () => {
  // Define userId utilizando useState o cualquier otro método
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Código para obtener userId, por ejemplo desde el almacenamiento local
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/admin/panel" element={<AdminPanel />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ultima-reserva" element={<UltimaReservaPage userId={userId} />} />
      </Routes>
    </Router>
  );
};

export default App;
