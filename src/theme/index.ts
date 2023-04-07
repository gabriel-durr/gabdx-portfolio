import { fonts } from "./fonts";
import { colors } from "./colors";

import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

const styles = {
	global: (props: StyleFunctionProps | Record<string, any>) => ({
		body: {
			fontFamily: "body",
			color: mode("gray.100", "gray.900")(props),
			bg: mode("darkblue.500", "light.500")(props),
			lineHeight: "base",
			overflowX: "hidden",
		},
		a: {
			color: mode("gray.100", "gray.900")(props),
			fontFamily: "DM Sans",
			_hover: {
				transition: "all 0.4s",
				filter: "opacity(0.8)",
				textDecoration: "none !important",
			},
		},
		WebkitFontSmoothing: "antialiased",
		scrollBehavior: "smooth",
		"&::-webkit-scrollbar": {
			w: "6px",
			bg: mode("gray.900", "gray.100")(props),
		},
		"&::-webkit-scrollbar-thumb": {
			bg: mode("gray.700", "gray.900")(props),
			borderRadius: "2px",
		},
		"*::placeholder": {
			color: mode("light.500", "gray.400")(props),
		},
	}),
};

const config: ThemeConfig = {
	initialColorMode: "system",
	useSystemColorMode: true,
};

const theme = extendTheme({
	config,
	styles,
	colors,
	fonts,
});

export default theme;
