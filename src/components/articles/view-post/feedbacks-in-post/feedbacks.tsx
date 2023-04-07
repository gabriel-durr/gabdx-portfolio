import Comment from "./comment";
import { formatDate } from "@utils/formate-date";
import { FeedbackList } from "@hooks/use-feedbacks";
import { useFeedback } from "@hooks/use-feedbacks";

import {
	AiFillLike,
	AiFillFlag,
	AiOutlineMore,
	AiFillDislike,
	AiOutlineLike,
	AiOutlineDislike,
} from "react-icons/ai";

import {
	Text,
	HStack,
	Avatar,
	VStack,
	Divider,
	Heading,
	IconButton,
	ButtonGroup,
} from "@chakra-ui/react";

type FeedbacksProps = {
	feedbackList: FeedbackList[];
};

export const Feedbacks = ({ feedbackList }: FeedbacksProps) => {
	const { addLike, removeLike, addDislike, removeDislike } = useFeedback();

	function handleLike(isLike: boolean, _id: string) {
		isLike ? removeLike(_id) : addLike(_id);
	}
	function handleDislike(isDislike: boolean, _id: string) {
		isDislike ? removeDislike(_id) : addDislike(_id);
	}

	return (
		<VStack spacing={8}>
			{feedbackList.map(
				({ _id, name, createdAt, comment, likes, dislikes }) => (
					<VStack key={_id.toString()} w="100%" h="180px">
						<HStack justify="space-between" align="start" w="100%">
							<Avatar size="md" name={name} />
							<VStack align="start" w="100%" px={2}>
								<HStack spacing={4}>
									<Heading size="xs">{name}</Heading>
									<Text fontSize="xs">{formatDate(createdAt)}</Text>
								</HStack>

								<Comment comment={comment} />

								<ButtonGroup gap={4}>
									<IconButton
										variant="unstyled"
										display="flex"
										gap={1}
										size="sm"
										fontSize="lg"
										aria-label="like button"
										_after={{
											content: `'(${likes.likeQdt})'`,
											fontWeight: "medium",
										}}
										icon={likes.isLike ? <AiFillLike /> : <AiOutlineLike />}
										onClick={() => handleLike(likes.isLike, _id.toString())}
									/>

									<IconButton
										variant="unstyled"
										display="flex"
										gap={1}
										size="sm"
										fontSize="lg"
										aria-label="Dislike button"
										_after={{
											content: `'(${dislikes.dislikeQdt})'`,
											fontWeight: "medium",
										}}
										icon={
											dislikes.isDislike ? (
												<AiFillDislike />
											) : (
												<AiOutlineDislike />
											)
										}
										onClick={() =>
											handleDislike(dislikes.isDislike, _id.toString())
										}
									/>
								</ButtonGroup>
							</VStack>

							<IconButton
								variant="unstyled"
								display="flex"
								aria-label="Button more options"
								fontSize="xl"
								icon={<AiOutlineMore />}
							/>
						</HStack>

						<Divider bg="blackAlpha.200" />
					</VStack>
				)
			)}
		</VStack>
	);
};
