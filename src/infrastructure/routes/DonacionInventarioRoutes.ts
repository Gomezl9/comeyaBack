import { Router } from 'express';
import { DonacionInventarioAdpartes } from "../adapter/DonacionInventarioAdapter";
import { DonacionInventarioController } from '../controller/DonacionInventarioController';

const router = Router();
const donacioninventarioAdpartes = new DonacionInventarioAdpartes();
const donacioninventarioController = new DonacionInventarioController(donacioninventarioAdpartes);


// Obtener todas las reservas
router.get("/donacionesinventario", (req, res) => donacioninventarioController.getAllDonacionesInventario(req, res));

// Obtener reserva por ID
router.get("/donacionesinventario/:id", (req, res) => donacioninventarioController.getDonacionInventarioById(req, res));

// Crear reserva
router.post("/donacionesinventario", (req, res) => donacioninventarioController.createDonacionInventario(req, res));

// Actualizar reserva
router.put("/donacionesinventario/:id", (req, res) => donacioninventarioController.updateDonacionInventario(req, res));

// Eliminar reserva
router.delete("/donacionesinventario/:id", (req, res) => donacioninventarioController.deleteDonacionInventario(req, res));

export default router;

