import { ViewPostProps } from ".";
import { rickTextComponents } from "./rich-text-components";

import { PrismicRichText } from "@prismicio/react";

import { VStack } from "@chakra-ui/react";

type ContentProps = Pick<ViewPostProps["postData"], "description">;

export const Content = ({ description }: ContentProps) => {
	return (
		<VStack
			as="section"
			color="gray.100"
			align="flex-start"
			p={{ base: 4, md: 0 }}
			_light={{ color: "gray.900" }}
		>
			<PrismicRichText field={description} components={rickTextComponents} />
		</VStack>
	);
};
