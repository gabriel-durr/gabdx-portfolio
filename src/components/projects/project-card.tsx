import { CardImage } from "./card-image";
import { CardHeader } from "./card-header";
import { TechsStack } from "./techs-stack";

import { useColorModeValue, VStack } from "@chakra-ui/react";

export type ProjectCardProps = {
	lang: string;
	title: string;
	image: string;
	techs: any[];
	githubLink?: string | null;
	deployLink?: string | null;
};

export const ProjectCard = ({
	lang,
	image,
	title,
	techs,
	deployLink,
	githubLink,
}: ProjectCardProps) => {
	return (
		<VStack
			rounded="xl"
			bg={useColorModeValue("whiteAlpha.900", "blackAlpha.900")}
			shadow="sm"
			w={{ base: "94%", md: "400px" }}
			h={{ base: "320px", md: "328px" }}
			backdropFilter="auto"
			backdropBlur="6px"
			p={{ base: "5px", md: "10px" }}
			spacing={0}
			border={`2px solid ${useColorModeValue("#0c166b1f", "#ffffffda")}`}
			_hover={{
				shadow: "lg",
				textDecoration: "none",
			}}
			overflow="hidden">
			<CardImage src={image} alt={title} />

			<VStack py={2} px={4} spacing={4} align="start" w="100%">
				<CardHeader
					lang={lang}
					title={title}
					githubLink={githubLink}
					deployLink={deployLink}
				/>
				<TechsStack techs={techs} />
			</VStack>
		</VStack>
	);
};
