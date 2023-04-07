import { Banner } from "./banner";
import { Content } from "./content";
import { BackButton } from "./back-button";
import { InfoAndTechs } from "./info-and-techs";
import { getStaticProps } from "@pages/posts/[uid]";
import { FeedbacksInPost } from "./feedbacks-in-post";

import { InferGetStaticPropsType } from "next";

import { HStack, VStack, Heading, useColorModeValue } from "@chakra-ui/react";

export type ViewPostProps = Pick<
	InferGetStaticPropsType<typeof getStaticProps>,
	"postData"
>;

export const ViewPost = ({ postData }: ViewPostProps) => {
	const darkModeShadowColor = useColorModeValue("#ffffff11", "#06020127");

	return (
		<VStack
			spacing={14}
			w={{ base: "94%", md: "container.sm", lg: "container.md" }}
			align="flex-start"
			justify="center">
			<Heading
				as="h1"
				w="90%"
				fontFamily="Raleway"
				fontSize={{ base: "1.12rem", md: "1.54rem", lg: "2.14rem" }}
				lineHeight="shorter"
				textTransform="lowercase"
				_firstLetter={{
					textTransform: "uppercase",
				}}
				fontWeight="normal"
				pt="2.5rem"
				textShadow={`0px 8px 17px ${darkModeShadowColor}`}>
				{postData.title}
			</Heading>
			<VStack align="start" w="100%" spacing={{ base: 4, md: 8 }}>
				<Banner image={postData.image} />

				<HStack
					w="100%"
					px="2px"
					align="center"
					justify="space-between"
					spacing={[1, 6]}>
					<BackButton lang={postData.lang} />

					<InfoAndTechs date={postData.date} tags={postData.tags} />
				</HStack>
			</VStack>

			<Content description={postData.description} />

			<FeedbacksInPost />
		</VStack>
	);
};
