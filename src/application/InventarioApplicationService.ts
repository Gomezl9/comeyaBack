import { Inventario } from '../domain/Inventario';

export class InventarioApplicationService {
  // Simulación de almacenamiento en memoria
  private inventarios: Inventario[] = [];

  create(inventario: Inventario): Inventario {
    this.inventarios.push(inventario);
    return inventario;
  }

  getAll(): Inventario[] {
    return this.inventarios;
  }

  getById(id: number): Inventario | undefined {
    return this.inventarios.find(i => i.id === id);
  }

  update(id: number, data: Partial<Inventario>): Inventario | undefined {
    const inventario = this.getById(id);
    if (inventario) {
      Object.assign(inventario, data);
      return inventario;
    }
    return undefined;
  }

  delete(id: number): boolean {
    const index = this.inventarios.findIndex(i => i.id === id);
    if (index !== -1) {
      this.inventarios.splice(index, 1);
      return true;
    }
    return false;
  }
}
