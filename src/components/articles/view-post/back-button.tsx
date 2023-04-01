import { ViewPostProps } from ".";

import NextLink from "next/link";

import { Link, Image, useColorModeValue, HStack, Text } from "@chakra-ui/react";

type BackButtonProps = Pick<ViewPostProps["postData"], "lang">;

export const BackButton = ({ lang }: BackButtonProps) => {
	const darkModeColor = useColorModeValue("whiteAlpha.700", "gray.700");

	return (
		<Link as={NextLink} href={`/${lang}/posts`} color={darkModeColor}>
			<HStack
				spacing={1}
				boxSize={{ base: "1rem", md: "1.2rem" }}
				align="center">
				<Image
					bg="#fff"
					rounded="full"
					alt="Back Page Button"
					src="/back.svg"
					w="100%"
				/>
				<Text
					shadow="sm"
					textTransform="uppercase"
					fontWeight="thin"
					fontSize={{ base: "0.8rem", md: "1rem" }}>
					{lang === "pt-br" ? "voltar" : "back"}
				</Text>
			</HStack>
		</Link>
	);
};
