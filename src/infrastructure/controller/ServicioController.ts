import { Request, Response } from "express";
import { ServicioAdpartes } from "../adapter/ServicioAdapter";

export class ServicioController {
    private adapter: ServicioAdpartes;

    constructor(adapter: ServicioAdpartes) {
        this.adapter = adapter;
    }

    async getAllServicios(req: Request, res: Response): Promise<Response> {
        try {
            const servicios = await this.adapter.getAllServicios();
            return res.status(200).json(servicios);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error en servidor" });
        }
    }

    async getServicioById(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "ID no válido" });
            }
            const servicio = await this.adapter.getServicioById(id);
            if (!servicio) {
                return res.status(404).json({ message: "Servicio no encontrado" });
            }
            return res.status(200).json(servicio);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error en servidor" });
        }
    }

    async createServicio(req: Request, res: Response): Promise<Response> {
        try {
            console.log('Datos recibidos en createServicio:', req.body);
            const { nombre, descripcion } = req.body;
            if (!nombre || typeof nombre !== "string") {
                console.log('Faltan campos requeridos:', { nombre, descripcion });
                return res.status(400).json({ message: "Nombre es requerido" });
            }
            const id = await this.adapter.createServicio({ nombre, descripcion });
            console.log('Servicio creado con ID:', id);
            return res.status(201).json({ message: "Servicio creado", id });
        } catch (error) {
            console.error('Error en createServicio:', error);
            return res.status(500).json({ message: "Error en servidor" });
        }
    }

    async updateServicio(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "ID no válido" });
            }
            const { nombre, descripcion } = req.body;
            const updated = await this.adapter.updateServicio(id, { nombre, descripcion });
            if (!updated) {
                return res.status(404).json({ message: "Servicio no encontrado" });
            }
            return res.status(200).json({ message: "Servicio actualizado" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error en servidor" });
        }
    }

    async deleteServicio(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "ID no válido" });
            }
            const deleted = await this.adapter.deleteServicio(id);
            if (!deleted) {
                return res.status(404).json({ message: "Servicio no encontrado" });
            }
            return res.status(200).json({ message: "Servicio eliminado" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error en servidor" });
        }
    }
}
