import { PostDataProps } from ".";

import { Tag, HStack } from "@chakra-ui/react";

type TagsProps = Pick<PostDataProps["postData"][0], "tags">;

export const Tags = ({ tags }: TagsProps) => {
	return (
		<HStack spacing={2}>
			{tags.map(tag => {
				return (
					<Tag
						key={tag}
						color="myColors.whiteStar"
						fontWeight="bolder"
						size="sm"
						variant="solid"
						bg="myColors.gradBlueOrange">
						{tag}
					</Tag>
				);
			})}
		</HStack>
	);
};
