import { Comedor } from '../domain/Comedor';
import { ComedorAdpartes } from '../infrastructure/adapter/ComedorAdapter';

export class ComedorApplicationService {
  private adapter: ComedorAdpartes;

  constructor(adapter: ComedorAdpartes) {
    this.adapter = adapter;
  }

  async create(comedor: Omit<Comedor, 'id'>): Promise<Comedor> {
    const id = await this.adapter.createComedor(comedor);
    const created = await this.adapter.getcomedorById(id);
    if (!created) throw new Error('Error al crear comedor');
    return created;
  }

  async getAll(): Promise<Comedor[]> {
    return await this.adapter.getAllcomedor();
  }

  async getById(id: number): Promise<Comedor | null> {
    return await this.adapter.getcomedorById(id);
  }

  async update(id: number, data: Partial<Comedor>): Promise<Comedor | null> {
    const updated = await this.adapter.updatecomedor(id, data);
    if (!updated) return null;
    return await this.adapter.getcomedorById(id);
  }

  async delete(id: number): Promise<boolean> {
    return await this.adapter.deletecomedor(id);
  }
}
