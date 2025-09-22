import { Router } from 'express';
import { verifyToken } from '../middleware/auth';
import { StatsController } from '../controller/StatsController';
import { ComedorAdpartes } from '../adapter/ComedorAdapter';
import { DonacionDineroAdpartes } from '../adapter/DonacionDineroAdapter';
import { DonacionInventarioAdpartes } from '../adapter/DonacionInventarioAdapter';
import { ReservaAdpartes } from '../adapter/ReservaAdapter';

const router = Router();

// Inyectar dependencias al controlador
const statsController = new StatsController(
    new ComedorAdpartes(),
    new DonacionDineroAdpartes(),
    new DonacionInventarioAdpartes(),
    new ReservaAdpartes()
);

// Ruta protegida para obtener estadísticas
router.get("/stats", verifyToken, (req, res) => statsController.getStats(req, res));

export default router;
