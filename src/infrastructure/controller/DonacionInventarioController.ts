

import { Request, Response } from "express";

import { DonacionInventarioAdpartes } from "../adapter/DonacionInventarioAdapter";
import { DonacionInventario } from "../../domain/DonacionInventario";
import { InventarioAdpartes } from "../adapter/InventarioAdapter";
import { Inventario } from "../../domain/Inventario";

export class DonacionInventarioController {
    private adapter: DonacionInventarioAdpartes;
    private inventarioAdapter: InventarioAdpartes;

    constructor(adapter: DonacionInventarioAdpartes) {
        this.adapter = adapter;
        this.inventarioAdapter = new InventarioAdpartes();
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
            const { usuario_id, inventario_id, comedor_id, cantidad, fecha, descripcion, unidad } = req.body;
            
            if (!usuario_id || !cantidad || !fecha || !comedor_id) {
                return res.status(400).json({ message: "Faltan campos requeridos: usuario_id, cantidad, fecha y comedor_id son obligatorios." });
            }

            let finalInventarioId = inventario_id;

            // Si no se proporciona un inventario_id, asumimos una donación genérica a un comedor.
            // Opcional: Podrías crear un inventario "genérico" por comedor si no existe.
            // Por simplicidad, aquí podrías requerir que el inventario ya exista o manejarlo de otra forma.
            // De momento, vamos a asumir que el inventario se crea por separado.
            
            // Si no hay un ID de inventario, busquemos uno genérico o creemoslo
            if (!finalInventarioId) {
                let inventario = await this.inventarioAdapter.findOrCreateGeneric(comedor_id, descripcion, unidad);
                finalInventarioId = inventario.id;
            }
            
            // Crear la donación sin 'id'
            const donacionData: Omit<DonacionInventario, "id"> = {
                usuario_id: Number(usuario_id),
                inventario_id: Number(finalInventarioId),
                cantidad: Number(cantidad),
                fecha: new Date(fecha)
            };
            
            const id = await this.adapter.createDonacionInventario(donacionData);
            const createdDonacion = await this.adapter.getDonacionInventarioById(id);
            
            // Opcional: Actualizar la cantidad en el inventario
            await this.inventarioAdapter.incrementarCantidad(finalInventarioId, Number(cantidad));
            
            return res.status(201).json(createdDonacion);
        } catch (error) {
            console.error("Error al crear donación de inventario:", error);
            return res.status(500).json({ message: "Error en el servidor al crear la donación." });
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
