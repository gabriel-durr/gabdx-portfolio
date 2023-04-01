import { ProjectCardProps } from "./project-card";

import { Tag, Text, HStack, useColorModeValue } from "@chakra-ui/react";

type TechStackProps = Pick<ProjectCardProps, "techs">;

export const TechsStack = ({ techs }: TechStackProps) => {
	const colorMode = useColorModeValue("gray.900", "gray.100");
	const bgScrollbarMode = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
	const bgScrollThumbMode = useColorModeValue(
		"myColors.black",
		"myColors.white"
	);
	const borderTechMode = useColorModeValue("#00000010", "#f5eeee10");

	return (
		<HStack
			w="98%"
			justify="start"
			overflowX="scroll"
			spacing={2}
			pb="8px"
			sx={{
				"&::-webkit-scrollbar": {
					h: "2px",
					bg: bgScrollbarMode,
					color: "red",
				},

				"&::-webkit-scrollbar-thumb": {
					bg: bgScrollThumbMode,
					borderRadius: "24px",
				},
			}}>
			{techs.map(tech => (
				<Tag
					border={`1px solid ${borderTechMode}`}
					userSelect="none"
					whiteSpace="nowrap"
					minW="min-content"
					size="sm"
					key={tech}
					color={colorMode}
					colorScheme="cyan">
					<Text fontSize={["0.55rem", "0.9rem"]}>{tech}</Text>
				</Tag>
			))}
		</HStack>
	);
};
