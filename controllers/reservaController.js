const Reserva = require('../models/reserva');
const mongoose = require('mongoose');

const obtenerReservas = async (req, res) => {
  try {
    const userId = req.user.id; // Obtener el userId del usuario autenticado
    console.log('UserID:', userId); // Agregar este log para depuración
    const reservas = await Reserva.find({ userId }); // Filtrar reservas por userId
    res.json({ reservas });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const crearReserva = async (req, res) => {
  try {
    const { nombre, fecha, cantidadPersonas } = req.body;
    const userId = req.user.id;

    const reserva = new Reserva({
      nombre,
      fecha,
      cantidadPersonas,
      userId: userId,
    });

    const nuevaReserva = await reserva.save();
    res.status(201).json(nuevaReserva); // Devuelve la nueva reserva en la respuesta
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const eliminarReserva = async (req, res) => {
  try {
    const { id } = req.params;

    // Agregar un log para depuración
    console.log('UserID:', req.user.id);

    // Verificar que la reserva a eliminar pertenece al usuario autenticado
    const reserva = await Reserva.findOne({ _id: id, userId: req.user.id });

    if (!reserva) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    await Reserva.findByIdAndDelete(id);
    res.json({ message: 'Reserva eliminada correctamente' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const actualizarReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, fecha, cantidadPersonas } = req.body;

    // Verificar que la reserva a actualizar pertenece al usuario autenticado
    const reserva = await Reserva.findById(id);
    if (!reserva || reserva.userId !== req.user.id) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    const reservaActualizada = await Reserva.findByIdAndUpdate(
      id,
      { nombre, fecha, cantidadPersonas },
      { new: true }
    );

    res.json(reservaActualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const obtenerUltimaReserva = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Validar que userId sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'El ID del usuario no es válido' });
    }

    // Buscar la última reserva del usuario ordenada por fecha de creación descendente
    const ultimaReserva = await Reserva.findOne({ userId }).sort({ createdAt: -1 });

    // Verificar si se encontró alguna reserva
    if (!ultimaReserva) {
      return res.status(404).json({ message: 'No se encontró ninguna reserva para este usuario' });
    }

    // Devolver la última reserva encontrada
    res.json({ reserva: ultimaReserva });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  obtenerReservas,
  crearReserva,
  obtenerUltimaReserva,
  actualizarReserva,
  eliminarReserva
};