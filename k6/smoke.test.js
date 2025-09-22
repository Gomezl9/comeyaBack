import http from "k6/http";
import { check } from "k6";
import { API_BASE, DEFAULT_THRESHOLDS } from "./config.js";

export const options = {
	vus: 1,
	duration: "30s",
	thresholds: DEFAULT_THRESHOLDS,
};

export default function () {
	const res = http.get(`${API_BASE}/users`);
	check(res, {
		"users 200": (r) => r.status === 200,
	});
}


