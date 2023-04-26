import { CopyCode } from "./copy-code";

import NextImage from "next/image";
import { JSXMapSerializer } from "@prismicio/react";
import { AiTwotoneThunderbolt } from "react-icons/ai";

import { List, Text, Heading, ListItem, ListIcon } from "@chakra-ui/react";

export const rickTextComponents: JSXMapSerializer = {
	heading3: ({ children }) => (
		<Heading as="h3" variant="topicPrimary" py={12}>
			{children}
		</Heading>
	),
	heading6: ({ children }) => (
		<Heading
			as="h6"
			fontFamily="body"
			fontWeight="bold"
			fontSize={{ base: "0.91rem", md: ".96rem" }}>
			{children}
		</Heading>
	),
	paragraph: ({ children }) => (
		<Text mb="40px" pb={1} textAlign="justify" fontSize="subText">
			{children}
		</Text>
	),
	preformatted: ({ text }) => <CopyCode code={text} />,
	image: ({ node }) => (
		<NextImage
			src={node?.url ?? ""}
			alt={node?.alt ?? ""}
			width={500}
			height={500}
			style={{ margin: "20px 0" }}
		/>
	),

	listItem: ({ children }) => (
		<List my={14}>
			<ListItem fontFamily="heading">
				<ListIcon as={AiTwotoneThunderbolt} color="gbdx.sunny" />
				{children}
			</ListItem>
		</List>
	),
};
