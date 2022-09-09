import {
	Flex,
	Avatar,
	Box,
	useColorModeValue,
	Image,
	Link,
	Text,
	Heading,
} from "@chakra-ui/react";
import {MotionBox, MotionFlex} from "../styles/animation";
import NextLink from "next/link";
import * as prismicH from "@prismicio/helpers";

const ANIMATION_DURATION = 0.5;

const About = ({page}) => {
	console.log(page);

	const about = {
		curriculum: prismicH.asLink(page.curriculum),
		description: {
			name: page.description[0].text,
			prof: page.description[1].text,
			p1: page.description[2].text,
			p2: page.description[3].text,
		},
	};

	return (
		<Flex
			bg={useColorModeValue("#1d2236", "#fff")}
			color={useColorModeValue("gray.200", "gray.900")}
			boxShadow={useColorModeValue(
				"0px 1px 8px rgba(66, 74, 83, 0.423)",
				"0px 1px 2px rgba(9, 17, 28, 0.23)"
			)}
			rounded="md"
			direction={["column", "column", "row"]}
			justify="center"
			align="center"
			maxW="5xl"
			mt={{base: "none", md: "4rem"}}
			p={{base: 3, md: 2}}>
			<MotionFlex
				direction="column"
				align="center"
				gap="2rem"
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
						duration: ANIMATION_DURATION,
					},
				}}
				mb={[16, 16, "auto"]}>
				<MotionBox
					whileHover={{scale: 1.1}}
					rounded="full"
					shadow="lg"
					ml="17px">
					<Avatar
						size="2xl"
						showBorder={true}
						borderColor={useColorModeValue(
							"#ffffff2d",
							"darkblue.900"
						)}
						src="/avatar.png"
					/>
				</MotionBox>

				<NextLink href={about.curriculum} passHref>
					<Link
						target="_blank"
						shadow="md"
						textAlign="center"
						mb="10px"
						fontSize="0.7rem"
						color="orangeblue.50">
						CV
						<Image
							src="/curriculo.png"
							w="50px"
							h="47px"
							alt="Curriculum Download"
						/>
					</Link>
				</NextLink>
			</MotionFlex>
			<MotionFlex
				mt="10px"
				position="relative"
				ml={["auto", "auto", 16]}
				w={["90%", "90%", "80%"]}
				maxW="800px"
				opacity="0"
				justify="center"
				direction="column"
				initial={{
					opacity: 0,
					translateX: 150,
				}}
				animate={{
					opacity: 1,
					translateX: 0,
					transition: {
						duration: ANIMATION_DURATION,
					},
				}}>
				<Box p="0.4rem">
					<Heading
						as="h2"
						whiteSpace="nowrap"
						fontWeight="600"
						fontSize="3xl"
						color={useColorModeValue("#fff", "gray.900")}>
						{about.description.name}
					</Heading>
					<Text whiteSpace="nowrap" fontSize="0.9rem">
						{about.description.prof}
					</Text>
					<br />

					<Box>
						<Text mb="10px">{about.description.p1}</Text>
						<Text>{about.description.p2}</Text>
					</Box>
				</Box>
			</MotionFlex>
		</Flex>
	);
};

export default About;
