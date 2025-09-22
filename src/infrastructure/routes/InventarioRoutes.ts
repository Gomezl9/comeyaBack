import { Router } from 'express';
import { InventarioAdpartes } from "../adapter/InventarioAdapter";
import { InventarioController } from '../controller/InventarioController';
import { verifyToken, requireRole } from '../middleware/auth';

const router = Router();
const inventarioAdpartes = new InventarioAdpartes();
const inventarioController = new InventarioController(inventarioAdpartes);


// Proteger todas las rutas de inventario
router.use("/inventarios", verifyToken, requireRole([1]));

// Obtener todas las reservas
router.get("/inventarios", (req, res) => inventarioController.getAllInventarios(req, res));

// Obtener reserva por ID
router.get("/inventarios/:id", (req, res) => inventarioController.getInventarioById(req, res));

// Crear reserva
router.post("/inventarios", (req, res) => inventarioController.createInventario(req, res));

// Actualizar reserva
router.put("/inventarios/:id", (req, res) => inventarioController.updateInventario(req, res));

// Eliminar reserva
router.delete("/inventarios/:id", (req, res) => inventarioController.deleteInventario(req, res));

export default router;


