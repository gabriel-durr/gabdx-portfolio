import { ViewPostProps } from ".";

import { PrismicRichText } from "@prismicio/react";

import {
	Code,
	Text,
	Image,
	VStack,
	Heading,
	useColorModeValue,
} from "@chakra-ui/react";

type ContentProps = Pick<ViewPostProps["postData"], "description">;

export const Content = ({ description }: ContentProps) => {
	const bgColorMode = useColorModeValue("gray.100", "gray.900");
	const borderHeaderMode = useColorModeValue("#eaa6a6c3", "red");
	const headerColorMode = useColorModeValue("whiteAlpha.800", "gray.800");

	return (
		<VStack
			align="flex-start"
			p="1rem"
			spacing={8}
			fontSize={["0.87rem", "1rem"]}
			color={bgColorMode}>
			<PrismicRichText
				field={description}
				components={{
					heading3: ({ children }) => (
						<Heading
							as="h3"
							fontSize={{
								base: "1.028rem",
								md: "1.22rem",
							}}
							fontWeight="bold"
							textTransform="capitalize"
							color={headerColorMode}
							borderBottom={`1px solid ${borderHeaderMode}`}>
							{children}
						</Heading>
					),
					heading6: ({ children }) => (
						<Heading
							as="h6"
							fontSize={{ base: "0.91rem", md: "1.1rem" }}
							fontWeight="bold">
							{children}
						</Heading>
					),
					paragraph: ({ children }) => <Text>{children}</Text>,
					preformatted: ({ children }) => (
						<Code color="goldenrod" my="10px" p="12px" colorScheme="orange">
							{children}
						</Code>
					),
					image: ({ node }) => (
						<Image
							w={{ base: "100%", md: "78%" }}
							alt={node?.alt ?? ""}
							src={node?.url ?? ""}
						/>
					),
				}}
			/>
		</VStack>
	);
};
