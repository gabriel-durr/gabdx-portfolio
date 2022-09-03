import Head from "next/head";
import {Layout} from "../components/Layout";

import * as prismicH from "@prismicio/helpers";

import {createClient} from "../../prismicio";

const Page = ({page}) => {
	return (
		<Layout altLangs={page.alternate_languages}>
			<Head>
				<title>Page | Gabriel Dürr Dev</title>
			</Head>
		</Layout>
	);
};

export default Page;

export async function getStaticProps({params, locale, previewData}) {
	const client = createClient({previewData});

	const page = await client.getByUID("page", params.uid, {lang: locale});

	return {
		props: {
			page,
			navigation,
		},
	};
}

export async function getStaticPaths() {
	const client = createClient();

	const pages = await client.getAllByType("page", {lang: "*"});

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
