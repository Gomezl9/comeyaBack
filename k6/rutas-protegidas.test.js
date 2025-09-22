import http from "k6/http";
import { check, fail } from "k6";
import { API_BASE, DEFAULT_THRESHOLDS } from "./config.js";
import { authLogin, authHeaders, think } from "./utils.js";

export const options = {
	vus: 5,
	duration: "1m",
	thresholds: DEFAULT_THRESHOLDS,
};

let token;

export function setup() {
	token = authLogin();
	if (!token) {
		fail("No se obtuvo token. Define K6_USER_EMAIL y K6_USER_PASSWORD");
	}
	return { token };
}

export default function (data) {
	const headers = authHeaders(data.token);

	// Crear servicio (ruta base '/api/servicios')
	const createRes = http.post(`${API_BASE}/servicios`, JSON.stringify({ nombre: `svc-${__ITER}`, descripcion: "demo" }), { headers });
	check(createRes, { "crear servicio 201/200": (r) => r.status === 201 || r.status === 200 });

	// Listar servicios
	const listRes = http.get(`${API_BASE}/servicios`, { headers });
	check(listRes, { "listar servicios 200": (r) => r.status === 200 });

	think(200);
}


