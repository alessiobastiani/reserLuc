import React from 'react';

const ReservaList = ({ reservas, handleEliminar }) => {
  return (
    <div>
      <h2>Listado de Reservas</h2>
      <ul>
        {reservas && reservas.map((reserva) => (
          <li key={reserva._id}>
            {reserva.nombre} - {reserva.fecha} - {reserva.cantidadPersonas} personas{' '}
            <button onClick={() => handleEliminar(reserva._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservaList;
