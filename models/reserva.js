const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  fecha: { type: Date, required: true },
  cantidadPersonas: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now } // Esta es la nueva propiedad
});

const Reserva = mongoose.model('Reserva', reservaSchema);

module.exports = Reserva;
