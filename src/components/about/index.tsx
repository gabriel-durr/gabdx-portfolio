import { getStaticProps } from "@/pages";
import { AboutContent } from "./about-content";
import { AvatarAndCurriculum } from "./avatar-and-curriculum";

import * as prismicH from "@prismicio/helpers";
import { InferGetStaticPropsType } from "next";

import { useColorModeValue, VStack } from "@chakra-ui/react";

type AboutProps = Pick<InferGetStaticPropsType<typeof getStaticProps>, "page">;

export type AboutContentDataProps = {
	avatar: {
		dark: string;
		light: string;
	};
	nameHeading: string;
	expertise: string;
	description: string;
	curriculum: string;
};

export const About = ({ page }: AboutProps) => {
	const aboutContentData: AboutContentDataProps = {
		avatar: {
			dark: prismicH.asImageSrc(page.data.avatarDark) || "",
			light: prismicH.asImageSrc(page.data.avatarLight) || "",
		},
		nameHeading: page.data?.nameHeading ?? "",
		expertise: page.data?.expertise ?? "",
		description: prismicH.asText(page.data.description) || "",
		curriculum: prismicH.asLink(page.data.curriculum) || "",
	};

	const darkModeColor = useColorModeValue("gray.100", "gray.900");
	const darkModeShadow = useColorModeValue(
		"1px 1px 1px rgba(66, 74, 83, 0.297)",
		"1px 1px 1px rgba(9, 17, 28, 0.23)"
	);

	return (
		<VStack
			w={["96%", "90%"]}
			bg="transparent"
			color={darkModeColor}
			boxShadow={darkModeShadow}
			spacing={{ base: "0", md: 4 }}
			rounded="md"
			justify="center"
			align="center"
			mt={{ base: "none", md: "4rem" }}
			p={{ base: 1, md: 2 }}>
			<AvatarAndCurriculum {...aboutContentData} />
			<AboutContent aboutContentData={aboutContentData} lang={page.lang} />
		</VStack>
	);
};
