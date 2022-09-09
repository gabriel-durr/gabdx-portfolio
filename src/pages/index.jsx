import {Box, Image, Stack, Text, Heading} from "@chakra-ui/react";
import {createClient} from "../../prismicio";
import Head from "next/head";

import {Layout} from "../components/Layout";
import About from "../components/About";

import * as prismicH from "@prismicio/helpers";

const Home = ({page, menu}) => {
	return (
		<Layout menu={menu}>
			<Stack
				as="main"
				maxW="container.md"
				align="center"
				w={["100%", "100%", "60%"]}>
				<Head>
					<title>Home | Gabriel Dürr Developer</title>
				</Head>

				<About />
			</Stack>
		</Layout>
	);
};

export default Home;

export async function getStaticProps({locale, previewData}) {
	const client = createClient({previewData});

	const page = await client.getByUID("home", "home", {lang: locale});
	const menu = await client.getSingle("menu", {lang: locale});

	return {
		props: {
			page,
			menu,
		},
	};
}
