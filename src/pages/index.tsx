import {Box, Container, Heading, Text} from "@chakra-ui/react";
import type {NextPage} from "next";
import {ColorModeSwitch} from "../components/ColorModeSwitch";

const Home: NextPage = () => {
	return (
		<Container>
			<Heading color="orangeblue.400">My portfolio</Heading>
			<ColorModeSwitch />

			<Box>
				<Text>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit.
					Cupiditate laboriosam necessitatibus quia totam dolores!
					Nisi esse unde alias natus fugiat asperiores provident
					accusantium assumenda, omnis repudiandae blanditiis
					reiciendis odit quaerat.
				</Text>
			</Box>
		</Container>
	);
};

export default Home;
