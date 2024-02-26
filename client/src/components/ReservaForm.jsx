import React, { useState } from 'react';
import dayjs from 'dayjs';
import esLocale from 'dayjs/locale/es'; // Importar el locale en español
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'; // Importar DateTimePicker en lugar de DatePicker
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { Button, Card } from 'react-bootstrap';
import reserva from "../assets/reserva.jpg";
import { PDFDownloadLink, Document, Page, Text, StyleSheet, View } from '@react-pdf/renderer';

// Estilos para el PDF
const styles = StyleSheet.create({
  // Estilos omitidos por brevedad...
});

const ReservaPDF = ({ reserva }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Detalles de la Reserva</Text>
      </View>
      <View style={styles.section}>
        <View style={styles.text}>
          <Text><strong>Nombre:</strong></Text>
          <Text>{reserva.nombre}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.text}>
          <Text><strong>Teléfono:</strong></Text>
          <Text>{reserva.telefono}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.text}>
          <Text><strong>Fecha y Hora:</strong></Text> {/* Cambiar etiqueta a "Fecha y Hora" */}
          <Text>{reserva.fecha}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.text}>
          <Text><strong>Cantidad de Personas:</strong></Text>
          <Text>{reserva.cantidadPersonas}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.text}>
          <Text><strong>Tipo de Servicio:</strong></Text>
          <Text>{reserva.tipoServicio}</Text>
        </View>
        <View style={styles.separator} />
      </View>
    </Page>
  </Document>
);

const ReservaForm = ({ onReservaSubmit }) => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fecha, setFecha] = useState(null);
  const [cantidadPersonas, setCantidadPersonas] = useState('');
  const [tipoServicio, setTipoServicio] = useState('');
  const [error, setError] = useState(null);
  const [reservaGuardada, setReservaGuardada] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (!nombre || !fecha || !cantidadPersonas) {
        setError('Por favor complete todos los campos');
        return;
      }
  
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
      
      setReservaGuardada(reservaData);
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
          <Card style={{ width: '23rem', boxShadow:'0px 0px 10px rgba(0, 0, 0, 0.4)' }}>
            <Card.Img variant="top" src={reserva} /> 
            <Card.Body> 
              <Card.Title>Reserva Exitosa</Card.Title>
              <Card.Text>
                <strong>Nombre:</strong> {reservaGuardada.nombre} <br />
                <strong>Teléfono:</strong> {reservaGuardada.telefono} <br />
                <strong>Fecha y Hora:</strong> {dayjs(reservaGuardada.fecha).format('DD/MM/YYYY HH:mm')} <br /> {/* Mostrar la fecha y hora */}
                <strong>Cantidad de Personas:</strong> {reservaGuardada.cantidadPersonas} <br />
                <strong>Tipo de Servicio:</strong> {reservaGuardada.tipoServicio} <br />
              </Card.Text>
              <PDFDownloadLink document={<ReservaPDF reserva={reservaGuardada} />} fileName="reserva.pdf">
                {({ blob, url, loading, error }) => (loading ? 'Cargando documento...' : 'Descargar PDF')}
              </PDFDownloadLink>
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
              <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
                <DateTimePicker
                  label="Fecha y Hora"
                  value={fecha}
                  onChange={(date) => setFecha(date)}
                  fullWidth
                  margin="normal"
                  inputProps={{ style: { width: '100%' } }}
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
