import axios from "axios";

export const apiClientForGAS = axios.create({
	baseURL: process.env.NEXT_PUBLIC_GAS_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

export const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});
