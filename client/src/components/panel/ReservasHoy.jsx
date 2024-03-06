import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // Importa el idioma español
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('America/Argentina/Buenos_Aires');

const ReservasHoy = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
        const response = await axios.get('http://localhost:3001/api/reservas-hoy', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setReservas(response.data);
      } catch (error) {
        console.error('Error al obtener las reservas de hoy:', error);
      }
    };

    fetchReservas();
  }, []);

  return (
    <div>
      <h2>Reservas para hoy</h2>
      <ul>
        {reservas.length > 0 ? (
          reservas.map((reserva) => (
            <li key={reserva._id}>
              {/* Renderiza los detalles de cada reserva aquí */}
              {reserva.nombre} - {dayjs(reserva.fecha).tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DD HH:mm')}
            </li>
          ))
        ) : (
          <li>No hay reservas para hoy</li>
        )}
      </ul>
    </div>
  );
};

export default ReservasHoy;
