import {
	Box,
	useColorModeValue,
	VStack,
	Text,
	AspectRatio,
	HStack,
	Tag,
	Icon,
	Flex,
	Link,
	Tooltip,
} from "@chakra-ui/react";
import {LazyImage} from "./LazyImage";
import NextLink from "next/link";
// Here we have used react-icons package for the icons

import {FiZap} from "react-icons/fi";

export const RepositoryCard = props => {
	const {title, cover, techStack, url} = props;

	return (
		<VStack
			rounded="xl"
			borderWidth="1px"
			bg={useColorModeValue("gray.800", "white")}
			borderColor={useColorModeValue("gray.100", "gray.700")}
			_hover={{
				shadow: "lg",
				textDecoration: "none",
			}}
			overflow="hidden"
			align="start"
			spacing={0}>
			<Box position="relative" w="100%">
				<AspectRatio
					ratio={1.85 / 1}
					w="100%"
					borderBottomWidth="1px"
					borderColor={useColorModeValue("gray.100", "gray.700")}>
					<NextLink href={url} passHref>
						<Link
							fontSize="sm"
							noOfLines={1}
							fontWeight="600"
							align="left">
							<LazyImage src={cover} />
						</Link>
					</NextLink>
				</AspectRatio>
			</Box>

			<VStack py={2} px={[2, 4]} spacing={1} align="start" w="100%">
				<Flex justifyContent="space-between" width="100%">
					<Tooltip hasArrow label="Github | Web Link" placement="top">
						<HStack>
							<Icon
								as={FiZap}
								boxSize="0.9em"
								mt="1px"
								color={useColorModeValue(
									"yellow",
									"yellow.400"
								)}
							/>
							<NextLink href={url} passHref>
								<Link
									fontSize="lg"
									noOfLines={1}
									fontWeight="600"
									align="left">
									{title}
								</Link>
							</NextLink>
						</HStack>
					</Tooltip>
				</Flex>
				<Flex justifyContent="space-between" width="100%">
					<Box>
						<HStack spacing="1" noOfLines={0}>
							{techStack.map((tech, index) => (
								<Tag
									key={index}
									size="sm"
									color="#000"
									colorScheme="cyan">
									<Text fontSize={["0.55rem", "0.9rem"]}>
										{tech}
									</Text>
								</Tag>
							))}
						</HStack>
					</Box>
				</Flex>
			</VStack>
		</VStack>
	);
};
