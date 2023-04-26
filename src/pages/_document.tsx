import theme from "@theme";
import { Html, Head, Main, NextScript } from "next/document";

import { ColorModeScript } from "@chakra-ui/react";

export default function Document() {
	return (
		<Html>
			<Head>
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />

				<link
					href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Qwitcher+Grypen:wght@400;700&family=Raleway:wght@100;300;400;700&family=Dosis:wght@300;400&display=swap"
					rel="stylesheet"
				/>

				<link rel="shortcut icon" href="/favicon.png" />
			</Head>
			<body>
				<ColorModeScript initialColorMode={theme.config.initialColorMode} />
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
