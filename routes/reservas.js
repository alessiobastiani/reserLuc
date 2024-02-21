// reservaRoutes.js
const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middleware/authMiddleware');
const reservaController = require('../controllers/reservaController');

router.get('/', ensureAuthenticated, reservaController.obtenerReservas);
router.post('/', ensureAuthenticated, reservaController.crearReserva);
router.put('/:id',ensureAuthenticated, reservaController.actualizarReserva);
router.delete('/:id',ensureAuthenticated, reservaController.eliminarReserva);
router.get('/latest/:userId', ensureAuthenticated, reservaController.obtenerUltimaReserva);


module.exports = router;
