import { CardImage } from "./card-image";
import { CardHeader } from "./card-header";
import { Tags } from "@components/tags";

import { VStack } from "@chakra-ui/react";

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
			bg="whiteAlpha.900"
			shadow="sm"
			p={{ base: "5px", md: "10px" }}
			w={{ base: "96%", sm: "94%", md: "400px" }}
			h={{ base: "300px", sm: "320px", md: "328px" }}
			backdropFilter="auto"
			backdropBlur="6px"
			spacing={0}
			overflow="hidden"
			border={"2px solid #0c166b1f"}
			_hover={{
				shadow: "lg",
				textDecoration: "none",
			}}
			_light={{ bg: "blackAlpha.900", border: "2px solid #ffffffda" }}>
			<CardImage src={image} alt={title} />

			<VStack py={2} px={4} spacing={4} align="start" w="full">
				<CardHeader
					lang={lang}
					title={title}
					githubLink={githubLink}
					deployLink={deployLink}
				/>
				<Tags
					tags={techs}
					containerWidth={{ base: "300px", sm: "330px", md: "352px" }}
					color="gray.900"
					bg="cyan.100"
					size="xs"
					border="1px solid"
					borderColor="#00000010"
					_light={{
						color: "gray.100",
						bg: "rgba(157, 236, 249, 0.16)",
						borderColor: "#f5eeee10",
					}}
				/>
			</VStack>
		</VStack>
	);
};
