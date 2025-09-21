import { AppDataSource } from '../config/data-base';
import { ComedorServicio } from "../../domain/ComedorServicio";
import { ComedorServicioEntity } from "../entities/ComedorServicioEntity";

export class ComedorServicioAdpartes {
    private toDomain(comedorservicio: ComedorServicioEntity): ComedorServicio {
        return {
            id: comedorservicio.id,
            comedor_id: comedorservicio.comedor_id,
            servicio_id: comedorservicio.servicio_id,
        };
    }

    async createComedorServicio(comedorservicio: Omit<ComedorServicio, "id">): Promise<number> {
        const repo = AppDataSource.getRepository(ComedorServicioEntity);
        const newComedorServicio = repo.create(comedorservicio);
        await repo.save(newComedorServicio);
        return newComedorServicio.id;
    }

    async getComedorServicioById(id: number): Promise<ComedorServicio | null> {
        const repo = AppDataSource.getRepository(ComedorServicioEntity);
        const comedorservicio = await repo.findOneBy({ id });
        return comedorservicio ? this.toDomain(comedorservicio) : null;
    }

    async getAllComedorServicios(): Promise<ComedorServicio[]> {
        const repo = AppDataSource.getRepository(ComedorServicioEntity);
        const comedorservicio = await repo.find();
        return comedorservicio.map(u => this.toDomain(u));
    }

    async updateComedorServicio(id: number, comedorservicio: Partial<ComedorServicio>): Promise<boolean> {
        const repo = AppDataSource.getRepository(ComedorServicioEntity);
        const result = await repo.update(id, comedorservicio);
        return result.affected !== undefined && result.affected > 0;
    }

    async deleteComedorServicio(id: number): Promise<boolean> {
        const repo = AppDataSource.getRepository(ComedorServicioEntity);
        const result = await repo.delete(id);
        return !!result.affected && result.affected > 0;
    }
}