import {Layout} from "@/layout";
import {About} from "@components/about";
import {Projects} from "@components/projects";
import {createClient} from "@services/prismicio";
import {layoutFormat} from "@utils/layout-formated";

import type {GetStaticPropsContext, InferGetStaticPropsType} from "next";

import {Heading, Stack} from "@chakra-ui/react";
import {SeoMetaData} from "@/components/seo-meta-data";

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;

const Home = ({page, menuItems, footerData, seoData}: HomeProps) => {
	return (
		<Layout
			isGabdxImg
			menuItems={menuItems}
			altLang={page.alternate_languages}
			footerData={footerData}>
			<SeoMetaData
				seoTitle={seoData.seoTitle}
				seoDescription={seoData.seoDescription}
				imagePreview={seoData.imagePreview}
			/>

			<Stack
				as="main"
				spacing={20}
				w="100%"
				maxW="container.lg"
				align="center"
				justify="center">
				<About page={page} />

				<Heading
					fontWeight="extrabold"
					as="h1"
					textTransform="uppercase"
					fontSize={{base: "1.12rem", md: "1.4rem"}}
					_after={{
						content: "''",
						border: "1px solid #e61101",
						display: "block",
						width: "4rem",
					}}>
					{page.lang === "pt-br"
						? "projetos e trabalhos"
						: "projects and works"}
				</Heading>

				<Projects data={page.data} lang={page.lang} />
			</Stack>
		</Layout>
	);
};

export async function getStaticProps({
	locale,
	previewData,
}: GetStaticPropsContext) {
	const client = createClient({previewData});

	const page = await client.getByUID("home", "home", {
		lang: locale,
	});

	const menu = await client.getSingle("menu", {lang: locale});
	const footer = await client.getSingle("footer", {lang: locale});

	const seoData = {
		seoTitle: page.data.seoTitle,
		seoDescription: page.data.seoDescription,
		imagePreview: page.data.imagePreview,
	};

	const {menuItems, footerData} = layoutFormat({menu, footer});

	return {
		props: {
			page,
			seoData,
			menuItems,
			footerData,
		},
	};
}

export default Home;
