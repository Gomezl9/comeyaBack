import { Servicio } from '../domain/Servicio';

export class ServicioApplicationService {
  private servicios: Servicio[] = [];

  create(servicio: Servicio): Servicio {
    this.servicios.push(servicio);
    return servicio;
  }

  getAll(): Servicio[] {
    return this.servicios;
  }

  getById(id: number): Servicio | undefined {
    return this.servicios.find(s => s.id === id);
  }

  update(id: number, data: Partial<Servicio>): Servicio | undefined {
    const servicio = this.getById(id);
    if (servicio) {
      Object.assign(servicio, data);
      return servicio;
    }
    return undefined;
  }

  delete(id: number): boolean {
    const index = this.servicios.findIndex(s => s.id === id);
    if (index !== -1) {
      this.servicios.splice(index, 1);
      return true;
    }
    return false;
  }
}
