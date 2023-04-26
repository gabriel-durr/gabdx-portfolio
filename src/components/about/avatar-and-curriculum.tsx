import { Curriculum } from "./curriculum";
import { AboutContentDataProps } from ".";

import NextImage from "next/image";
import { motion } from "framer-motion";

import {
	Box,
	Flex,
	Text,
	VStack,
	Heading,
	useColorModeValue,
} from "@chakra-ui/react";

type AvatarAndCurriculumProps = AboutContentDataProps;

export const AvatarAndCurriculum = ({
	avatar,
	curriculum,
	expertise,
	nameHeading,
}: AvatarAndCurriculumProps) => {
	const darkModeImage = useColorModeValue(avatar.light, avatar.dark);

	return (
		<Flex
			as={motion.div}
			w="full"
			align="center"
			justify="space-between"
			gap={{ base: "1.8rem", md: "2rem" }}
			mt="10px"
			mb={{ base: 4, md: 0 }}
			opacity="0"
			initial={{
				translateX: -200,
				opacity: 0,
			}}
			animate={{
				translateX: 0,
				opacity: 1,
				transition: {
					duration: 1.4,
				},
			}}>
			<VStack pl={8} align="center" spacing={0}>
				<Box
					boxSize={{ base: 24, md: 28 }}
					rounded="full"
					shadow="lg"
					borderWidth="3.5px"
					borderStyle="solid"
					borderColor="#ddd3c9c5"
					_light={{ borderColor: "darkblue.900" }}>
					<NextImage
						alt="Gabriel Dürr Profile"
						src={darkModeImage}
						width={400}
						height={400}
					/>
				</Box>

				<Heading
					as="h2"
					pos="relative"
					variant="secondary"
					whiteSpace="nowrap"
					_after={{
						content: `'${expertise}'`,
						pos: "absolute",
						display: "block",
						fontSize: 12,
						bottom: -5,
						left: -8,
						fontFamily: "heading",
						fontWeight: "normal",
					}}>
					{nameHeading}
				</Heading>
			</VStack>

			<Curriculum curriculum={curriculum} />
		</Flex>
	);
};
