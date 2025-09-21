import { Router } from 'express';
import { DonacionDineroAdpartes } from "../adapter/DonacionDineroAdapter";
import { DonacionDineroController } from '../controller/DonacionDineroController';

const router = Router();
const donaciondineroAdpartes = new DonacionDineroAdpartes();
const donaciondineroController = new DonacionDineroController(donaciondineroAdpartes);


// Obtener todas las reservas
router.get("/donacionesdinero", (req, res) => donaciondineroController.getAllDonacionesDinero(req, res));

// Obtener reserva por ID
router.get("/donacionesdinero/:id", (req, res) => donaciondineroController.getDonacionDineroById(req, res));

// Crear reserva
router.post("/donacionesdinero", (req, res) => donaciondineroController.createDonacionDinero(req, res));

// Actualizar reserva
router.put("/donacionesdinero/:id", (req, res) => donaciondineroController.updateDonacionDinero(req, res));

// Eliminar reserva
router.delete("/donacionesdinero/:id", (req, res) => donaciondineroController.deleteDonacionDinero(req, res));

export default router;

