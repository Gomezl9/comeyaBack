import { Role } from '../domain/Role';

export class RoleApplicationService {
  private roles: Role[] = [];

  create(role: Role): Role {
    this.roles.push(role);
    return role;
  }

  getAll(): Role[] {
    return this.roles;
  }

  getById(id: number): Role | undefined {
    return this.roles.find(r => r.id === id);
  }

  update(id: number, data: Partial<Role>): Role | undefined {
    const role = this.getById(id);
    if (role) {
      Object.assign(role, data);
      return role;
    }
    return undefined;
  }

  delete(id: number): boolean {
    const index = this.roles.findIndex(r => r.id === id);
    if (index !== -1) {
      this.roles.splice(index, 1);
      return true;
    }
    return false;
  }
}
