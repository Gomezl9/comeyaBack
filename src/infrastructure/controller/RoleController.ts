import { UserApplicationService } from "../../application/UserApplicationService";

import { Request, Response } from 'express';
import { RoleEntity } from '../entities/RoleEntity';

// Roles predefinidos - Solo estos dos roles están permitidos
const roles: RoleEntity[] = [];
{
  const admin = new RoleEntity();
  admin.id = 1;
  admin.nombre = 'Administrador';
  roles.push(admin);
  const user = new RoleEntity();
  user.id = 2;
  user.nombre = 'Usuario Común';
  roles.push(user);
}

export class RoleController {
  static getAll(req: Request, res: Response) {
    res.json(roles);
  }

  static getById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID de rol no válido' });
    }
    const role = roles.find(r => r.id === id);
    if (!role) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }
    return res.status(200).json(role);
  }

  static create(req: Request, res: Response) {
    res.status(403).json({ 
      message: 'No se pueden crear nuevos roles. Solo están permitidos: Administrador y Usuario Común' 
    });
  }

  static update(req: Request, res: Response) {
    res.status(403).json({ 
      message: 'No se pueden modificar los roles predefinidos' 
    });
  }

  static delete(req: Request, res: Response) {
    res.status(403).json({ 
      message: 'No se pueden eliminar los roles predefinidos' 
    });
  }

  // Método para obtener rol por nombre (útil para validaciones)
  static getByName(req: Request, res: Response) {
    const { nombre } = req.params;
    const role = roles.find(r => r.nombre.toLowerCase() === nombre.toLowerCase());
    if (!role) return res.status(404).json({ message: 'Rol no encontrado' });
    res.json(role);
  }

  // Método estático para validar si un rol_id es válido
  static isValidRoleId(roleId: number): boolean {
    return roles.some(role => role.id === roleId);
  }

  // Método estático para obtener todos los roles (útil para validaciones)
  static getAllRoles(): RoleEntity[] {
    return roles;
  }
}
