import {Flex, Avatar, Box, Container} from "@chakra-ui/react";
import {MotionBox, MotionFlex} from "../styles/animation";

const ANIMATION_DURATION = 0.5;

const About = () => {
	const color = "blue.400";

	return (
		<Flex
			direction={["column", "column", "row"]}
			maxW="5xl"
			p={{base: 5, md: 12}}>
			<MotionBox
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
				m="auto"
				mb={[16, 16, "auto"]}>
				<MotionBox whileHover={{scale: 1.1}} rounded="full" shadow="lg">
					<Avatar
						size="2xl"
						showBorder={true}
						borderColor={color}
						src="/avatar.png"
					/>
				</MotionBox>
			</MotionBox>
			<MotionFlex
				position="relative"
				ml={["auto", "auto", 16]}
				m={["auto", "initial"]}
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
				<Box as="h2" fontSize="larger" textAlign="left">
					Meu nome é{" "}
					<Box as="strong" fontWeight="600">
						Gabriel ,
					</Box>
					<br />
					<Box as="span" whiteSpace="nowrap">
						Sou Desenvolvedor Front-end{" "}
					</Box>{" "}
					<Box as="span" whiteSpace="nowrap">
						Moro no Brasil{" "}
					</Box>
					Meu objetivo é trazer soluções úteis e criativas, que
					melhorem a qualidade de vida das pessoas através do meu
					repertório em resolução de problemas, criação de sistemas,
					interfaces, etc.
				</Box>
			</MotionFlex>
		</Flex>
	);
};

export default About;
