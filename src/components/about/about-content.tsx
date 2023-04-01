import { Greeting } from "./greeting";
import { AboutContentDataProps } from ".";
import { TechsAnimation } from "./techs-animation";

import { motion } from "framer-motion";

import {
	Box,
	Text,
	VStack,
	Heading,
	useColorModeValue,
} from "@chakra-ui/react";

type AboutContentProps = {
	aboutContentData: AboutContentDataProps;
	lang: string;
};

export const AboutContent = ({ aboutContentData, lang }: AboutContentProps) => {
	return (
		<VStack
			as={motion.div}
			mt={{ base: "0px", md: "10px" }}
			position="relative"
			w={["90%", "80%"]}
			justify="center"
			maxW="800px"
			opacity={0}
			initial={{
				opacity: 0,
				translateX: 30,
			}}
			animate={{
				opacity: 1,
				translateX: 0,
				transition: {
					duration: 1,
				},
			}}
			borderBottom="1px"
			borderColor={useColorModeValue("whiteAlpha.500", "myColors.")}
			borderStyle="dotted">
			<VStack p=".4rem" w="100%" align="flex-start" pl=".4rem">
				<Heading
					as="h2"
					whiteSpace="nowrap"
					fontWeight={600}
					fontSize={["xl", "2xl"]}
					color={useColorModeValue("myColors.white", "gray.900")}>
					{aboutContentData.nameHeading}
				</Heading>
				<Text fontSize={["0.74rem", "0.84rem"]}>
					{aboutContentData.expertise}
				</Text>

				<Box fontSize={["0.87rem", "1rem"]}>
					<Greeting lang={lang} />
					<Text mb="10px">{aboutContentData.description}</Text>
				</Box>
				<TechsAnimation />
			</VStack>
		</VStack>
	);
};
