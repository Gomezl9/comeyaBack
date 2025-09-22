import http from "k6/http";
import { check } from "k6";
import { API_BASE, DEFAULT_THRESHOLDS } from "./config.js";

export const options = {
	stages: [
		{ duration: "10s", target: 1 },
		{ duration: "10s", target: 100 },
		{ duration: "10s", target: 1 },
		{ duration: "20s", target: 0 },
	],
	thresholds: DEFAULT_THRESHOLDS,
};

export default function () {
	const res = http.get(`${API_BASE}/users`);
	check(res, { "users 200": (r) => r.status === 200 });
}


