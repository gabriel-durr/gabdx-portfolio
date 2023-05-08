const { apiEndpoint } = require("./slicemachine.config.json");
const { createClient } = require("@prismicio/client");

/** @type {import('next').NextConfig} */

const nextConfig = async () => {
	const client = createClient(apiEndpoint);

	const repository = await client.getRepository();
	const locales = repository.languages.map(lang => lang.id);

	return {
		experimental: {
			appDir: true,
		},
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
			unoptimized: true,
		},
	};
};

module.exports = nextConfig;
