import { Router } from 'express';
import { ComedorAdpartes } from "../adapter/ComedorAdapter";
import { ComedorApplicationService } from "../../application/ComedorApplicationService";
import { ComedorController } from '../controller/ComedorController';
import { verifyToken, requireRole } from '../middleware/auth';

const router = Router();
const comedorAdpartes = new ComedorAdpartes();
const comedorApp = new ComedorApplicationService(comedorAdpartes);
const comedorController = new ComedorController(comedorApp);

// Obtener todos los comedores
router.get("/comedores", async (req, res) => {
    try {
        await comedorController.getAll(req, res);
    } catch (error) {
        res.status(400).json({ message: "Error al obtener comedores" });
    }
});

// Obtener comedor por ID
router.get("/comedores/:id", async (req, res) => {
    try {
        await comedorController.getById(req, res);
    } catch (error) {
        res.status(400).json({ message: "Error al obtener comedor por id" });
    }
});

// Crear comedor
router.post("/comedores", verifyToken, requireRole([1]), async (req, res) => {
    try {
        await comedorController.create(req, res);
    } catch (error) {
        res.status(400).json({ message: "Error al crear comedor" });
    }
});

// Actualizar comedor
router.put("/comedores/:id", verifyToken, requireRole([1]), async (req, res) => {
    try {
        await comedorController.update(req, res);
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar comedor" });
    }
});

// Eliminar comedor
router.delete("/comedores/:id", verifyToken, requireRole([1]), async (req, res) => {
    try {
        await comedorController.delete(req, res);
    } catch (error) {
        res.status(400).json({ message: "Error al eliminar comedor" });
    }
});

export default router;


