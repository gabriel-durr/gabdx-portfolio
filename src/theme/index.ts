import { fonts } from "./fonts";
import { colors } from "./colors";
import { globalStyles as styles } from "./global-styles";

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
	styles,
	colors,
	fonts,
});

export default theme;
