import { PostDataProps } from ".";

import NextLink from "next/link";
import NextImage from "next/image";

import { Box, Link, useColorModeValue } from "@chakra-ui/react";

type ImagePostProps = Pick<PostDataProps["postData"][0], "image" | "uid">;

export const ImagePost = ({ uid, image }: ImagePostProps) => {
	const darkModeBgRadialGradient = useColorModeValue(
		"radial(54% 54%,#0000 98%,#ce9e0040)",
		"radial(54% 54%,#0000 98%,#767bc315)"
	);

	return (
		<Box pos="relative" w={{ base: "full", md: "42%" }} h="full">
			<Link as={NextLink} href={`/posts/${uid}`}>
				<Box pos="relative" top={4} h="80%" w="full">
					<NextImage
						fill
						alt={image?.alt ?? ""}
						src={image?.url ?? ""}
						style={{ objectFit: "cover" }}
					/>
				</Box>
			</Link>

			<Box
				zIndex={-1}
				pos="absolute"
				top={0}
				w="full"
				h="full"
				bgGradient={darkModeBgRadialGradient}
				backgroundSize="12px 12px"
				opacity={0.9}
			/>
		</Box>
	);
};
