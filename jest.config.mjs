import nextJest from "next/jest.js";

const createJestConfig = nextJest({
	dir: "./",
});

/** @type {import('jest').Config} */
const config = {
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	testEnvironment: "jest-environment-jsdom",
	moduleNameMapper: {
		"^@/components/(.*)$": "<rootDir>/src/components/$1",
	},
	verbose: true,
};

export default createJestConfig(config);
