import { AppDataSource } from '../config/data-base';
import { DonacionInventario } from "../../domain/DonacionInventario";
import { DonacionInventarioEntity } from "../entities/DonacionInventarioEntity";
import { MoreThanOrEqual, In } from 'typeorm';
import { InventarioEntity } from '../entities/InventarioEntity';

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

    private repo = AppDataSource.getRepository(DonacionInventarioEntity);
    private inventarioRepo = AppDataSource.getRepository(InventarioEntity);

    private 일주일_전(): Date {
        const date = new Date();
        date.setDate(date.getDate() - 7);
        return date;
    }

    async countByUser(userId: number): Promise<number> {
        return this.repo.count({ where: { usuario_id: userId } });
    }

    async countRecentByUser(userId: number): Promise<number> {
        return this.repo.count({ where: { usuario_id: userId, fecha: MoreThanOrEqual(this.일주일_전()) } });
    }

    async countByComedores(comedorIds: number[]): Promise<number> {
        if (comedorIds.length === 0) return 0;
        const inventarios = await this.inventarioRepo.find({ where: { comedor_id: In(comedorIds) } });
        const inventarioIds = inventarios.map(i => i.id);
        if (inventarioIds.length === 0) return 0;
        return this.repo.count({ where: { inventario_id: In(inventarioIds) } });
    }

    async countRecentByComedores(comedorIds: number[]): Promise<number> {
        if (comedorIds.length === 0) return 0;
        const inventarios = await this.inventarioRepo.find({ where: { comedor_id: In(comedorIds) } });
        const inventarioIds = inventarios.map(i => i.id);
        if (inventarioIds.length === 0) return 0;
        return this.repo.count({ where: { inventario_id: In(inventarioIds), fecha: MoreThanOrEqual(this.일주일_전()) } });
    }

    async createDonacionInventario(donacioninventario: Omit<DonacionInventario, "id">): Promise<number> {
        const newDonacionInventario = this.repo.create(donacioninventario);
        await this.repo.save(newDonacionInventario);
        return newDonacionInventario.id;
    }

    async getDonacionInventarioById(id: number): Promise<DonacionInventario | null> {
        const donacioninventario = await this.repo.findOneBy({ id });
        return donacioninventario ? this.toDomain(donacioninventario) : null;
    }

    async getAllDonacionesInventario(): Promise<DonacionInventario[]> {
        const donacioninventario = await this.repo.find();
        return donacioninventario.map(u => this.toDomain(u));
    }

    async updateDonacionInventario(id: number, donacioninventario: Partial<DonacionInventario>): Promise<boolean> {
        const result = await this.repo.update(id, donacioninventario);
        return result.affected !== undefined && result.affected > 0;
    }

    async deleteDonacionInventario(id: number): Promise<boolean> {
        const result = await this.repo.delete(id);
        return !!result.affected && result.affected > 0;
    }
}