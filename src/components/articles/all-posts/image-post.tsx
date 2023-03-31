import { PostDataProps } from ".";

import NextLink from "next/link";

import { HStack, Image, Box, Link, useColorModeValue } from "@chakra-ui/react";

type ImagePostProps = Pick<PostDataProps["postData"][0], "image" | "uid">;

export const ImagePost = ({ uid, image }: ImagePostProps) => {
	const darkModeBgRadialGradient = useColorModeValue(
		"radial(54% 54%,#0000 98%,#767bc315)",
		"radial(54% 54%,#0000 98%,#ce9e0040)"
	);

	return (
		<HStack
			flex={1}
			minH="250px"
			pos="relative"
			align="center"
			justify="center">
			<Link as={NextLink} href={`/posts/${uid}`}>
				<Image
					w="320px"
					h="170px"
					alt={image?.alt ?? ""}
					src={image?.url ?? ""}
				/>
			</Link>

			<Box zIndex={-1} w="100%" pos="absolute" h="80%">
				<Box
					bgGradient={darkModeBgRadialGradient}
					backgroundSize="25px 25px"
					opacity={1}
					minH="100%"
				/>
			</Box>
		</HStack>
	);
};
