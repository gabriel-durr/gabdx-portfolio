import { withSwagger } from "next-swagger-doc";

const swaggerHandler = withSwagger({
	definition: {
		openapi: "3.0.0",
		info: {
			title: "gbdx-portfolio documentation",
			version: "1.0",
		},
	},
	apiFolder: "src/database/controllers",
});
export default swaggerHandler();
