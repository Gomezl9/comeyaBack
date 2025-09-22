import { AppDataSource } from '../config/data-base';
import { DonacionInventario } from "../../domain/DonacionInventario";
import { DonacionInventarioEntity } from "../entities/DonacionInventarioEntity";

export class DonacionInventarioAdpartes {
    private toDomain(donacioninventario: DonacionInventarioEntity): DonacionInventario {
        return {
            id: donacioninventario.id,
            usuario_id: donacioninventario.usuario_id,
            inventario_id: donacioninventario.inventario_id,
            cantidad: donacioninventario.cantidad,
            fecha: donacioninventario.fecha
        };
    }

    async createDonacionInventario(donacioninventario: Omit<DonacionInventario, "id">): Promise<number> {
    const repo = AppDataSource.getRepository(DonacionInventarioEntity);
        const newDonacionInventario = repo.create(donacioninventario);
        await repo.save(newDonacionInventario);
        return newDonacionInventario.id;
    }

    async getDonacionInventarioById(id: number): Promise<DonacionInventario | null> {
    const repo = AppDataSource.getRepository(DonacionInventarioEntity);
        const donacioninventario = await repo.findOneBy({ id });
        return donacioninventario ? this.toDomain(donacioninventario) : null;
    }

    async getAllDonacionesInventario(): Promise<DonacionInventario[]> {
    const repo = AppDataSource.getRepository(DonacionInventarioEntity);
        const donacioninventario = await repo.find();
        return donacioninventario.map(u => this.toDomain(u));
    }

    async updateDonacionInventario(id: number, donacioninventario: Partial<DonacionInventario>): Promise<boolean> {
    const repo = AppDataSource.getRepository(DonacionInventarioEntity);
        const result = await repo.update(id, donacioninventario);
        return result.affected !== undefined && result.affected > 0;
    }

    async deleteDonacionInventario(id: number): Promise<boolean> {
    const repo = AppDataSource.getRepository(DonacionInventarioEntity);
        const result = await repo.delete(id);
        return !!result.affected && result.affected > 0;
    }
}