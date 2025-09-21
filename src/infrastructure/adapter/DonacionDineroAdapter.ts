import { AppDataSource } from '../config/data-base';
import { DonacionDinero } from "../../domain/DonacionDinero";
import { DonacionDineroEntity } from "../entities/DonacionDineroEntity";

export class DonacionDineroAdpartes {
    private toDomain(donaciondinero: DonacionDineroEntity): DonacionDinero {
        return {
            id: donaciondinero.id,
            usuario_id: donaciondinero.usuario_id,
            comedor_id: donaciondinero.comedor_id,
            monto: donaciondinero.monto,
            fecha: donaciondinero.fecha
        };
    }

    async createDonacionDinero(donaciondinero: Omit<DonacionDinero, "id">): Promise<number> {
    const repo = AppDataSource.getRepository(DonacionDineroEntity);
        const newDonacionDinero = repo.create(donaciondinero);
        await repo.save(newDonacionDinero);
        return newDonacionDinero.id;
    }

    async getDonacionDineroById(id: number): Promise<DonacionDinero | null> {
    const repo = AppDataSource.getRepository(DonacionDineroEntity);
        const donaciondinero = await repo.findOneBy({ id });
        return donaciondinero ? this.toDomain(donaciondinero) : null;
    }

    async getAllDonacionDinero(): Promise<DonacionDinero[]> {
    const repo = AppDataSource.getRepository(DonacionDineroEntity);
        const donaciondineros = await repo.find();
        return donaciondineros.map(u => this.toDomain(u));
    }

    async updateDonacionDinero(id: number, donaciondinero: Partial<DonacionDinero>): Promise<boolean> {
    const repo = AppDataSource.getRepository(DonacionDineroEntity);
        const result = await repo.update(id, donaciondinero);
        return result.affected !== undefined && result.affected > 0;
    }

    async deleteDonacionDinero(id: number): Promise<boolean> {
    const repo = AppDataSource.getRepository(DonacionDineroEntity);
        const result = await repo.delete(id);
        return !!result.affected && result.affected > 0;
    }
}