import { Request, Response } from 'express';
import { ComedorEntity } from '../entities/ComedorEntity';
import { ComedorApplicationService } from '../../application/ComedorApplicationService';
import { Comedor } from '../../domain/Comedor';
import { AuthRequest } from '../middleware/auth';

export class ComedorController {
  private app: ComedorApplicationService;

  constructor(app: ComedorApplicationService) {
    this.app = app;
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const comedores = await this.app.getAll();
      return res.status(200).json(comedores);
    } catch (error) {
      console.error('Error en getAll ComedorController:', error);
      return res.status(500).json({ message: 'Error en servidor' });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'ID no válido' });
      }
      const comedor = await this.app.getById(id);
      if (!comedor) {
        return res.status(404).json({ message: 'Comedor no encontrado' });
      }
      return res.status(200).json(comedor);
    } catch (error) {
      console.error('Error en getById ComedorController:', error);
      return res.status(500).json({ message: 'Error en servidor' });
    }
  }

  async create(req: AuthRequest, res: Response): Promise<Response> {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "No autenticado" });
    }

    const { nombre, direccion, horarios, latitud, longitud } = req.body;
    if (!nombre || !direccion) {
      return res.status(400).json({ message: 'Faltan campos requeridos: nombre y direccion' });
    }
    try {
      const comedor: Omit<Comedor, 'id'> = {
        nombre: String(nombre).trim(),
        direccion: String(direccion).trim(),
        horarios: horarios ? String(horarios).trim() : undefined,
        latitud: latitud !== undefined ? Number(latitud) : undefined,
        longitud: longitud !== undefined ? Number(longitud) : undefined,
        creado_por: user.sub // Asignar el ID del usuario autenticado
      };
      const created = await this.app.create(comedor);
      return res.status(201).json(created);
    } catch (error) {
      console.error('Error en create ComedorController:', error);
      return res.status(500).json({ message: 'Error en servidor' });
    }
  }

  async update(req: AuthRequest, res: Response): Promise<Response> {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "No autenticado" });
    }

    const id = parseInt(req.params.id);
    const { nombre, direccion, horarios, latitud, longitud } = req.body;
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID no válido' });
    }
    try {
      const comedor = await this.app.getById(id);
      if (!comedor) {
        return res.status(404).json({ message: 'Comedor no encontrado' });
      }

      if (comedor.creado_por !== user.sub) {
        return res.status(403).json({ message: 'No tienes permiso para editar este comedor' });
      }

      const updated = await this.app.update(id, {
        nombre: nombre !== undefined ? String(nombre).trim() : undefined,
        direccion: direccion !== undefined ? String(direccion).trim() : undefined,
        horarios: horarios !== undefined ? String(horarios).trim() : undefined,
        latitud: latitud !== undefined ? Number(latitud) : undefined,
        longitud: longitud !== undefined ? Number(longitud) : undefined
      });

      return res.status(200).json(updated);
    } catch (error) {
      console.error('Error en update ComedorController:', error);
      return res.status(500).json({ message: 'Error en servidor' });
    }
  }

  async delete(req: AuthRequest, res: Response): Promise<Response> {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "No autenticado" });
    }

    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID no válido' });
    }
    try {
      const comedor = await this.app.getById(id);
      if (!comedor) {
        return res.status(404).json({ message: 'Comedor no encontrado' });
      }

      if (comedor.creado_por !== user.sub) {
        return res.status(403).json({ message: 'No tienes permiso para eliminar este comedor' });
      }

      const deleted = await this.app.delete(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Comedor no encontrado' });
      }
      return res.status(200).json({ message: 'Comedor eliminado correctamente' });
    } catch (error: any) {
      console.error('Error en delete ComedorController:', error);
      const errno = error?.errno || error?.driverError?.errno;
      if (errno === 1451) {
        return res.status(409).json({
          message: 'No se puede eliminar el comedor porque tiene donaciones asociadas. Elimine primero las donaciones o contacte al administrador.'
        });
      }
      return res.status(500).json({ message: 'Error en servidor' });
    }
  }
}


