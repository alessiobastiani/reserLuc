import React, { useState } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { Form, Button, Card } from 'react-bootstrap';
import reserva from "../assets/reserva.jpg"

const ReservaForm = ({ onReservaSubmit }) => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fecha, setFecha] = useState(null);
  const [cantidadPersonas, setCantidadPersonas] = useState('');
  const [tipoServicio, setTipoServicio] = useState('');
  const [error, setError] = useState(null);
  const [reservaGuardada, setReservaGuardada] = useState(null); // Estado para almacenar la reserva guardada

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (!nombre || !fecha || !cantidadPersonas) {
        setError('Por favor complete todos los campos');
        return;
      }
  
      // Verificar si la fecha es válida
      if (fecha === null || !dayjs(fecha).isValid()) {
        setError('La fecha seleccionada no es válida');
        return;
      }
  
      const fechaISO = dayjs(fecha).toISOString();
      const reservaData = {
        nombre,
        telefono,
        fecha: fechaISO,
        cantidadPersonas: parseInt(cantidadPersonas, 10),
        tipoServicio,
      };
      await onReservaSubmit(reservaData);
      
      setReservaGuardada(reservaData); // Almacenar la reserva guardada en el estado
      setNombre('');
      setCantidadPersonas('');
      setFecha(null);
      setError(null);
    } catch (error) {
      console.error('Error al crear la reserva:', error);
      setError('No se pudo crear la reserva');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        {reservaGuardada ? (
          <div>
            <Card style={{ width: '23rem', boxShadow:'0px 0px 10px rgba(0, 0, 0, 0.4)'   }}>
              <Card.Img variant="top" src={reserva} /> 
              <Card.Body> 
              <Card.Title>Reserva Exitosa</Card.Title>
                <Card.Text>
                  <strong>Nombre:</strong> {reservaGuardada.nombre} <br />
                  <strong>Teléfono:</strong> {reservaGuardada.telefono} <br />
                  <strong>Fecha:</strong> {dayjs(reservaGuardada.fecha).format('DD/MM/YYYY')} <br />
                  <strong>Cantidad de Personas:</strong> {reservaGuardada.cantidadPersonas} <br />
                  <strong>Tipo de Servicio:</strong> {reservaGuardada.tipoServicio} <br />
                </Card.Text>
                <Button variant="primary">Descargar</Button>
              </Card.Body>
            </Card>
          </div>
        ) : (
          <div>
              <div style={{ width: '400px', padding: '20px',  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)' }}>
            <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Crear Nueva Reserva</h2>
            <form style={{ padding: '20px' }} onSubmit={handleSubmit}>
              <TextField
                id="nombre"
                label="Nombre"
                variant="outlined"
                fullWidth
                margin="normal"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <TextField
                id="cantidadPersonas"
                label="Cantidad de Personas"
                variant="outlined"
                type="number"
                fullWidth
                margin="normal"
                value={cantidadPersonas}
                onChange={(e) => setCantidadPersonas(e.target.value)}
              />
              <TextField
                id="telefono"
                label="Teléfono"
                variant="outlined"
                type="tel"
                fullWidth
                margin="normal"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
              <FormControl variant="outlined" fullWidth margin="normal">
                <InputLabel id="tipoServicio-label">Tipo de Servicio</InputLabel>
                <Select
                  labelId="tipoServicio-label"
                  id="tipoServicio"
                  value={tipoServicio}
                  onChange={(e) => setTipoServicio(e.target.value)}
                  label="Tipo de Servicio"
                >
                  <MenuItem value="">Seleccionar Tipo de Servicio</MenuItem>
                  <MenuItem value="Servicio A">Servicio A</MenuItem>
                  <MenuItem value="Servicio B">Servicio B</MenuItem>
                  <MenuItem value="Servicio C">Servicio C</MenuItem>
                </Select>
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha"
                  value={fecha}
                  onChange={(date) => setFecha(date)}
                  fullWidth
                  margin="normal"
                  inputProps={{ style: { width: '100%' } }} // Aplica un ancho del 100% al input del calendario
                />
              </LocalizationProvider>
              <Button type="submit" style={{ marginTop: '20px', width: '100%' }}>Guardar Reserva</Button>
              {error && <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{error}</p>}
            </form>
          </div>
      </div>
        )}
    </div>
  );
};

export default ReservaForm;
