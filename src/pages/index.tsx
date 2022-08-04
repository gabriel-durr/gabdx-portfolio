import {
	Box,
	Flex,
	Image,
	Stack,
	Text,
	VStack,
	Container,
} from "@chakra-ui/react";
import type {NextPage} from "next";

const Home: NextPage = () => {
	return (
		<Flex as="main" h="100vh" justify="center">
			<Flex
				justify="center"
				as="section"
				w="full"
				h="full"
				maxW="container.sm">
				<VStack mt="120" spacing="20">
					<Box px="1rem">
						<Image
							src="/snoopF.jpg"
							alt="Imagem do Snoop deitado"
							borderRadius="2%"
							width="500px"
						/>
					</Box>

					<Stack px="4" wordBreak="break-word">
						<Text>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Porro reiciendis, cupiditate quasi temporibus,
							facere id autem officia quibusdam odio delectus
							veniam perspiciatis, hic cum libero rerum maiores
							molestias ea similique. Lorem ipsum, dolor sit amet
							consectetur adipisicing elit. Aspernatur fuga
							impedit cum ad vero, doloremque maiores quae,
							aliquam temporibus cupiditate reprehenderit delectus
							dolorum natus at optio necessitatibus pariatur
							cumque voluptas? Lorem ipsum dolor, sit amet
							consectetur adipisicing elit. Exercitationem omnis
							hic recusandae non, necessitatibus facere molestias
							veniam maxime fugiat possimus nesciunt atque harum
							provident rerum libero alias amet minus nihil!
						</Text>
						<Text>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Porro reiciendis, cupiditate quasi temporibus,
							facere id autem officia quibusdam odio delectus
							veniam perspiciatis, hic cum libero rerum maiores
							molestias ea similique. Lorem ipsum, dolor sit amet
							consectetur adipisicing elit. Aspernatur fuga
							impedit cum ad vero, doloremque maiores quae,
							aliquam temporibus cupiditate reprehenderit delectus
							dolorum natus at optio necessitatibus pariatur
							cumque voluptas? Lorem ipsum dolor, sit amet
							consectetur adipisicing elit. Exercitationem omnis
							hic recusandae non, necessitatibus facere molestias
							veniam maxime fugiat possimus nesciunt atque harum
							provident rerum libero alias amet minus nihil!
						</Text>
						<Text>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Porro reiciendis, cupiditate quasi temporibus,
							facere id autem officia quibusdam odio delectus
							veniam perspiciatis, hic cum libero rerum maiores
							molestias ea similique. Lorem ipsum, dolor sit amet
							consectetur adipisicing elit. Aspernatur fuga
							impedit cum ad vero, doloremque maiores quae,
							aliquam temporibus cupiditate reprehenderit delectus
							dolorum natus at optio necessitatibus pariatur
							cumque voluptas? Lorem ipsum dolor, sit amet
							consectetur adipisicing elit. Exercitationem omnis
							hic recusandae non, necessitatibus facere molestias
							veniam maxime fugiat possimus nesciunt atque harum
							provident rerum libero alias amet minus nihil!
						</Text>
						<Text>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Porro reiciendis, cupiditate quasi temporibus,
							facere id autem officia quibusdam odio delectus
							veniam perspiciatis, hic cum libero rerum maiores
							molestias ea similique. Lorem ipsum, dolor sit amet
							consectetur adipisicing elit. Aspernatur fuga
							impedit cum ad vero, doloremque maiores quae,
							aliquam temporibus cupiditate reprehenderit delectus
							dolorum natus at optio necessitatibus pariatur
							cumque voluptas? Lorem ipsum dolor, sit amet
							consectetur adipisicing elit. Exercitationem omnis
							hic recusandae non, necessitatibus facere molestias
							veniam maxime fugiat possimus nesciunt atque harum
							provident rerum libero alias amet minus nihil!
						</Text>
						<Text>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Porro reiciendis, cupiditate quasi temporibus,
							facere id autem officia quibusdam odio delectus
							veniam perspiciatis, hic cum libero rerum maiores
							molestias ea similique. Lorem ipsum, dolor sit amet
							consectetur adipisicing elit. Aspernatur fuga
							impedit cum ad vero, doloremque maiores quae,
							aliquam temporibus cupiditate reprehenderit delectus
							dolorum natus at optio necessitatibus pariatur
							cumque voluptas? Lorem ipsum dolor, sit amet
							consectetur adipisicing elit. Exercitationem omnis
							hic recusandae non, necessitatibus facere molestias
							veniam maxime fugiat possimus nesciunt atque harum
							provident rerum libero alias amet minus nihil!
						</Text>
						<Text>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Porro reiciendis, cupiditate quasi temporibus,
							facere id autem officia quibusdam odio delectus
							veniam perspiciatis, hic cum libero rerum maiores
							molestias ea similique. Lorem ipsum, dolor sit amet
							consectetur adipisicing elit. Aspernatur fuga
							impedit cum ad vero, doloremque maiores quae,
							aliquam temporibus cupiditate reprehenderit delectus
							dolorum natus at optio necessitatibus pariatur
							cumque voluptas? Lorem ipsum dolor, sit amet
							consectetur adipisicing elit. Exercitationem omnis
							hic recusandae non, necessitatibus facere molestias
							veniam maxime fugiat possimus nesciunt atque harum
							provident rerum libero alias amet minus nihil!
						</Text>
					</Stack>
				</VStack>
			</Flex>
		</Flex>
	);
};

export default Home;
