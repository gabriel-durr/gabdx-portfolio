import { Prism } from "react-syntax-highlighter";
import style from "react-syntax-highlighter/dist/cjs/styles/prism/synthwave84";

import { BsFillClipboardFill, BsFillClipboardCheckFill } from "react-icons/bs";

import { Box, Image, Text, Button, Icon, useClipboard } from "@chakra-ui/react";

type SyntaxHighlighterProps = {
	code: string;
};

export const SyntaxHighlighter = ({ code }: SyntaxHighlighterProps) => {
	const { hasCopied, onCopy } = useClipboard(code);

	return (
		<Box w={{ base: "100vw", lg: "full" }} pos="relative">
			<Prism language="jsx" style={style} customStyle={{ padding: 28 }}>
				{code}
			</Prism>

			<Box
				pos="absolute"
				right={{ base: 14, md: 32, lg: 4 }}
				top={6}
				shadow="sm"
			>
				<Button
					variant="unstyled"
					display="flex"
					size="sm"
					gap={1}
					onClick={onCopy}
				>
					<Icon
						as={hasCopied ? BsFillClipboardCheckFill : BsFillClipboardFill}
						size="100%"
						fontSize="xl"
						color={hasCopied ? "green.400" : "burlywood"}
					/>
					<Text as="span" color="gbdx.white" pt={1} fontSize="md">
						{hasCopied ? "copiado" : "copiar"}
					</Text>
				</Button>
			</Box>

			<Image
				pos="absolute"
				right={4}
				bottom={6}
				bg="whiteAlpha.900"
				src="/gd-logo.png"
				alt="gbdx-logo"
				w={8}
				pointerEvents="none"
				rounded="full"
			/>
		</Box>
	);
};
