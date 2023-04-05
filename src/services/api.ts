import axios from "axios";
import { parseCookies } from "nookies";
import { NextPageContext } from "next";

const getCookies = (ctx?: NextPageContext) => parseCookies(ctx);

const isProduction = process.env.NODE_ENV === "production";

const api = axios.create({
	baseURL: isProduction
		? process.env.NEXT_PUBLIC_API_URL
		: process.env.NEXT_PUBLIC_LOCAL_API_URL,
});

api.interceptors.request.use(config => {
	const cookies = getCookies();

	const feedbackId = ["feedbackId"];

	if (feedbackId) {
		config.headers.Cookie = cookies;
	}
	return config;
});

export { api };
