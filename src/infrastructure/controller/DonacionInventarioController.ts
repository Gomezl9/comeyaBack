

import { Request, Response } from "express";

import { DonacionInventarioAdpartes } from "../adapter/DonacionInventarioAdapter";
import { DonacionInventario } from "../../domain/DonacionInventario";

export class DonacionInventarioController {
    private adapter: DonacionInventarioAdpartes;

    constructor(adapter: DonacionInventarioAdpartes) {
        this.adapter = adapter;
    }

    async getAllDonacionesInventario(req: Request, res: Response): Promise<Response> {
        try {
            const donaciones = await this.adapter.getAllDonacionesInventario();
            return res.status(200).json(donaciones);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error en servidor" });
        }
    }

    async getDonacionInventarioById(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "ID no válido" });
            }
            const donacion = await this.adapter.getDonacionInventarioById(id);
            if (!donacion) {
                return res.status(404).json({ message: "Donación no encontrada" });
            }
            return res.status(200).json(donacion);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error en servidor" });
        }
    }

    async createDonacionInventario(req: Request, res: Response): Promise<Response> {
        try {
            const { usuario_id, inventario_id, fecha } = req.body;
            if (!usuario_id || !inventario_id || !fecha) {
                return res.status(400).json({ message: "Faltan campos requeridos" });
            }
            // Asignación manual de propiedades
            const donacion: Omit<DonacionInventario, "id"> = {
                usuario_id: Number(usuario_id),
                inventario_id: Number(inventario_id),
                fecha: new Date(fecha)
            };
            const id = await this.adapter.createDonacionInventario(donacion);
            const created = await this.adapter.getDonacionInventarioById(id);
            return res.status(201).json(created);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error en servidor" });
        }
    }

    async updateDonacionInventario(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "ID no válido" });
            }
            const { usuario_id, inventario_id, fecha } = req.body;
            const updated = await this.adapter.updateDonacionInventario(id, {
                usuario_id,
                inventario_id,
                fecha
            });
            if (!updated) {
                return res.status(404).json({ message: "Donación no encontrada" });
            }
            const donacion = await this.adapter.getDonacionInventarioById(id);
            return res.status(200).json(donacion);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error en servidor" });
        }
    }

    async deleteDonacionInventario(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "ID no válido" });
            }
            const deleted = await this.adapter.deleteDonacionInventario(id);
            if (!deleted) {
                return res.status(404).json({ message: "Donación no encontrada" });
            }
            return res.status(200).json({ message: "Donación eliminada correctamente" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error en servidor" });
        }
    }
}
