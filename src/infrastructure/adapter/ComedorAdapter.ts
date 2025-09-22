import { AppDataSource } from '../config/data-base';
import { Comedor } from "../../domain/Comedor";
import { ComedorEntity } from "../entities/ComedorEntity";
import { Request, Response } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export class ComedorAdpartes {
    private comedorRepository = AppDataSource.getRepository(ComedorEntity);

    registerComedor(req: Request<{}, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>) {
        throw new Error('Method not implemented.');
    }
    getComedorById(req: Request<{ id: string; }, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>) {
        throw new Error('Method not implemented.');
    }
    getAllComedor(req: Request<{}, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>) {
        throw new Error('Method not implemented.');
    }
    private toDomain(comedor: ComedorEntity): Comedor {
        return {
            id: comedor.id,
            nombre: comedor.nombre,
            direccion: comedor.direccion,
            horarios: comedor.horarios,
            latitud: comedor.latitud,
            longitud: comedor.longitud,
            creado_por: comedor.creado_por
        };
    }

    async createComedor(comedor: Omit<Comedor, "id">): Promise<number> {
        const repo = AppDataSource.getRepository(ComedorEntity);
        const newComedor = repo.create(comedor);
        await repo.save(newComedor);
        return newComedor.id;
    }

    async getcomedorById(id: number): Promise<Comedor | null> {
        const repo = AppDataSource.getRepository(ComedorEntity);
        const comedor = await repo.findOneBy({ id });
        return comedor ? this.toDomain(comedor) : null;
    }

    async getAllcomedor(): Promise<Comedor[]> {
        const repo = AppDataSource.getRepository(ComedorEntity);
        const comedor = await repo.find();
        return comedor.map(u => this.toDomain(u));
    }

    async updatecomedor(id: number, Comedor: Partial<Comedor>): Promise<boolean> {
        const repo = AppDataSource.getRepository(ComedorEntity);
        const result = await repo.update(id, Comedor);
        return result.affected !== undefined && result.affected > 0;
    }

    async deletecomedor(id: number): Promise<boolean> {
        const repo = AppDataSource.getRepository(ComedorEntity);
        const result = await repo.delete(id);
        return !!result.affected && result.affected > 0;
    }

    async findByCreator(creatorId: number): Promise<ComedorEntity[]> {
        return this.comedorRepository.find({ where: { creado_por: creatorId } });
    }

    async countAll(): Promise<number> {
        return this.comedorRepository.count();
    }

    async countActivos(): Promise<number> {
        return this.comedorRepository.count({ where: { activo: true } });
    }
}