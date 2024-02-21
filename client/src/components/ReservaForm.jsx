import dayjs from 'dayjs'; // Importa dayjs
import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const ReservaForm = ({ onReservaSubmit }) => {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState(null);
  const [cantidadPersonas, setCantidadPersonas] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (!nombre || !fecha || !cantidadPersonas) {
        setError('Por favor complete todos los campos');
        return;
      }
  
      // Verificar si la fecha es válida
      if (fecha === null || !dayjs(fecha).isValid()) { // Usar dayjs para verificar la validez de la fecha
        setError('La fecha seleccionada no es válida');
        return;
      }
  
      const fechaISO = dayjs(fecha).toISOString(); // Usar dayjs para convertir la fecha a formato ISO
      await onReservaSubmit({
        nombre,
        fecha: fechaISO,
        cantidadPersonas: parseInt(cantidadPersonas, 10),
      });
  
      setNombre('');
      setCantidadPersonas('');
      setFecha(null);
      setError(null);
    } catch (error) {
      console.error('Error al crear la reserva:', error);
      setError('No se pudo crear la reserva');
    }
  };
  
  const handleDateChange = (date) => {
    if (date && date.isValid()) {
      setFecha(date.toDate());
    } else {
      setFecha(null);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <div className='Contenedor-form'>
        <h2 className='subtitulo'>Crear Nueva Reserva</h2>

          <div className='entradas'>
          <label>
            Nombre:
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </label>
          <label>
            Cantidad de Personas:
            <input
              type="number"
              value={cantidadPersonas}
              onChange={(e) => setCantidadPersonas(e.target.value)}
              />
          </label>
            </div>
        <form className='formu' onSubmit={handleSubmit}>
          <label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={fecha ? dayjs(fecha) : null}
                onChange={(date) => handleDateChange(date)}
              />
            </LocalizationProvider>
          </label>
          <button type="submit">Guardar Reserva</button>
        </form>
      </div>
    </div>
  );
};

export default ReservaForm;