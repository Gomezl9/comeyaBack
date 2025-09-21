-- =====================================================
-- TABLA ROLES
-- =====================================================
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL
);

INSERT INTO roles (id, nombre) VALUES
(1, 'Administrador'),
(2, 'Usuario normal');

-- =====================================================
-- TABLA USUARIOS
-- =====================================================
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL UNIQUE,
  "contraseña" TEXT NOT NULL,
  rol_id INT NOT NULL REFERENCES roles(id)
);

INSERT INTO usuarios (id, nombre, correo, "contraseña", rol_id) VALUES
(1, 'Juan Pérez', 'juan@example.com', '12345', 1),
(2, 'María Gómez', 'maria@example.com', '12345', 2);

-- =====================================================
-- TABLA COMEDORES
-- =====================================================
CREATE TABLE comedores (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  direccion TEXT NOT NULL,
  horarios TEXT,
  latitud DECIMAL(9,6),
  longitud DECIMAL(9,6),
  creado_por INT NOT NULL REFERENCES usuarios(id)
);

INSERT INTO comedores (id, nombre, direccion, horarios, latitud, longitud, creado_por) VALUES
(1, 'Comedor Central', 'Calle 123 #45-67', 'Lunes a Viernes 8:00-16:00', 4.609710, -74.081750, 1);

-- =====================================================
-- TABLA SERVICIOS
-- =====================================================
CREATE TABLE servicios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT
);

INSERT INTO servicios (id, nombre, descripcion) VALUES
(1, 'Almuerzo', 'Servicio de almuerzos diarios'),
(2, 'Desayuno', 'Servicio de desayunos saludables');

-- =====================================================
-- TABLA COMEDORES_SERVICIOS
-- =====================================================
CREATE TABLE comedores_servicios (
  id SERIAL PRIMARY KEY,
  comedor_id INT NOT NULL REFERENCES comedores(id),
  servicio_id INT NOT NULL REFERENCES servicios(id),
  CONSTRAINT comedor_servicio_unique UNIQUE (comedor_id, servicio_id)
);

INSERT INTO comedores_servicios (id, comedor_id, servicio_id) VALUES
(1, 1, 1),
(2, 1, 2);

-- =====================================================
-- TABLA INVENTARIO
-- =====================================================
CREATE TABLE inventario (
  id SERIAL PRIMARY KEY,
  comedor_id INT NOT NULL REFERENCES comedores(id),
  nombre VARCHAR(100) NOT NULL,
  cantidad INT NOT NULL,
  unidad VARCHAR(50) NOT NULL
);

INSERT INTO inventario (id, comedor_id, nombre, cantidad, unidad) VALUES
(1, 1, 'Arroz', 50, 'Kg'),
(2, 1, 'Leche', 30, 'Litros');

-- =====================================================
-- TABLA DONACIONES MONTO
-- =====================================================
CREATE TABLE donaciones_monto (
  id SERIAL PRIMARY KEY,
  usuario_id INT NOT NULL REFERENCES usuarios(id),
  comedor_id INT NOT NULL REFERENCES comedores(id),
  monto DECIMAL(10,2) NOT NULL,
  fecha DATE NOT NULL DEFAULT CURRENT_DATE
);

INSERT INTO donaciones_monto (id, usuario_id, comedor_id, monto, fecha) VALUES
(1, 2, 1, 100000.00, '2025-09-11');

-- =====================================================
-- TABLA DONACIONES INVENTARIO
-- =====================================================
CREATE TABLE donaciones_inventario (
  id SERIAL PRIMARY KEY,
  usuario_id INT NOT NULL REFERENCES usuarios(id),
  inventario_id INT NOT NULL REFERENCES inventario(id),
  cantidad INT NOT NULL,
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO donaciones_inventario (id, usuario_id, inventario_id, cantidad, fecha) VALUES
(1, 2, 1, 10, '2025-09-12 04:53:44');

-- =====================================================
-- TABLA RESERVAS
-- =====================================================
CREATE TABLE reservas (
  id SERIAL PRIMARY KEY,
  usuario_id INT NOT NULL REFERENCES usuarios(id),
  comedor_id INT NOT NULL REFERENCES comedores(id),
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  personas INT NOT NULL,
  estado VARCHAR(50)
);

INSERT INTO reservas (id, usuario_id, comedor_id, fecha, hora, personas, estado) VALUES
(1, 2, 1, '2025-09-15', '12:30:00', 3, 'Confirmada');
