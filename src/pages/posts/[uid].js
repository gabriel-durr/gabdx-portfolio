import Head from "next/head";
import {Layout} from "../../components/Layout";
import {createClient} from "../../../prismicio";

import * as prismicH from "@prismicio/helpers";
import {Text} from "@chakra-ui/react";

const Post = ({page, menu}) => {
	return (
		<Layout menu={menu}>
			<Head>
				<title>Page | Gabriel Dürr Dev</title>
			</Head>
			<Text>{prismicH.asText(page.data.title)}</Text>
		</Layout>
	);
};

export default Post;

export async function getStaticProps({params, locale, previewData}) {
	const client = createClient({previewData});

	const page = await client.getByUID("post", params.uid, {lang: locale});
	const menu = await client.getSingle("menu", {lang: locale});
	// const footer = await client.getSingle("footer", {lang: locale});

	return {
		props: {
			page,
			menu,
		},
	};
}

export async function getStaticPaths() {
	const client = createClient();

	const pages = await client.getAllByType("post", {lang: "*"}, {});

	return {
		paths: pages.map(page => {
			return {
				params: {uid: page.uid},
				locale: page.lang,
			};
		}),
		fallback: false,
	};
}
