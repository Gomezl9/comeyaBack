import http from "k6/http";
import { check } from "k6";
import { API_BASE, DEFAULT_THRESHOLDS } from "./config.js";

export const options = {
	stages: [
		{ duration: "30s", target: 20 },
		{ duration: "1m", target: 40 },
		{ duration: "30s", target: 60 },
		{ duration: "1m", target: 0 },
	],
	thresholds: DEFAULT_THRESHOLDS,
};

export default function () {
	const res = http.get(`${API_BASE}/reservas`);
	check(res, { "reservas 200": (r) => r.status === 200 });
}


