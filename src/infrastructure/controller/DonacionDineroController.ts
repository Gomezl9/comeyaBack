

import { Request, Response } from "express";
import { DonacionDineroAdpartes } from "../adapter/DonacionDineroAdapter";
import { DonacionDinero } from "../../domain/DonacionDinero";

export class DonacionDineroController {
    private adapter: DonacionDineroAdpartes;

    constructor(adapter: DonacionDineroAdpartes) {
        this.adapter = adapter;
    }

    async getAllDonacionesDinero(req: Request, res: Response): Promise<Response> {
        try {
            const donaciones = await this.adapter.getAllDonacionDinero();
            return res.status(200).json(donaciones);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error en servidor" });
        }
    }

    async getDonacionDineroById(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "ID no válido" });
            }
            const donacion = await this.adapter.getDonacionDineroById(id);
            if (!donacion) {
                return res.status(404).json({ message: "Donación no encontrada" });
            }
            return res.status(200).json(donacion);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error en servidor" });
        }
    }

    async createDonacionDinero(req: Request, res: Response): Promise<Response> {
        try {
            const { usuario_id, comedor_id, monto, fecha } = req.body;
            if (!usuario_id || !comedor_id || monto === undefined || !fecha) {
                return res.status(400).json({ message: "Faltan campos requeridos" });
            }
            // Asignación manual de propiedades
            const donacion: Omit<DonacionDinero, "id"> = {
                usuario_id: Number(usuario_id),
                comedor_id: Number(comedor_id),
                monto: Number(monto),
                fecha: new Date(fecha)
            };
            const id = await this.adapter.createDonacionDinero(donacion);
            const created = await this.adapter.getDonacionDineroById(id);
            return res.status(201).json(created);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error en servidor" });
        }
    }

    async updateDonacionDinero(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "ID no válido" });
            }
            const { usuario_id, comedor_id, monto, fecha } = req.body;
            const updated = await this.adapter.updateDonacionDinero(id, {
                usuario_id,
                comedor_id,
                monto,
                fecha
            });
            if (!updated) {
                return res.status(404).json({ message: "Donación no encontrada" });
            }
            const donacion = await this.adapter.getDonacionDineroById(id);
            return res.status(200).json(donacion);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error en servidor" });
        }
    }

    async deleteDonacionDinero(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "ID no válido" });
            }
            const deleted = await this.adapter.deleteDonacionDinero(id);
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
