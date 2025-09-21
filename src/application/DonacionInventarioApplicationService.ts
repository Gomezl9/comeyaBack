import { DonacionInventario } from '../domain/DonacionInventario';

export class DonacionInventarioApplicationService {
  private donacionesInventario: DonacionInventario[] = [];

  create(donacion: DonacionInventario): DonacionInventario {
    this.donacionesInventario.push(donacion);
    return donacion;
  }

  getAll(): DonacionInventario[] {
    return this.donacionesInventario;
  }

  getById(id: number): DonacionInventario | undefined {
    return this.donacionesInventario.find(d => d.id === id);
  }

  update(id: number, data: Partial<DonacionInventario>): DonacionInventario | undefined {
    const donacion = this.getById(id);
    if (donacion) {
      Object.assign(donacion, data);
      return donacion;
    }
    return undefined;
  }

  delete(id: number): boolean {
    const index = this.donacionesInventario.findIndex(d => d.id === id);
    if (index !== -1) {
      this.donacionesInventario.splice(index, 1);
      return true;
    }
    return false;
  }
}
