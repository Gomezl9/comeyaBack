// Aquí defines los casos de uso
import { User } from '../domain/User';

export class CreateUser {
  execute(nombre: string, correo: string, contraseña: string, rol_id: number): User {
    // Aquí iría la lógica de negocio real
    return new User(
      Date.now(),
      nombre,
      correo,
      contraseña,
      rol_id
    );
  }
}
