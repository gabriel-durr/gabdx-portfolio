import { Curriculum } from "./curriculum";
import { AboutContentDataProps } from ".";

import { motion } from "framer-motion";

import { Flex, Box, Image, useColorModeValue } from "@chakra-ui/react";

type AvatarAndCurriculumProps = AboutContentDataProps;

export const AvatarAndCurriculum = ({
	avatar,
	curriculum,
}: AvatarAndCurriculumProps) => {
	const darkModeImage = useColorModeValue(avatar.dark, avatar.light);

	const darkModeBorder = useColorModeValue("#ddd3c9c5", "darkblue.900");

	return (
		<Flex
			as={motion.div}
			align="center"
			w={{ base: "74%", md: "64%", lg: "68%" }}
			justify="space-between"
			gap={{ base: "1.8rem", md: "2rem" }}
			mt="10px"
			opacity="0"
			initial={{
				translateX: -150,
				opacity: 0,
			}}
			animate={{
				translateX: 0,
				opacity: 1,
				transition: {
					duration: 0.5,
				},
			}}
			mb={[16, 16, "auto"]}>
			<Box
				as={motion.div}
				whileHover={{ scale: 1.04 }}
				boxSize={{ base: "6.8rem", md: "8.8rem" }}
				rounded="full"
				shadow="lg"
				borderWidth="3.5px"
				borderStyle="solid"
				borderColor={darkModeBorder}>
				<Image alt="Gabriel Dürr Profile" src={darkModeImage} />
			</Box>

			<Curriculum curriculum={curriculum} />
		</Flex>
	);
};
