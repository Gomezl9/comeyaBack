import { AppDataSource } from '../config/data-base';
import { Reserva } from "../../domain/Reserva";
import { ReservaEntity } from "../entities/ReservaEntity";

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

    async createReserva(reserva: Omit<Reserva, "id">): Promise<number> {
        const repo = AppDataSource.getRepository(ReservaEntity);
        const newReserva = repo.create(reserva);
        await repo.save(newReserva);
        return newReserva.id;
    }

    async getReservaById(id: number): Promise<Reserva | null> {
        const repo = AppDataSource.getRepository(ReservaEntity);
        const reserva = await repo.findOneBy({ id });
        return reserva ? this.toDomain(reserva) : null;
    }

    async getAllReservas(): Promise<Reserva[]> {
        const repo = AppDataSource.getRepository(ReservaEntity);
        const reservas = await repo.find();
        return reservas.map(u => this.toDomain(u));
    }

    async updateReservas(id: number, reserva: Partial<Reserva>): Promise<boolean> {
        const repo = AppDataSource.getRepository(ReservaEntity);
        const result = await repo.update(id, reserva);
        return result.affected !== undefined && result.affected > 0;
    }

    async deleteReservas(id: number): Promise<boolean> {
        const repo = AppDataSource.getRepository(ReservaEntity);
        const result = await repo.delete(id);
        return !!result.affected && result.affected > 0;
    }
}