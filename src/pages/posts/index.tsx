import { Layout } from "@/layout";
import { AllPosts } from "@components/articles/all-posts";
import { createClient } from "@services/prismicio";

import Head from "next/head";
import * as prismicH from "@prismicio/helpers";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";

import { Stack } from "@chakra-ui/react";
import { layoutFormat } from "@root/src/utils/layout-formated";

type PostsProps = InferGetStaticPropsType<typeof getStaticProps>;

const Posts = ({ postData, page, menuItems, footerData }: PostsProps) => {
	return (
		<Layout
			menuItems={menuItems}
			altLang={page.alternate_languages}
			footerData={footerData}>
			<Stack
				as="main"
				maxW="container.md"
				justify="center"
				spacing={28}
				w={{ base: "100%", md: "92%", lg: "60%" }}>
				<Head>
					<title>{page.data.title}</title>
				</Head>

				<AllPosts postData={postData} />
			</Stack>
		</Layout>
	);
};

export async function getStaticProps({
	locale,
	previewData,
}: GetStaticPropsContext) {
	const client = createClient({ previewData });

	const posts = await client.getAllByType("post", { lang: locale });
	const page = await client.getSingle("postindex", { lang: locale });
	const menu = await client.getSingle("menu", { lang: locale });
	const footer = await client.getSingle("footer", { lang: locale });

	const { menuItems, footerData } = layoutFormat({ menu, footer });

	const postData = posts.map(({ data, uid }) => ({
		uid,
		title: data.title,
		tags: data.tag.map((tag: any) => tag.text),
		image: data.image,
		description: prismicH.asText(data.description),
		date: prismicH.asDate(data.date!).toLocaleString("pt-br", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		}),
	}));

	return {
		props: {
			page,
			postData,
			menuItems,
			footerData,
		},
	};
}

export default Posts;
