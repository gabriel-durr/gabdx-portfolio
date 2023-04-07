import { BsCaretUp, BsCaretDown } from "react-icons/bs";

import { useState, memo } from "react";
import { Box, Text, IconButton, HStack } from "@chakra-ui/react";

type CommentProps = {
	comment: string;
};

const Comment = ({ comment }: CommentProps) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleExpansion = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<Box
			w="100%"
			h={comment.length < 40 ? "40px" : "80px"}
			maxH="80px"
			overflowY="auto">
			<HStack w="100%" align="end">
				<Text fontSize="sm" w="90%">
					{isExpanded ? comment : `${comment.slice(0, 214)} ...`}
				</Text>

				{comment.length > 70 && (
					<IconButton
						variant="unstyled"
						display="flex"
						alignSelf="flex-end"
						aria-label={isExpanded ? "Button Ver menos" : "Button Ver mais"}
						size="md"
						fontSize="xl"
						onClick={toggleExpansion}
						icon={isExpanded ? <BsCaretUp /> : <BsCaretDown />}
					/>
				)}
			</HStack>
		</Box>
	);
};

export default memo(Comment);
