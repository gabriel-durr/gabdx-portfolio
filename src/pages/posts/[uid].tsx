import { Layout } from "@/layout";
import { createClient } from "@services/prismicio";
import { layoutFormat } from "@/utils/layout-formated";
import { ViewPost } from "@components/articles/view-post";

import Head from "next/head";
import { predicate } from "@prismicio/client";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";

import { Stack } from "@chakra-ui/react";

type PageParams = { uid: string };

type PostProps = InferGetStaticPropsType<typeof getStaticProps>;

const Posts = ({ postData, menuItems, footerData }: PostProps) => {
	return (
		<Layout
			altLangs={postData.altLang}
			menuItems={menuItems}
			footerData={footerData}>
			<Head>
				<title>{postData.title}</title>
			</Head>

			<Stack
				as="main"
				mt={{ base: "2px", md: "32px" }}
				maxW="container.md"
				spacing={4}
				align="center"
				w={["full", "98%", "99%", "60%"]}>
				<ViewPost postData={postData} />
			</Stack>
		</Layout>
	);
};

export async function getStaticProps({
	params,
	locale,
	previewData,
}: GetStaticPropsContext<PageParams>) {
	const client = createClient({ previewData });

	const uuid = params?.uid ?? "";

	const page = await client.getByUID("post", uuid, { lang: locale });
	const menu = await client.getSingle("menu", { lang: locale });
	const footer = await client.getSingle("footer", { lang: locale });
	const { menuItems, footerData } = layoutFormat({ menu, footer });

	const latestPosts = await client.getAllByType("post", {
		lang: locale,
		predicates: [predicate.not("my.post.uid", uuid)],
		limit: 2,
		orderings: [
			{ field: "document.first_publication_date", direction: "desc" },
		],
	});

	const postData = {
		lang: page.lang,
		altLang: page.alternate_languages,
		image: page.data.image,
		title: page.data.title,
		createdAt: new Date(page.first_publication_date).toLocaleString(locale),
		tags: page.data.tag.map((tag: any) => tag.text),
		description: page.data.description,
		latestPosts,
	};

	return {
		props: {
			page,
			postData,
			menuItems,
			footerData,
		},
	};
}

export async function getStaticPaths() {
	const client = createClient();

	const pages = await client.getAllByType("post", { lang: "*" });

	return {
		paths: pages.map(({ uid, lang }) => ({
			params: { uid },
			locale: lang,
		})),
		fallback: false,
	};
}

export default Posts;
