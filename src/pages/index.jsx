import {Box, Image, Stack, Text, Heading} from "@chakra-ui/react";
import {createClient} from "../../prismicio";
import Head from "next/head";

import {Layout} from "../components/Layout";

import * as prismicH from "@prismicio/helpers";

const Home = ({page}) => {
	return (
		<Layout altLangs={page.alternate_languages}>
			<Stack
				as="main"
				maxW="container.md"
				align="center"
				justify="center"
				m="auto"
				spacing="28"
				w={["100%", "100%", "60%"]}>
				<Head>
					<title>Home | Gabriel Dürr Developer</title>
				</Head>
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
				</Text>
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
				</Text>
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
				</Text>
			</Stack>
		</Layout>
	);
};

export default Home;

export async function getStaticProps({locale, previewData}) {
	const client = createClient({previewData});

	const page = await client.getByUID("home", "home", {lang: locale});

	return {
		props: {
			page,
		},
	};
}
