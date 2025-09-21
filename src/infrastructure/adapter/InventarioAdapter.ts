import { AppDataSource } from '../config/data-base';
import { Inventario } from "../../domain/Inventario";
import { InventarioEntity } from "../entities/InventarioEntity";

export class InventarioAdpartes {
    private toDomain(inventario: InventarioEntity): Inventario {
        return {
            id: inventario.id,
            nombre: inventario.nombre,
            cantidad: inventario.cantidad,
            unidad: inventario.unidad,
            comedor_id: inventario.comedor_id
        };
    }

    async createInventario(inventario: Omit<Inventario, "id">): Promise<number> {
        const repo = AppDataSource.getRepository(InventarioEntity);
        // Asegurarse de que comedor_id se incluya
        const newInventario = repo.create({
            nombre: inventario.nombre,
            cantidad: inventario.cantidad,
            unidad: inventario.unidad,
            comedor_id: inventario.comedor_id
        });
        await repo.save(newInventario);
        return newInventario.id;
    }

    async getInventarioById(id: number): Promise<Inventario | null> {
        const repo = AppDataSource.getRepository(InventarioEntity);
        const inventario = await repo.findOneBy({ id });
        return inventario ? this.toDomain(inventario) : null;
    }

    async getAllInventarios(): Promise<Inventario[]> {
        const repo = AppDataSource.getRepository(InventarioEntity);
        const inventarios = await repo.find();
        return inventarios.map(u => this.toDomain(u));
    }

    async updateInventario(id: number, inventario: Partial<Inventario>): Promise<boolean> {
        const repo = AppDataSource.getRepository(InventarioEntity);
        const result = await repo.update(id, inventario);
        return result.affected !== undefined && result.affected > 0;
    }

    async deleteInventario(id: number): Promise<boolean> {
        const repo = AppDataSource.getRepository(InventarioEntity);
        const result = await repo.delete(id);
        return !!result.affected && result.affected > 0;
    }
}