import {
	Flex,
	Avatar,
	Box,
	useColorModeValue,
	Image,
	Link,
} from "@chakra-ui/react";
import {MotionBox, MotionFlex} from "../styles/animation";
import NextLink from "next/link";

const ANIMATION_DURATION = 0.5;

const About = () => {
	const color = "darkblue.900";

	return (
		<Flex
			bg="#fff"
			color="gray.900"
			boxShadow={useColorModeValue(
				"0px 1px 10px rgb(160, 174, 192)",
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
						borderColor={color}
						src="/avatar.png"
					/>
				</MotionBox>
				<NextLink href="#" passHref>
					<Link>
						<Image
							boxShadow="0px 1px 5px rgba(9, 17, 28, 0.459)"
							src="/curriculo.png"
							w="55px"
							h="52px"
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
					<Box
						as="h2"
						whiteSpace="nowrap"
						fontWeight="600"
						fontSize="3xl">
						Gabriel Dürr M.
					</Box>
					<Box whiteSpace="nowrap" fontSize="0.9rem">
						( Desenvolvedor de Software, UX|UI )
					</Box>
					<br />

					<Box>
						Minha atuação como desenvolvedor é mais voltada ao
						Front-end, realizando Freelances, projetos Voluntários,
						entre outros projetos. Meu objetivo é trazer soluções
						úteis e criativas, que melhorem a qualidade de vida das
						pessoas através do meu repertório em resolução de
						problemas, criação de sistemas, interfaces, etc.
					</Box>
				</Box>
			</MotionFlex>
		</Flex>
	);
};

export default About;
