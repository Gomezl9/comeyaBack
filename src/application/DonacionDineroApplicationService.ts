import { DonacionDinero } from '../domain/DonacionDinero';

export class DonacionDineroApplicationService {
  private donacionesDinero: DonacionDinero[] = [];

  create(donacion: DonacionDinero): DonacionDinero {
    this.donacionesDinero.push(donacion);
    return donacion;
  }

  getAll(): DonacionDinero[] {
    return this.donacionesDinero;
  }

  getById(id: number): DonacionDinero | undefined {
    return this.donacionesDinero.find(d => d.id === id);
  }

  update(id: number, data: Partial<DonacionDinero>): DonacionDinero | undefined {
    const donacion = this.getById(id);
    if (donacion) {
      Object.assign(donacion, data);
      return donacion;
    }
    return undefined;
  }

  delete(id: number): boolean {
    const index = this.donacionesDinero.findIndex(d => d.id === id);
    if (index !== -1) {
      this.donacionesDinero.splice(index, 1);
      return true;
    }
    return false;
  }
}
