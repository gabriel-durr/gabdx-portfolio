import {Box, Container, Flex, Heading, Text} from "@chakra-ui/react";
import type {NextPage} from "next";
import {ToggleButtonIcon} from "../components/ToggleButtonIcon";

const Home: NextPage = () => {
	return (
		<Container>
			<Heading color="orangeblue.400">My portfolio</Heading>

			<Flex direction="column" gap="40">
				<Text>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit.
					Cupiditate laboriosam necessitatibus quia totam dolores!
					Nisi esse unde alias natus fugiat asperiores provident
					accusantium assumenda, omnis repudiandae blanditiis
					reiciendis odit quaerat.
				</Text>
				<ToggleButtonIcon />
			</Flex>
		</Container>
	);
};

export default Home;
