import { PostDataProps } from ".";

import { HStack, Avatar, Text } from "@chakra-ui/react";

type BlogAuthorProps = Pick<PostDataProps["postData"][0], "date"> & {
	name: string;
};

export const BlogAuthor = ({ name, date }: BlogAuthorProps) => {
	return (
		<HStack marginTop={2} spacing={2} display="flex" alignItems="center">
			<Avatar src="/avatar-post.jpg" size="xs" name={name} />

			<Text fontSize="0.8rem" fontWeight="medium">
				{name}
			</Text>
			<Text>-</Text>
			<Text as="time" fontFamily="number" fontSize="xs">
				{date}
			</Text>
		</HStack>
	);
};
