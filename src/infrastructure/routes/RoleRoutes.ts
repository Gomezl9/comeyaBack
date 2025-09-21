import { Router } from "express";
import { RoleController } from "../controller/RoleController";


const router = Router();
// Obtener todos los roles
router.get('/roles', (req, res) => {
    RoleController.getAll(req, res);
});
// Obtener rol por ID
router.get('/roles/:id', (req, res) => {
    RoleController.getById(req, res);
});
// Crear rol (no permitido)
router.post('/roles', (req, res) => {
    RoleController.create(req, res);
});
// Actualizar rol (no permitido)
router.put('/roles/:id', (req, res) => {
    RoleController.update(req, res);
});
// Eliminar rol (no permitido)
router.delete('/roles/:id', (req, res) => {
    RoleController.delete(req, res);
});

export default router;