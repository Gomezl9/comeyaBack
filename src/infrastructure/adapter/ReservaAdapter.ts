import { AppDataSource } from '../config/data-base';
import { Reserva } from "../../domain/Reserva";
import { ReservaEntity } from "../entities/ReservaEntity";
import { MoreThanOrEqual, In } from 'typeorm';

export class ReservaAdpartes {
    private toDomain(reserva: ReservaEntity): Reserva {
        return {
            id: reserva.id,
            usuario_id: reserva.usuario_id,
            comedor_id: reserva.comedor_id,
            fecha: reserva.fecha,
            hora: reserva.hora,
            personas: reserva.personas,
            estado: reserva.estado
        };
    }

    private repo = AppDataSource.getRepository(ReservaEntity);

    private 일주일_전(): Date {
        const date = new Date();
        date.setDate(date.getDate() - 7);
        return date;
    }

    async createReserva(reserva: Omit<Reserva, "id">): Promise<number> {
        const newReserva = this.repo.create(reserva);
        await this.repo.save(newReserva);
        return newReserva.id;
    }

    async getReservaById(id: number): Promise<Reserva | null> {
        const reserva = await this.repo.findOneBy({ id });
        return reserva ? this.toDomain(reserva) : null;
    }

    async getAllReservas(): Promise<Reserva[]> {
        const reservas = await this.repo.find();
        return reservas.map(u => this.toDomain(u));
    }

    async updateReservas(id: number, reserva: Partial<Reserva>): Promise<boolean> {
        const result = await this.repo.update(id, reserva);
        return result.affected !== undefined && result.affected > 0;
    }

    async deleteReservas(id: number): Promise<boolean> {
        const result = await this.repo.delete(id);
        return !!result.affected && result.affected > 0;
    }

    async countByUser(userId: number): Promise<number> {
        return this.repo.count({ where: { usuario_id: userId } });
    }

    async countPendientesByUser(userId: number): Promise<number> {
        return this.repo.count({ where: { usuario_id: userId, estado: 'pendiente' } });
    }

    async countByComedores(comedorIds: number[]): Promise<number> {
        if (comedorIds.length === 0) return 0;
        return this.repo.count({ where: { comedor_id: In(comedorIds) } });
    }

    async countPendientesByComedores(comedorIds: number[]): Promise<number> {
        if (comedorIds.length === 0) return 0;
        return this.repo.count({ where: { comedor_id: In(comedorIds), estado: 'pendiente' } });
    }
}