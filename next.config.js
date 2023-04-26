const { apiEndpoint } = require("./sm.json");
const { createClient } = require("@prismicio/client");

/** @type {import('next').NextConfig} */

const nextConfig = async () => {
	const client = createClient(apiEndpoint);

	const repository = await client.getRepository();
	const locales = repository.languages.map(lang => lang.id);

	return {
		// experimental: {
		// 	appDir: true, //TODO quando a lançar next.js 13 estável for lançada, com opção de revilidate sob demanda, e outras features estiverem prontas para produção, ativar e migar para o diretório app com sua nova forma de roteamento, etc.
		// },
		reactStrictMode: true,
		swcMinify: true,
		eslint: {
			ignoreDuringBuilds: true,
		},
		i18n: {
			locales,
			defaultLocale: locales[0],
		},
		images: {
			domains: ["images.prismic.io", "prismic-io.s3.amazonaws.com"],
		},
	};
};

module.exports = nextConfig;
