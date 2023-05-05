import theme from "@theme";
import { linkResolver, repositoryName } from "@services/prismicio";

import NextLink from "next/link";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import { PrismicPreview } from "@prismicio/next";
import { PrismicProvider } from "@prismicio/react";

import { ChakraProvider } from "@chakra-ui/react";

function App({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>
			<PrismicProvider
				linkResolver={linkResolver}
				internalLinkComponent={({ href, children, locale, ...props }: any) => (
					<NextLink href={href} locale={locale} {...props}>
						{children}
					</NextLink>
				)}
			>
				<PrismicPreview repositoryName={repositoryName}>
					<ChakraProvider theme={theme}>
						<Component {...pageProps} />
					</ChakraProvider>
				</PrismicPreview>
			</PrismicProvider>
		</SessionProvider>
	);
}

export default App;
