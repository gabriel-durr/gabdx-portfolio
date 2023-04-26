import { MoreOptions } from "./more-options";
import { formatDate } from "@utils/formate-date";
import { LikeOrDislike } from "./like-or-dislike";
import { AvatarOrUpload } from "./avatar-or-upload";
import { FeedbackList, useFeedback } from "@hooks/use-feedbacks";

import { useForm } from "react-hook-form";
import { CgClose, CgCheck } from "react-icons/cg";
import { ImageListType } from "react-images-uploading";
import { BsCaretUpFill, BsCaretDown } from "react-icons/bs";

import { useState, memo } from "react";
import {
	Text,
	Flex,
	VStack,
	HStack,
	Heading,
	Textarea,
	IconButton,
	ButtonGroup,
	useBreakpointValue,
} from "@chakra-ui/react";

export type FeedbackHookFormType = {
	comment: string;
	avatar: string;
};

type FeedbackDataFiltered = FeedbackHookFormType & {
	[key: string]: string;
};

export type CommentProps = Omit<FeedbackList, "feedbackLevel" | "_id"> & {
	lang: string;
	feedbackId: string;
	cookieFeedbackId: string;
};

const Comment = ({
	lang,
	name,
	avatar,
	comment,
	createdAt,
	dislikes,
	likes,
	feedbackId,
	cookieFeedbackId,
}: CommentProps) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [avatarUp, setAvatarUp] = useState<ImageListType>([]);
	const [isEditableComment, setIsEditableComment] = useState(false);

	const breakpointsisTextLong = useBreakpointValue({
		base: 108,
		sm: 118,
		md: 220,
	});

	const breakpointsShortComment = useBreakpointValue({
		base: 104,
		sm: 114,
		md: 194,
	});

	const isAvatarExists = Boolean(avatarUp.length);

	const { updateFeedback } = useFeedback();

	const toggleExpansion = () => {
		setIsExpanded(!isExpanded);
	};

	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<FeedbackHookFormType>();

	async function handleOnSubmit(data: FeedbackHookFormType) {
		if (isEditableComment) setIsEditableComment(false);

		const filteredData = Object.entries(data)
			.filter(([_, value]) => {
				return value !== "" && value !== avatar && value !== comment;
			})
			.reduce((obj, [key, value]) => {
				obj[key] = value;
				return obj;
			}, {} as FeedbackDataFiltered);

		const dataExists = Boolean(Object.keys(filteredData).length);

		if (!dataExists) return;

		try {
			await updateFeedback(filteredData);

			if (isAvatarExists) setAvatarUp([]);
		} catch (err) {
			console.error(err);
		}
	}

	function handleCancelComment() {
		setIsEditableComment(false);
	}

	const isTextLong = comment.length >= breakpointsisTextLong!;
	const isEqualFeedbackId = feedbackId === cookieFeedbackId;
	const sliceForShortComment = comment.slice(0, breakpointsShortComment);

	return (
		<Flex
			pos="relative"
			justify="space-between"
			gap={{ base: 2, md: 4 }}
			align="start"
			w="full"
			p={{ base: 2, md: 4 }}
			bg={isEqualFeedbackId ? "blackAlpha.50" : undefined}
			_dark={{
				bg: isEqualFeedbackId ? "whiteAlpha.50" : undefined,
			}}>
			<AvatarOrUpload
				name={name}
				avatar={avatar}
				avatarUp={avatarUp}
				setAvatarUp={setAvatarUp}
				setValue={setValue}
				handleOnSubmit={handleOnSubmit}
				handleSubmit={handleSubmit}
				isEqualFeedbackId={isEqualFeedbackId}
			/>

			<VStack align="start" flex={1} px={{ base: 1, md: 2 }}>
				<HStack spacing={4}>
					<Heading size="xs">{name}</Heading>
					<Text fontSize="xs">{formatDate(createdAt)}</Text>
				</HStack>

				{isEqualFeedbackId && isEditableComment ? (
					<VStack h="94px" w="full" align="end" spacing={4}>
						<Textarea
							{...register("comment")}
							variant="gdxTextarea"
							autoFocus
							resize="none"
							defaultValue={comment}
						/>
						<ButtonGroup spacing={2}>
							<IconButton
								variant="unstyled"
								size="sm"
								display="flex"
								fontSize="xl"
								color="red"
								aria-label="Cancel edit"
								icon={<CgClose />}
								onClick={handleCancelComment}
							/>
							<IconButton
								variant="unstyled"
								size="sm"
								display="flex"
								fontSize="3xl"
								color="green"
								aria-label="Confirm edit"
								icon={<CgCheck />}
								onClick={handleSubmit(handleOnSubmit)}
							/>
						</ButtonGroup>
					</VStack>
				) : (
					<HStack w="full" align="start" overflow="hidden">
						<Text
							px={2}
							h="90px"
							w={["206px", "238px", "432px", "500px"]}
							overflowY={isExpanded ? "scroll" : undefined}
							fontSize="sm">
							{isExpanded
								? comment
								: `${sliceForShortComment} ${isTextLong ? "..." : ""} `}
						</Text>

						{isTextLong && (
							<IconButton
								variant="unstyled"
								display="flex"
								alignSelf="flex-end"
								aria-label={isExpanded ? "Button Ver menos" : "Button Ver mais"}
								size="sm"
								fontSize="xl"
								onClick={toggleExpansion}
								icon={isExpanded ? <BsCaretUpFill /> : <BsCaretDown />}
							/>
						)}
					</HStack>
				)}

				<LikeOrDislike
					lang={lang}
					feedbackId={feedbackId}
					likes={likes}
					dislikes={dislikes}
				/>
			</VStack>
			<MoreOptions
				lang={lang}
				feedbackId={feedbackId}
				isEqualFeedbackId={isEqualFeedbackId}
				isEditableComment={isEditableComment}
				setIsEditableComment={setIsEditableComment}
			/>
		</Flex>
	);
};

export default memo(Comment);
