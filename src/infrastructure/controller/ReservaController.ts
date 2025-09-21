import { UserApplicationService } from "../../application/UserApplicationService";

import { Request, Response } from "express";
import { ReservaAdpartes } from "../adapter/ReservaAdapter";
import { Reserva } from "../../domain/Reserva";

export class ReservaController {
    private adapter: ReservaAdpartes;

    constructor(adapter: ReservaAdpartes) {
        this.adapter = adapter;
    }

    async getAllReservas(req: Request, res: Response): Promise<Response> {
        try {
            const reservas = await this.adapter.getAllReservas();
            return res.status(200).json(reservas);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error en servidor" });
        }
    }

    async getReservaById(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "ID no válido" });
            }
            const reserva = await this.adapter.getReservaById(id);
            if (!reserva) {
                return res.status(404).json({ message: "Reserva no encontrada" });
            }
            return res.status(200).json(reserva);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error en servidor" });
        }
    }

    async createReserva(req: Request, res: Response): Promise<Response> {
        try {
            const { usuario_id, comedor_id, fecha, hora, personas, estado } = req.body;
            if (!usuario_id || !comedor_id || !fecha || !hora || !personas) {
                return res.status(400).json({ message: "Faltan campos requeridos" });
            }
            const reserva: Omit<Reserva, "id"> = {
                usuario_id: Number(usuario_id),
                comedor_id: Number(comedor_id),
                fecha: String(fecha),
                hora: String(hora),
                personas: Number(personas),
                estado: estado ? String(estado) : undefined
            };
            const id = await this.adapter.createReserva(reserva);
            const created = await this.adapter.getReservaById(id);
            return res.status(201).json(created);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error en servidor" });
        }
    }

    async updateReserva(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "ID no válido" });
            }
            const { usuario_id, comedor_id, fecha, hora, personas, estado } = req.body;
            const updated = await this.adapter.updateReservas(id, {
                usuario_id,
                comedor_id,
                fecha,
                hora,
                personas,
                estado
            });
            if (!updated) {
                return res.status(404).json({ message: "Reserva no encontrada" });
            }
            const reserva = await this.adapter.getReservaById(id);
            return res.status(200).json(reserva);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error en servidor" });
        }
    }

    async deleteReserva(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "ID no válido" });
            }
            const deleted = await this.adapter.deleteReservas(id);
            if (!deleted) {
                return res.status(404).json({ message: "Reserva no encontrada" });
            }
            return res.status(200).json({ message: "Reserva eliminada correctamente" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error en servidor" });
        }
    }
}
