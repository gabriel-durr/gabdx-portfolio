import { BsFillClipboardFill, BsFillClipboardCheckFill } from "react-icons/bs";

import {
	Icon,
	Text,
	Code,
	HStack,
	Button,
	useClipboard,
} from "@chakra-ui/react";

type CopyCodeProps = {
	code?: string;
};

export const CopyCode = ({ code }: CopyCodeProps) => {
	const { hasCopied, onCopy } = useClipboard(code || "");

	return (
		<HStack spacing={4}>
			<Code color="gray.900" bg="orange.50" my="10px" p={2} rounded="sm">
				{code}
			</Code>
			<Button
				variant="unstyled"
				display="flex"
				size="sm"
				gap={1}
				onClick={onCopy}>
				<Icon
					as={hasCopied ? BsFillClipboardCheckFill : BsFillClipboardFill}
					size="100%"
					fontSize="md"
					color={hasCopied ? "green.400" : "burlywood"}
				/>
				<Text as="span" pt={1} fontSize="xs">
					{hasCopied ? "copiado" : "copiar"}
				</Text>
			</Button>
		</HStack>
	);
};
