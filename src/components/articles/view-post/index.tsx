import { Infos } from "./infos";
import { Banner } from "./banner";
import { Content } from "./content";
import { Breadcrumb } from "./breadcrumb";
import { LatestPosts } from "./latest-posts";
import { getStaticProps } from "@pages/posts/[uid]";

import dynamic from "next/dynamic";

const FeedbacksInPost = dynamic(
	() => import("./feedbacks-in-post").then(mod => mod.FeedbacksInPost),
	{
		ssr: true,
	}
);

import { InferGetStaticPropsType } from "next";

import { VStack, Heading, Stack } from "@chakra-ui/react";

export type ViewPostProps = Pick<
	InferGetStaticPropsType<typeof getStaticProps>,
	"postData"
>;

export const ViewPost = ({ postData }: ViewPostProps) => {
	return (
		<VStack
			spacing={14}
			p={2}
			justify="center"
			align="flex-start"
			w={{ base: "full", md: "container.sm", lg: "container.md" }}
		>
			<Heading as="h1" w="90%" variant="postPrimary">
				{postData.title}
			</Heading>

			<VStack align="start" w="full" spacing={8}>
				<Banner image={postData.image} />

				<Stack
					direction={{ base: "column", md: "row" }}
					w="full"
					px="2px"
					align="center"
					justify="space-between"
					spacing={6}
				>
					<Breadcrumb lang={postData.lang} />

					<Infos createdAt={postData.createdAt} />
				</Stack>
			</VStack>

			<Content description={postData.description} />

			<LatestPosts latestPosts={postData.latestPosts} lang={postData.lang} />

			<FeedbacksInPost lang={postData.lang} />
		</VStack>
	);
};
