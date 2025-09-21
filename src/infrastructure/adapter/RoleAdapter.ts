import { AppDataSource } from '../config/data-base';
import { Role } from "../../domain/Role";
import { RoleEntity } from "../entities/RoleEntity";

export class RoleAdpartes {
    private toDomain(role: RoleEntity): Role {
        return {
            id: role.id,
            nombre: role.nombre
        };
    }

    async createRole(role: Omit<Role, "id">): Promise<number> {
        const repo = AppDataSource.getRepository(RoleEntity);
        const newRole = repo.create(role);
        await repo.save(newRole);
        return newRole.id;
    }

    async getRoleById(id: number): Promise<Role | null> {
        const repo = AppDataSource.getRepository(RoleEntity);
        const role = await repo.findOneBy({ id });
        return role ? this.toDomain(role) : null;
    }

    async getAllRoles(): Promise<Role[]> {
        const repo = AppDataSource.getRepository(RoleEntity);
        const roles = await repo.find();
        return roles.map(u => this.toDomain(u));
    }

    async updateRole(id: number, role: Partial<Role>): Promise<boolean> {
        const repo = AppDataSource.getRepository(RoleEntity);
        const result = await repo.update(id, role);
        return result.affected !== undefined && result.affected > 0;
    }

    async deleteRole(id: number): Promise<boolean> {
        const repo = AppDataSource.getRepository(RoleEntity);
        const result = await repo.delete(id);
        return !!result.affected && result.affected > 0;
    }
}