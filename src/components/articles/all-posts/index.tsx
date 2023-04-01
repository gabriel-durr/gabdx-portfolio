import { Tags } from "./tags";
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
	Divider,
	useColorModeValue,
} from "@chakra-ui/react";

export type PostDataProps = Pick<
	InferGetServerSidePropsType<typeof getStaticProps>,
	"postData"
>;

type ArticlesProps = PostDataProps;

export const AllPosts = ({ postData }: ArticlesProps) => {
	const darkModeColor = useColorModeValue("gray.200", "gray.700");

	return (
		<Stack maxW="7xl" p={[5, 2]} spacing={28}>
			{postData.map(({ title, image, uid, tags, description, date }) => (
				<Box key={title}>
					<Flex
						direction={{ base: "column", md: "row" }}
						gap={{ base: 0, md: 4 }}
						justify="space-between">
						<ImagePost image={image} uid={uid} />

						<VStack
							ml={{ base: "12px", md: "0px" }}
							spacing={4}
							flex={1}
							justify="center"
							align="start">
							<Heading
								as="h2"
								noOfLines={3}
								pt={{ base: "0px", md: "1rem" }}
								fontSize={{ base: "1.04rem", md: "1.18rem" }}>
								<Link as={NextLink} href={`/posts/${uid}`}>
									{title}
								</Link>
							</Heading>

							<Tags tags={tags} />

							<Text
								noOfLines={3}
								mt={2}
								fontSize={{ base: ".88rem", md: "0.98rem" }}
								color={darkModeColor}>
								{description}
							</Text>
							<BlogAuthor name="Gabriel Dürr M." date={date} />
						</VStack>
					</Flex>

					<Divider alignSelf="center" w="100%" pt="1.2rem" />
				</Box>
			))}
		</Stack>
	);
};
