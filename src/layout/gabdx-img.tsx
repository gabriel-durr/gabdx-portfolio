import NextImage from "next/image";

import { Box, useColorModeValue } from "@chakra-ui/react";

export const GabdxImg = () => {
	const homeBgMode = useColorModeValue("/gabd-light.png", "/gabd-dark.png");

	return (
		<Box
			pos="absolute"
			zIndex="-1"
			boxSize={{ base: "19.8rem", sm: "22.8rem", md: "74rem" }}
			bottom="28">
			<NextImage
				fill
				src={homeBgMode}
				alt="Imagem Gabd. Robotz"
				sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw"
			/>
		</Box>
	);
};
