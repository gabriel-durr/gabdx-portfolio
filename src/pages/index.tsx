import {Box, Flex, Image, Stack, Text, Heading} from "@chakra-ui/react";
import type {NextPage} from "next";

const Home: NextPage = () => {
	return (
		<Flex h="100vh" w="100vw" justify="center">
			<Stack
				as="main"
				align="center"
				maxW="container.md"
				mt="15%"
				spacing="10">
				<Box px="1rem">
					<Image
						src="/snoopF.jpg"
						alt="Imagem do Snoop deitado"
						borderRadius="2%"
						width="500px"
					/>
				</Box>

				<Heading>About me</Heading>

				<Text p="2rem">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Porro reiciendis, cupiditate quasi temporibus, facere id
					autem officia quibusdam odio delectus veniam perspiciatis,
					hic cum libero rerum maiores molestias ea similique. Lorem
					ipsum, dolor sit amet consectetur adipisicing elit.
					Aspernatur fuga impedit cum ad vero, doloremque maiores
					quae, aliquam temporibus cupiditate reprehenderit delectus
					dolorum natus at optio necessitatibus pariatur cumque
					voluptas? Lorem ipsum dolor, sit amet consectetur
					adipisicing elit. Exercitationem omnis hic recusandae non,
					necessitatibus facere molestias veniam maxime fugiat
					possimus nesciunt atque harum provident rerum libero alias
					amet minus nihil!!!
				</Text>
			</Stack>
		</Flex>
	);
};

export default Home;
