import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

// Estilizar el contenedor del calendario
const StyledCalendarContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  borderRadius: theme.shape.borderRadius,
}));

const Calendario = () => {
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerReservas = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener el token de localStorage

        // Verificar si hay un token disponible
        if (!token) {
          throw new Error('No se encontró un token de acceso');
        }

        const response = await fetch('http://localhost:3001/api/allreservas', {
          headers: {
            Authorization: `Bearer ${token}`, // Agregar el token JWT en el encabezado de autorización
          },
        }); // Asegúrate de tener un endpoint adecuado en tu API para obtener todas las reservas

        if (!response.ok) {
          throw new Error('Error al obtener las reservas');
        }

        const data = await response.json();
        setReservas(data.reservas);
      } catch (error) {
        setError(error.message); // Capturar y guardar el mensaje de error
      }
    };

    obtenerReservas();
  }, []);

  // Convertir las reservas en el formato requerido por FullCalendar
  const eventos = reservas ? reservas.map((reserva) => ({
    title: reserva.nombre, // Aquí se utiliza la propiedad nombre
    start: new Date(reserva.fecha),
    end: new Date(reserva.fecha),
  })) : [];
  
  
  return (
    <StyledCalendarContainer elevation={3}>
      <Typography variant="h6" gutterBottom>
        Calendario de Reservas
      </Typography>
      {error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : (
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={eventos}
        height="auto" // Ajustar automáticamente la altura del calendario
        locale="es" // Configurar el idioma en español
        eventDisplay="block" // Mostrar eventos como bloques para ocultar el número al lado del nombre
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false // Opcional, para desactivar el formato de 12 horas (AM/PM)
        }}
      />

      )}
    </StyledCalendarContainer>
  );
};

export default Calendario;
