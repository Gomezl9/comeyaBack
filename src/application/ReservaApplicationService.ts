import { Reserva } from '../domain/Reserva';

export class ReservaApplicationService {
  // Simulación de almacenamiento en memoria
  private reservas: Reserva[] = [];

  create(reserva: Reserva): Reserva {
    this.reservas.push(reserva);
    return reserva;
  }

  getAll(): Reserva[] {
    return this.reservas;
  }

  getById(id: number): Reserva | undefined {
    return this.reservas.find(r => r.id === id);
  }

  update(id: number, data: Partial<Reserva>): Reserva | undefined {
    const reserva = this.getById(id);
    if (reserva) {
      Object.assign(reserva, data);
      return reserva;
    }
    return undefined;
  }

  delete(id: number): boolean {
    const index = this.reservas.findIndex(r => r.id === id);
    if (index !== -1) {
      this.reservas.splice(index, 1);
      return true;
    }
    return false;
  }
}
