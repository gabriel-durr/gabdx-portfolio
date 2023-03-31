import { AboutContentDataProps } from ".";
import aCvDownload from "@animations/cv-download.json";

import Lottie from "lottie-react";
import NextLink from "next/link";

import { Text, Image, Link } from "@chakra-ui/react";

type CurriculumProps = Pick<AboutContentDataProps, "curriculum">;

export const Curriculum = ({ curriculum }: CurriculumProps) => {
	return (
		<Link
			as={NextLink}
			href={curriculum}
			pos="relative"
			w={{ base: "72px", md: "80px" }}
			target="_blank"
			fontSize=".7rem"
			_hover={{
				fontWeight: "bolder",
				color: "myColors.satinOrange",
			}}>
			<Text
				color="myColors.satinOrange"
				fontWeight="bold"
				pos="absolute"
				right={4}
				top={-1}>
				CV
			</Text>
			<Image src="/curriculo.svg" w="100%" alt="Curriculum Download" />
			<Lottie
				animationData={aCvDownload}
				style={{ width: "80%", bottom: -22, left: "20%", position: "absolute" }}
			/>
		</Link>
	);
};
