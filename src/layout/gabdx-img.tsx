import NextImage from "next/image";

import { Box, useColorModeValue } from "@chakra-ui/react";

export const GabdxImg = () => {
	const homeBgSwitch = useColorModeValue("/gabd-dark.png", "/gabd-light.png");

	return (
		<Box
			pos="absolute"
			zIndex="-1"
			boxSize={{ base: "19.8rem", sm: "22.8rem", md: "74rem" }}
			bottom="28">
			<NextImage
				fill
				src={homeBgSwitch}
				alt="Imagem Gabd. Robotz"
				sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw"
			/>
		</Box>
	);
};
