// Configuración centralizada de k6 usando variables de entorno
// Requiere tener la API corriendo. Ajusta BASE_URL y credenciales si usarás rutas protegidas.

export const BASE_URL = __ENV.K6_BASE_URL || "http://localhost:3000";
export const API_BASE = `${BASE_URL}/api`;

export const USER_EMAIL = __ENV.K6_USER_EMAIL || ""; // correo para login opcional
export const USER_PASSWORD = __ENV.K6_USER_PASSWORD || ""; // contraseña para login opcional

export const DEFAULT_HEADERS = {
	"Content-Type": "application/json",
};

// Umbrales por defecto
export const DEFAULT_THRESHOLDS = {
	http_req_failed: ["rate<0.01"], // < 1% fallos
	http_req_duration: ["p(95)<500"], // 95% < 500ms
};


