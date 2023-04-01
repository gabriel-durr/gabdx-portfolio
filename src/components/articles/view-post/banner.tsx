import { ViewPostProps } from ".";

import NextImage from "next/image";

import { Box, useColorModeValue } from "@chakra-ui/react";

type BannerProps = Pick<ViewPostProps["postData"], "image">;

export const Banner = ({ image }: BannerProps) => {
	const darkModeBg = useColorModeValue(
		"rgba(254,254,255,.1)",
		"rgba(25,25,25,.1)"
	);

	const darkModeBorder = useColorModeValue(
		"rgba(254,254,255,.6)",
		"rgba(25,25,25,.6)"
	);

	return (
		<Box
			pos="relative"
			w="100%"
			h={{ base: "12rem", md: "20rem", lg: "21.25rem" }}
			border={`${darkModeBorder} dotted 1px`}
			p="0 0 .5rem 0"
			backdropFilter="auto"
			backdropBlur="4px"
			bg={darkModeBg}
			rounded="lg">
			<NextImage
				fill
				src={image?.url!}
				alt={image.alt ?? ""}
				sizes="(max-width: 600px) 92vw, (max-width: 960px) 40vw"
			/>
		</Box>
	);
};
