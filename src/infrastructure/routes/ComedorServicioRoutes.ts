import { Router } from 'express';
import { ComedorServicioAdpartes } from "../adapter/ComedorServicioAdapter";
import { ComedorServicioController } from '../controller/ComedorServicioController';

const router = Router();
const comedorservicioAdpartes = new ComedorServicioAdpartes();
const comedorservicioController = new ComedorServicioController(comedorservicioAdpartes);


// Obtener todas las reservas
router.get("/comedoresservicio", (req, res) => comedorservicioController.getAllComedorServicios(req, res));

// Obtener reserva por ID
router.get("/comedoresservicio/:id", (req, res) => comedorservicioController.getComedorServicioById(req, res));

// Crear reserva
router.post("/comedoresservicio", (req, res) => comedorservicioController.createComedorServicio(req, res));

// Actualizar reserva
router.put("/comedoresservicio/:id", (req, res) => comedorservicioController.updateComedorServicio(req, res));

// Eliminar reserva
router.delete("/comedoresservicio/:id", (req, res) => comedorservicioController.deleteComedorServicio(req, res));

export default router;


