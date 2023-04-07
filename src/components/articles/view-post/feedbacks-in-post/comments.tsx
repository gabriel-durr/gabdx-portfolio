import { formatDate } from "@utils/formate-date";
import { FeedbackList } from "@hooks/use-feedbacks";
import { parseCookies } from "nookies";

import { motion } from "framer-motion";
import {
	AiFillLike,
	AiFillFlag,
	AiOutlineLike,
	AiFillDislike,
	AiOutlineDislike,
} from "react-icons/ai";

import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";

import { useState } from "react";
import {
	Box,
	Text,
	Icon,
	HStack,
	Avatar,
	VStack,
	Divider,
	Heading,
	IconButton,
} from "@chakra-ui/react";

type CommentsProps = {
	feedbackList: FeedbackList[];
};

export const Comments = ({ feedbackList }: CommentsProps) => {
	const [isShowFullText, SetIsShowFullText] = useState(false);
	const [isLike, setIsLike] = useState(false);
	const [isDislike, setIsDislike] = useState(false);

	const feedbacksLikes = feedbackList.map(feedback => feedback.likes);

	const { feedbackId } = parseCookies();

	const handleToggleShowText = () => {
		SetIsShowFullText(!isShowFullText);
	};

	const handleLike = () => {};

	return (
		<VStack spacing={8}>
			{feedbackList.map(feedback => (
				<VStack key={feedback._id.toString()} w="100%" h="180px">
					<HStack justify="space-between" align="start" w="100%">
						<Avatar size="md" name={feedback.name} />
						<VStack align="start" w="100%">
							<HStack spacing={4}>
								<Heading size="xs">{feedback.name}</Heading>
								<Text fontSize="xs">{formatDate(feedback.createdAt)}</Text>
							</HStack>

							<Box
								w="100%"
								minH="80px"
								maxH="80px"
								pos="relative"
								overflowY="auto">
								<Text fontSize="sm" w="90%">
									{isShowFullText
										? feedback.comment
										: `${feedback.comment.slice(0, 232)} ...`}
									{feedback.comment.length > 70 && (
										<IconButton
											pos="absolute"
											right={6}
											aria-label="button ver mais ou ver menos"
											size="sm"
											onClick={handleToggleShowText}
											icon={
												isShowFullText ? (
													<BsChevronCompactUp
														color="myColors.satinOrange"
														fontSize="2xl"
														aria-label="ver menos button"
													/>
												) : (
													<BsChevronCompactDown
														color="myColors.satinOrange"
														fontSize="2xl"
														aria-label="ver mais button"
													/>
												)
											}
										/>
									)}
								</Text>
							</Box>
							<HStack>
								{feedbacksLikes.map(like => {
									if (like.toString() === feedbackId) {
										return (
											<IconButton
												aria-label="like button"
												key={like.toString()}
												icon={<AiFillLike />}
											/>
										);
									} else {
										return (
											<IconButton
												aria-label="like button"
												key={like.toString()}
												icon={<AiFillLike />}
											/>
										);
									}
								})}
							</HStack>
						</VStack>

						<IconButton aria-label="Report feedback" icon={<AiFillFlag />} />
					</HStack>

					<Divider bg="blackAlpha.200" />
				</VStack>
			))}
		</VStack>
	);
};
