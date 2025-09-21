import { UserAdpartes } from "../infrastructure/adapter/UserAdaptar";
import { User } from "../domain/User";

export class UserApplicationService {
  private userAdapter: UserAdpartes;

  constructor(userAdapter: UserAdpartes) {
    this.userAdapter = userAdapter;
  }

  async createUser(user: { nombre: string, correo: string, contraseña: string, rol_id: number }): Promise<number> {
    return this.userAdapter.createUser(user);
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userAdapter.getUserById(id);
  }

  async getUserByEmail(correo: string): Promise<User | null> {
    return this.userAdapter.getUserByEmail(correo);
  }

  async getUserByName(nombre: string): Promise<User | null> {
    return this.userAdapter.getUserByName(nombre);
  }

  async getAllUser(): Promise<User[]> {
    return this.userAdapter.getAllUsers();
  }

  async updateUser(id: number, user: Partial<User>): Promise<boolean> {
    return this.userAdapter.updateUser(id, user);
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.userAdapter.deleteUser(id);
  }

  async suspendUser(id: number): Promise<boolean> {
    const user = await this.userAdapter.getUserById(id);
    if (!user) {
      return false; // O lanzar un error de "usuario no encontrado"
    }

    // Aquí usamos la lógica de negocio del dominio
    try {
      user.suspend();
    } catch (error) {
      // Manejar el caso donde el usuario ya está suspendido, si es necesario
      console.warn(`Intento de suspender a un usuario ya suspendido: ${id}`);
      return true; // Considerar como éxito si ya está en el estado deseado
    }
    
    // Persistir el cambio de estado
    return this.userAdapter.updateUser(id, { status: user.status });
  }
}
