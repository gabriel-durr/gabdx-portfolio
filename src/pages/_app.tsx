import theme from "@theme";
import { linkResolver, repositoryName } from "@services/prismicio";

import NextLink from "next/link";
import { AppProps } from "next/app";

import { PrismicPreview } from "@prismicio/next";
import { PrismicProvider } from "@prismicio/react";

import { ChakraProvider } from "@chakra-ui/react";

function App({ Component, pageProps }: AppProps) {
	return (
		<PrismicProvider
			linkResolver={linkResolver}
			internalLinkComponent={({ children, href, ...rest }) => (
				<NextLink href={href} {...rest}>
					{children}
				</NextLink>
			)}>
			<PrismicPreview repositoryName={repositoryName}>
				<ChakraProvider theme={theme}>
					<Component {...pageProps} />
				</ChakraProvider>
			</PrismicPreview>
		</PrismicProvider>
	);
}

export default App;
