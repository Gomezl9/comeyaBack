import http from "k6/http";
import { check, sleep } from "k6";
import { API_BASE, DEFAULT_HEADERS, USER_EMAIL, USER_PASSWORD } from "./config.js";

export function authLogin() {
	if (!USER_EMAIL || !USER_PASSWORD) {
		return null;
	}
	const res = http.post(`${API_BASE}/auth/login`, JSON.stringify({ correo: USER_EMAIL, contraseña: USER_PASSWORD }), {
		headers: DEFAULT_HEADERS,
	});
	check(res, {
		"login status 200": (r) => r.status === 200,
	});
	try {
		const body = res.json();
		return body?.token || null;
	} catch (_) {
		return null;
	}
}

export function authHeaders(token) {
	return token
		? { ...DEFAULT_HEADERS, Authorization: `Bearer ${token}` }
		: { ...DEFAULT_HEADERS };
}

export function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function think(ms = 200) {
	sleep(ms / 1000);
}


