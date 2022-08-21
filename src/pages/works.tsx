import type {NextPage} from "next";
import {Flex, Stack, Text, Heading} from "@chakra-ui/react";

const Works: NextPage = () => {
	return (
		<Flex h="100vh" w="100vw" justify="center">
			<Stack
				as="main"
				align="center"
				maxW="container.md"
				my="15%"
				spacing="10">
				<Heading>Works</Heading>
				<Text>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Similique minus necessitatibus temporibus autem tempore
					nobis quo quibusdam laudantium laboriosam in nostrum id ex,
					a recusandae ipsa sit eaque, velit nemo.
				</Text>
			</Stack>
		</Flex>
	);
};

export default Works;
