import Head from "next/head";
import NextLink from "next/link";
import {createClient} from "../../../prismicio";
import * as prismicH from "@prismicio/helpers";

import {Layout} from "../../components/Layout";
import {Flex, Link, VStack} from "@chakra-ui/react";

const Posts = ({page, menu}) => {
	return (
		<Layout menu={menu}>
			<Flex
				as="main"
				maxW="container.md"
				justify="center"
				spacing="28"
				w={["100%", "100%", "60%"]}>
				<Head>
					<title>Home | Gabriel Dürr Developer</title>
				</Head>

				<VStack>
					{page.map((post, i) => (
						<NextLink key={i} href={`/posts/${post.uid}`} passHref>
							<Link
								color="purple.900"
								_hover={{
									transition: "all 0.5s",
									filter: "brightness(0.8)",
								}}>
								{prismicH.asText(post.data.title)}
							</Link>
						</NextLink>
					))}
				</VStack>
			</Flex>
		</Layout>
	);
};

export default Posts;

export async function getStaticProps({locale, previewData}) {
	const client = createClient({previewData});

	const page = await client.getAllByType("post", {lang: locale});
	const menu = await client.getSingle("menu", {lang: locale});
	// const footer = await client.getSingle("footer", {lang: locale});

	return {
		props: {
			page,
			menu,
		},
	};
}
