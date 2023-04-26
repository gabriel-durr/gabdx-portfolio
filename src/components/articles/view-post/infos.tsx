import { ViewPostProps } from ".";

import { Text, Stack, HStack, Avatar } from "@chakra-ui/react";

type InfoAndTechsProps = Pick<ViewPostProps["postData"], "createdAt">;

export const Infos = ({ createdAt }: InfoAndTechsProps) => {
	return (
		<Stack
			w={{ base: "full", md: "max" }}
			spacing={{ base: 1, md: 4 }}
			direction={{ base: "column", md: "row" }}
			justify="space-between"
			align={{ base: "end" }}>
			<HStack spacing={4}>
				<Avatar
					name="Gabriel Durr"
					size={{ base: "xs", md: "xs" }}
					src="/avatar-post.jpg"
					alignSelf="flex-start"
				/>

				<Text fontSize={{ base: 12, md: 14 }} fontFamily="number">
					por
					<Text
						as="strong"
						px={1}
						fontSize={{ base: 12, md: 14 }}
						fontFamily="number">
						Gabriel Dürr M.
					</Text>
					, São Paulo - SP
				</Text>
			</HStack>

			<Text as="time" fontSize={{ base: 12, md: 14 }} fontFamily="number">
				{createdAt}
			</Text>
		</Stack>
	);
};
