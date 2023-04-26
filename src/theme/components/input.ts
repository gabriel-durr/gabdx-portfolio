import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
	createMultiStyleConfigHelpers(inputAnatomy.keys);

const gdxInput = definePartsStyle({
	field: {
		h: "38px",
		w: "full",
		pl: "8px",
		rounded: "sm",
		borderBottomStyle: "solid",
		borderBottomWidth: "1px",
		borderBottomColor: "#D1D1D1",
		bg: "transparent",

		_light: {
			borderBottomColor: "#9699B0",
		},
	},
	addon: {
		color: "gray.500",
	},
});

export const inputTheme = defineMultiStyleConfig({
	variants: { gdxInput },
});
