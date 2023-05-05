import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { AspectRatio, Box, Flex } from "@chakra-ui/react";
import { PrismicRichText } from "@prismicio/react";

import { useEffect, useState } from "react";

/**
 * Props for `CodeSandbox`.
 */
export type CodeSandboxProps = SliceComponentProps<Content.CodeSandboxSlice>;

/**
 * Component for "CodeSandbox" Slices.
 */
const CodeSandbox = ({ slice }: CodeSandboxProps): JSX.Element => {
	return (
		<Flex
			as="section"
			w="full"
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<iframe src={slice.primary.code_example.embed_url} />
		</Flex>
	);
};

export default CodeSandbox;
