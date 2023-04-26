import { Tags } from "@components/tags";
import { ImagePost } from "./image-post";
import { BlogAuthor } from "./blog-author";
import { getStaticProps } from "@root/src/pages/posts";

import NextLink from "next/link";
import { InferGetServerSidePropsType } from "next";

import {
	Box,
	Link,
	Flex,
	Text,
	Stack,
	VStack,
	Heading,
} from "@chakra-ui/react";

export type PostDataProps = Pick<
	InferGetServerSidePropsType<typeof getStaticProps>,
	"postData"
>;

type ArticlesProps = PostDataProps;

export const AllPosts = ({ postData }: ArticlesProps) => {
	return (
		<Stack w={{ base: "full", lg: "container.md" }} p={5} spacing={12}>
			{postData.map(({ title, image, uid, tags, description, date }) => (
				<Flex
					key={title}
					pos="relative"
					w="full"
					h={{ base: "400px", md: "200px" }}
					gap={{ base: 0, md: 8 }}
					align={{ base: "center", md: "start" }}
					direction={{ base: "column", md: "row" }}>
					<ImagePost image={image} uid={uid} />

					<VStack flex={1} h="full" spacing={4} justify="start" align="start">
						<Heading as="h2" variant="secondary" noOfLines={1}>
							<Link as={NextLink} href={`/posts/${uid}`}>
								{title}
							</Link>
						</Heading>

						<Tags
							tags={tags}
							bg="gbdx.gradBlueOrange"
							color="white"
							containerWidth={{ base: "308px", sm: "360px", md: "340px" }}
						/>

						<Text
							noOfLines={3}
							textAlign="justify"
							color="gray.200"
							fontSize=".88rem"
							_light={{ color: "gray.700" }}>
							{description}
						</Text>
						<BlogAuthor name="Gabriel Dürr M." date={date} />
					</VStack>
					<Box
						pos="absolute"
						opacity={0.1}
						bottom={-5}
						w="full"
						h="1px"
						bg="whiteAlpha.100"
						_light={{ bg: "blackAlpha.400", opacity: 0.1 }}
					/>
				</Flex>
			))}
		</Stack>
	);
};
