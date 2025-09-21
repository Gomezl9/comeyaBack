// src/infrastructure/routes/ServicioRoutes.ts
import { Router } from 'express';
import { ServicioController } from '../controller/ServicioController';
import { ServicioAdpartes } from '../adapter/ServicioAdapter';
import { verifyToken, requireRole } from '../middleware/auth';


const router = Router();
const servicioController = new ServicioController(new ServicioAdpartes());

router.get('/', (req, res) => servicioController.getAllServicios(req, res));
router.get('/:id', (req, res) => servicioController.getServicioById(req, res));
// Proteger creación, actualización y eliminación (ejemplo: rol 1 = Admin)
router.post('/', verifyToken, requireRole([1]), (req, res) => servicioController.createServicio(req, res));
router.put('/:id', verifyToken, requireRole([1]), (req, res) => servicioController.updateServicio(req, res));
router.delete('/:id', verifyToken, requireRole([1]), (req, res) => servicioController.deleteServicio(req, res));

export default router ;