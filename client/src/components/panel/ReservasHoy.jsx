import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReservasHoy = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
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
      <ul>
        {Array.isArray(reservas) ? (
          reservas.map((reserva) => (
            <li key={reserva._id}>{/* Aquí renderiza los detalles de cada reserva */}</li>
          ))
        ) : (
          <li>No hay reservas para hoy</li>
        )}
      </ul>
    </div>
  );
};

export default ReservasHoy;
