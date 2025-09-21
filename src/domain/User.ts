export class User {
  public status: boolean;

  constructor(
    public id: number,
    public nombre: string,
    public correo: string,
    public contraseña: string,
    public rol_id: number,
    status?: boolean
  ) {
    // Si el estado es undefined (ej. un usuario antiguo sin estado), se considera activo (true)
    this.status = status !== undefined ? status : true;
  }

  isActive(): boolean {
    return this.status === true;
  }

  suspend(): void {
    if (this.status === false) {
      throw new Error("El usuario ya está suspendido.");
    }
    this.status = false;
  }

  activate(): void {
    if (this.status === true) {
      throw new Error("El usuario ya está activo.");
    }
    this.status = true;
  }
}
