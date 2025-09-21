
import { Request, Response } from "express";

import { ComedorServicioAdpartes } from "../adapter/ComedorServicioAdapter";
import { ComedorServicio } from "../../domain/ComedorServicio";

export class ComedorServicioController {
    private adapter: ComedorServicioAdpartes;

    constructor(adapter: ComedorServicioAdpartes) {
        this.adapter = adapter;
    }

    async getAllComedorServicios(req: Request, res: Response): Promise<Response> {
        try {
            const servicios = await this.adapter.getAllComedorServicios();
            return res.status(200).json(servicios);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error en servidor" });
        }
    }

    async getComedorServicioById(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "ID no válido" });
            }
            const servicio = await this.adapter.getComedorServicioById(id);
            if (!servicio) {
                return res.status(404).json({ message: "ComedorServicio no encontrado" });
            }
            return res.status(200).json(servicio);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error en servidor" });
        }
    }

    async createComedorServicio(req: Request, res: Response): Promise<Response> {
        try {
            const { comedor_id, servicio_id } = req.body;
            if (!comedor_id || !servicio_id) {
                return res.status(400).json({ message: "Faltan campos requeridos" });
            }
            // Asignación manual de propiedades
            const comedorServicio: Omit<ComedorServicio, "id"> = {
                comedor_id: Number(comedor_id),
                servicio_id: Number(servicio_id)
            };
            const id = await this.adapter.createComedorServicio(comedorServicio);
            const created = await this.adapter.getComedorServicioById(id);
            return res.status(201).json(created);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error en servidor" });
        }
    }

    async updateComedorServicio(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "ID no válido" });
            }
            const { comedor_id, servicio_id } = req.body;
            const updated = await this.adapter.updateComedorServicio(id, {
                comedor_id,
                servicio_id
            });
            if (!updated) {
                return res.status(404).json({ message: "ComedorServicio no encontrado" });
            }
            const servicio = await this.adapter.getComedorServicioById(id);
            return res.status(200).json(servicio);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error en servidor" });
        }
    }

    async deleteComedorServicio(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "ID no válido" });
            }
            const deleted = await this.adapter.deleteComedorServicio(id);
            if (!deleted) {
                return res.status(404).json({ message: "ComedorServicio no encontrado" });
            }
            return res.status(200).json({ message: "ComedorServicio eliminado correctamente" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error en servidor" });
        }
    }
}
