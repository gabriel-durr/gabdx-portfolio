import { useFeedback } from "@hooks/use-feedbacks";
import { ReportFeedback } from "./report-feedback";

import { AiFillEdit, AiFillDelete, AiOutlineMore } from "react-icons/ai";

import {
	VStack,
	Popover,
	IconButton,
	PopoverBody,
	PopoverTrigger,
	PopoverContent,
} from "@chakra-ui/react";

type MoreOptionsProps = {
	lang: string;
	feedbackId: string;
	isEqualFeedbackId: boolean;
	isEditableComment: boolean;
	setIsEditableComment(isEdit: boolean): void;
};

export const MoreOptions = ({
	lang,
	feedbackId,
	isEqualFeedbackId,
	isEditableComment,
	setIsEditableComment,
}: MoreOptionsProps) => {
	const { removeFeedback } = useFeedback();

	function handleIsEditable() {
		setIsEditableComment(true);
	}

	async function handleRemoverFeedback() {
		try {
			await removeFeedback();
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<Popover isLazy lazyBehavior="keepMounted">
			<PopoverTrigger>
				<IconButton
					pos="absolute"
					top={4}
					right={{ base: 0, sm: 2, md: 4 }}
					isDisabled={isEditableComment}
					variant="unstyled"
					size="sm"
					display="flex"
					aria-label="Button more options"
					fontSize="xl"
					icon={<AiOutlineMore />}
				/>
			</PopoverTrigger>

			<PopoverContent
				w="max"
				bg="whiteAlpha.200"
				_light={{ bg: "blackAlpha.400" }}>
				<PopoverBody display="flex" flexDir="column" gap={2}>
					{isEqualFeedbackId ? (
						<VStack boxSize="full" spacing={2}>
							<IconButton
								variant="unstyled"
								rounded="sm"
								display="flex"
								justifyContent="start"
								bg="gbdx.white"
								color="gbdx.black"
								w="full"
								h="min"
								gap={4}
								p={1}
								px={4}
								fontSize="lg"
								icon={<AiFillEdit />}
								aria-label="Edit the feedback"
								_hover={{ filter: "brightness(.92)" }}
								_after={{
									fontSize: "sm",
									content: "'Editar'",
									color: "blackAlpha.800",
								}}
								_light={{
									bg: "gbdx.black",
									color: "gbdx.white",
									"&:hover": {
										color: "gray.100",
										filter: "brightness(1.7)",
									},
									"&::after": {
										color: "whiteAlpha.800",
									},
								}}
								onClick={handleIsEditable}
							/>

							<IconButton
								variant="unstyled"
								display="flex"
								rounded="sm"
								w="full"
								h="min"
								justifyContent="center"
								bg="gbdx.white"
								color="gbdx.black"
								gap={4}
								p={1}
								px={4}
								fontSize="md"
								icon={<AiFillDelete />}
								aria-label="Delete the feedback"
								_hover={{
									filter: "brightness(.92)",
								}}
								_after={{
									fontSize: "sm",
									content: "'Excluir'",
									color: "blackAlpha.800",
								}}
								_light={{
									bg: "gbdx.black",
									color: "gbdx.white",
									"&:hover": {
										color: "gray.100",
										filter: "brightness(1.7)",
									},
									"&::after": {
										color: "whiteAlpha.800",
									},
								}}
								onClick={handleRemoverFeedback}
							/>
						</VStack>
					) : (
						<ReportFeedback lang={lang} feedbackId={feedbackId} />
					)}
				</PopoverBody>
			</PopoverContent>
		</Popover>
	);
};
