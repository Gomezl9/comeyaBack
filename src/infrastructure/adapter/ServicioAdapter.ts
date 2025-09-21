import { AppDataSource } from '../config/data-base';
import { Servicio } from "../../domain/Servicio";
import { ServicioEntity } from "../entities/ServicioEntity";

export class ServicioAdpartes {
    private toDomain(servicio: ServicioEntity): Servicio {
        return {
            id: servicio.id,
            nombre: servicio.nombre,
            descripcion: servicio.descripcion
        };
    }

    async createServicio(servicio: Omit<Servicio, "id">): Promise<number> {
        const repo = AppDataSource.getRepository(ServicioEntity);
        const newServicio = repo.create(servicio);
        await repo.save(newServicio);
        return newServicio.id;
    }

    async getServicioById(id: number): Promise<Servicio | null> {
        const repo = AppDataSource.getRepository(ServicioEntity);
        const servicio = await repo.findOneBy({ id });
        return servicio ? this.toDomain(servicio) : null;
    }
    async getAllServicios(): Promise<Servicio[]> {
        const repo = AppDataSource.getRepository(ServicioEntity);
        const servicios = await repo.find();
        return servicios.map(u => this.toDomain(u));
    }

    async updateServicio(id: number, servicio: Partial<Servicio>): Promise<boolean> {
        const repo = AppDataSource.getRepository(ServicioEntity);
        const result = await repo.update(id, servicio);
        return result.affected !== undefined && result.affected > 0;
    }

    async deleteServicio(id: number): Promise<boolean> {
        const repo = AppDataSource.getRepository(ServicioEntity);
        const result = await repo.delete(id);
        return !!result.affected && result.affected > 0;
    }
}