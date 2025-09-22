import { AppDataSource } from '../config/data-base';
import { DonacionDinero } from "../../domain/DonacionDinero";
import { DonacionDineroEntity } from "../entities/DonacionDineroEntity";
import { MoreThanOrEqual } from 'typeorm';

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

    private repo = AppDataSource.getRepository(DonacionDineroEntity);

    private 일주일_전(): Date {
        const date = new Date();
        date.setDate(date.getDate() - 7);
        return date;
    }

    async createDonacionDinero(donaciondinero: Omit<DonacionDinero, "id">): Promise<number> {
        const newDonacionDinero = this.repo.create(donaciondinero);
        await this.repo.save(newDonacionDinero);
        return newDonacionDinero.id;
    }

    async getDonacionDineroById(id: number): Promise<DonacionDinero | null> {
        const donaciondinero = await this.repo.findOneBy({ id });
        return donaciondinero ? this.toDomain(donaciondinero) : null;
    }

    async getAllDonacionDinero(): Promise<DonacionDinero[]> {
        const donaciondineros = await this.repo.find();
        return donaciondineros.map(u => this.toDomain(u));
    }

    async updateDonacionDinero(id: number, donaciondinero: Partial<DonacionDinero>): Promise<boolean> {
        const result = await this.repo.update(id, donaciondinero);
        return result.affected !== undefined && result.affected > 0;
    }

    async deleteDonacionDinero(id: number): Promise<boolean> {
        const result = await this.repo.delete(id);
        return !!result.affected && result.affected > 0;
    }

    async countByUser(userId: number): Promise<number> {
        return this.repo.count({ where: { usuario_id: userId } });
    }

    async countRecentByUser(userId: number): Promise<number> {
        return this.repo.count({ where: { usuario_id: userId, fecha: MoreThanOrEqual(this.일주일_전()) } });
    }

    async countByComedores(comedorIds: number[]): Promise<number> {
        if (comedorIds.length === 0) return 0;
        return this.repo.createQueryBuilder("donacion")
            .where("donacion.comedor_id IN (:...comedorIds)", { comedorIds })
            .getCount();
    }

    async countRecentByComedores(comedorIds: number[]): Promise<number> {
        if (comedorIds.length === 0) return 0;
        return this.repo.createQueryBuilder("donacion")
            .where("donacion.comedor_id IN (:...comedorIds)", { comedorIds })
            .andWhere("donacion.fecha >= :date", { date: this.일주일_전() })
            .getCount();
    }
}