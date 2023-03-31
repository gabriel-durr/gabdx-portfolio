import NextImage from "next/image";

import { AspectRatio, useColorModeValue } from "@chakra-ui/react";

type ImageProps = {
	src: string;
	alt: string;
};

export const CardImage = ({ src, alt }: ImageProps) => {
	return (
		<AspectRatio
			ratio={1.85 / 1}
			position="relative"
			w="100%"
			borderBottomWidth="1px"
			borderColor={useColorModeValue("gray.700", "gray.100")}>
			<NextImage
				src={src}
				fill
				alt={`Imagem do projeto: ${alt}`}
				sizes="(max-width: 600px) 100vw, (max-width: 960px) 20vw"
			/>
		</AspectRatio>
	);
};
