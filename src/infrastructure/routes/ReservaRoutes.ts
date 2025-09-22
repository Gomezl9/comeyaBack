import { Router } from 'express';
import { ReservaAdpartes } from "../adapter/ReservaAdapter";
import { ReservaController } from '../controller/ReservaController';
import { verifyToken, requireRole } from '../middleware/auth';

const router = Router();
const reservaAdpartes = new ReservaAdpartes();
const reservaController = new ReservaController(reservaAdpartes);


// Obtener todas las reservas
router.get("/reservas", (req, res) => reservaController.getAllReservas(req, res));

// Obtener reserva por ID
router.get("/reservas/:id", (req, res) => reservaController.getReservaById(req, res));

// Crear reserva
router.post("/reservas", (req, res) => reservaController.createReserva(req, res));

// Actualizar reserva
router.put("/reservas/:id", verifyToken, requireRole([1]), (req, res) => reservaController.updateReserva(req, res));

// Eliminar reserva
router.delete("/reservas/:id", (req, res) => reservaController.deleteReserva(req, res));

export default router;


