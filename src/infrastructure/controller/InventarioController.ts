
import { Request, Response } from "express";
import { InventarioAdpartes } from "../adapter/InventarioAdapter";
import { Inventario } from "../../domain/Inventario";

export class InventarioController {
    private adapter: InventarioAdpartes;

    constructor(adapter: InventarioAdpartes) {
        this.adapter = adapter;
    }

    async getAllInventarios(req: Request, res: Response): Promise<Response> {
        try {
            const inventarios = await this.adapter.getAllInventarios();
            return res.status(200).json(inventarios);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error en servidor" });
        }
    }

    async getInventarioById(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "ID no válido" });
            }
            const inventario = await this.adapter.getInventarioById(id);
            if (!inventario) {
                return res.status(404).json({ message: "Inventario no encontrado" });
            }
            return res.status(200).json(inventario);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error en servidor" });
        }
    }

    async createInventario(req: Request, res: Response): Promise<Response> {
        try {
            console.log('Datos recibidos en createInventario:', req.body);
            const { nombre, cantidad, unidad, comedor_id } = req.body;
            if (!nombre || cantidad === undefined || !unidad || !comedor_id) {
                console.log('Faltan campos requeridos:', { nombre, cantidad, unidad, comedor_id });
                return res.status(400).json({ message: "Faltan campos requeridos" });
            }
            // Asignación manual de propiedades
            const inventario: Omit<Inventario, "id"> = {
                nombre: String(nombre),
                cantidad: Number(cantidad),
                unidad: String(unidad),
                comedor_id: Number(comedor_id)
            };
            const id = await this.adapter.createInventario(inventario);
            console.log('Inventario creado con ID:', id);
            const created = await this.adapter.getInventarioById(id);
            console.log('Inventario creado:', created);
            return res.status(201).json(created);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error en servidor" });
        }
    }

    async updateInventario(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "ID no válido" });
            }
            const { nombre, cantidad, unidad } = req.body;
            const updated = await this.adapter.updateInventario(id, {
                nombre,
                cantidad,
                unidad
            });
            if (!updated) {
                return res.status(404).json({ message: "Inventario no encontrado" });
            }
            const inventario = await this.adapter.getInventarioById(id);
            return res.status(200).json(inventario);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error en servidor" });
        }
    }

    async deleteInventario(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "ID no válido" });
            }
            const deleted = await this.adapter.deleteInventario(id);
            if (!deleted) {
                return res.status(404).json({ message: "Inventario no encontrado" });
            }
            return res.status(200).json({ message: "Inventario eliminado correctamente" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error en servidor" });
        }
    }
}
