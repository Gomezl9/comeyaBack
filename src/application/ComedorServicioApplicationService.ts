import { ComedorServicio } from '../domain/ComedorServicio';

export class ComedorServicioApplicationService {
  private comedoresServicios: ComedorServicio[] = [];

  create(comedorServicio: ComedorServicio): ComedorServicio {
    this.comedoresServicios.push(comedorServicio);
    return comedorServicio;
  }

  getAll(): ComedorServicio[] {
    return this.comedoresServicios;
  }

  getById(id: number): ComedorServicio | undefined {
    return this.comedoresServicios.find(cs => cs.id === id);
  }

  update(id: number, data: Partial<ComedorServicio>): ComedorServicio | undefined {
    const comedorServicio = this.getById(id);
    if (comedorServicio) {
      Object.assign(comedorServicio, data);
      return comedorServicio;
    }
    return undefined;
  }

  delete(id: number): boolean {
    const index = this.comedoresServicios.findIndex(cs => cs.id === id);
    if (index !== -1) {
      this.comedoresServicios.splice(index, 1);
      return true;
    }
    return false;
  }
}
