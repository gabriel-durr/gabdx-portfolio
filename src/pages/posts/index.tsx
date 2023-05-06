import { Layout } from "@/layout";
import { createClient } from "@services/prismicio";
import { AllPosts } from "@components/articles/all-posts";
import { StarryRaysMotion } from "@components/about/starry-rays-motion";

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
			altLangs={page.alternate_languages}
			footerData={footerData}
		>
			<Stack
				as="main"
				maxW="container.md"
				justify="center"
				spacing={28}
				w={{ base: "full", md: "92%", lg: "60%" }}
			>
				<Head>
					<title>{page.data.title}</title>
				</Head>

				<AllPosts postData={postData} />
				<StarryRaysMotion />
			</Stack>
		</Layout>
	);
};

export async function getStaticProps({
	locale,
	previewData,
}: GetStaticPropsContext) {
	const client = createClient({ previewData });

	const posts = await client.getAllByType("post", {
		lang: locale,
		orderings: [
			{ field: "document.first_publication_date", direction: "desc" },
		],
	});
	const page = await client.getSingle("postindex", { lang: locale });
	const menu = await client.getSingle("menu", { lang: locale });
	const footer = await client.getSingle("footer", { lang: locale });

	const { menuItems, footerData } = layoutFormat({ menu, footer });

	const postData = posts.map(({ data, uid, tags, first_publication_date }) => ({
		uid,
		tags,
		title: data.title,
		image: data.image,
		description: prismicH.asText(data.description),
		date: new Date(first_publication_date).toLocaleString("pt-br", {
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
