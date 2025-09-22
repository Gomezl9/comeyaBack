

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
            
            if (!usuario_id || !cantidad || !fecha) {
                return res.status(400).json({ message: "Faltan campos requeridos" });
            }

            let finalInventarioId = inventario_id;

            // Si no hay inventario_id, crear uno nuevo con comedor_id
            if (!finalInventarioId && comedor_id) {
                // Crear inventario con los datos de la donación
                const inventarioData: Omit<Inventario, "id"> = {
                    nombre: descripcion || 'Donación de alimentos',
                    cantidad: Number(cantidad),
                    unidad: unidad || 'unidades',
                    comedor_id: Number(comedor_id)
                };
                
                finalInventarioId = await this.inventarioAdapter.createInventario(inventarioData);
            }
            
            if (!finalInventarioId) {
                return res.status(400).json({ message: "No se pudo crear o encontrar inventario" });
            }
            
            // Crear la donación con el inventario_id
            const donacion: Omit<DonacionInventario, "id"> = {
                usuario_id: Number(usuario_id),
                inventario_id: Number(finalInventarioId),
                cantidad: Number(cantidad),
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
