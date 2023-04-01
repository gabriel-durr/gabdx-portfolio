import { ViewPostProps } from ".";

import { Tag, Text, Flex, Avatar, HStack } from "@chakra-ui/react";

type InfoAndTechsProps = Pick<ViewPostProps["postData"], "date" | "tags">;

export const InfoAndTechs = ({ date, tags }: InfoAndTechsProps) => {
	return (
		<HStack spacing={["2px", "7px"]}>
			<Flex gap={{ base: 2, md: 3, lg: 6 }} mr="30px">
				<Avatar
					name="Gabriel Durr"
					size="sm"
					src="/avatar-post.jpg"
					alignSelf="flex-start"
				/>
				<Text
					fontSize={["0.65rem", "0.8rem"]}
					fontWeight="semibold"
					fontFamily="monospace"
					mt="10px">
					{date}
				</Text>
			</Flex>
			<HStack
				maxW={{ base: "120px", md: "300px", lg: "400px" }}
				py="0.5rem"
				overflowX="auto"
				sx={{
					"&::-webkit-scrollbar": {
						w: "1px",
						h: { base: "4px", md: "10px" },
					},
				}}>
				{tags.map(tag => (
					<Tag
						key={tag}
						minW="min-content"
						fontSize={{ base: "0.68rem", md: "0.8rem" }}
						color="myColors.whiteStar"
						bg="myColors.gradBlueOrange"
						fontWeight="bolder"
						variant="solid">
						{tag}
					</Tag>
				))}
			</HStack>
		</HStack>
	);
};
