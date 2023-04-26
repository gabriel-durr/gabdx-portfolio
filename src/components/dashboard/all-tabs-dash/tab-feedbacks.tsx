import { FeedComment } from "../feed-comment";
import { DeleteFeedback } from "../delete-feedback";
import { FeedbackList } from "@hooks/use-feedbacks";

import { Types } from "mongoose";
import { MdOutlineFeedback } from "react-icons/md";

import {
	Text,
	Tab,
	Icon,
	Flex,
	Stack,
	VStack,
	Avatar,
	HStack,
	Divider,
	Heading,
	TabPanel,
	AbsoluteCenter,
} from "@chakra-ui/react";

type FeedbackListProps = Omit<FeedbackList, "likes" | "dislikes"> & {
	likes: string[];
	dislikes: string[];
};

export type FeedbackListOfPostsTypes = {
	_id: Types.ObjectId;
	postId: string;
	feedbackList: FeedbackListProps[];
};

type TabFeedbacksPainelProps = {
	feedbackListOfPosts: FeedbackListOfPostsTypes[];
};

export const TabFeedbacks = () => (
	<Tab
		rounded="sm"
		display="flex"
		justifyContent="start"
		px={12}
		gap={2}
		_selected={{
			bg: "whiteAlpha.400",
			color: "cyan.400",
			shadow: "sm",
			borderLeft: "1px solid cyan",
		}}>
		<Icon fontSize="xl" as={MdOutlineFeedback} />
		<Text fontWeight="medium" fontSize=".9rem">
			Feedbacks
		</Text>
	</Tab>
);

export const TabFeedbacksPainel = ({
	feedbackListOfPosts,
}: TabFeedbacksPainelProps) => {
	return (
		<TabPanel>
			<AbsoluteCenter
				pos="absolute"
				display="flex"
				gap={12}
				flexDir="column"
				alignItems="center"
				h="90%"
				w="container.lg">
				<Flex
					w="full"
					maxH="full"
					direction="column"
					align="center"
					p={24}
					overflowY="auto"
					sx={{
						"&::-webkit-scrollbar": {
							w: 0,
							display: "none",
						},
					}}>
					{feedbackListOfPosts.map(({ _id, postId, feedbackList }) => (
						<Stack
							key={postId}
							w="full"
							align="center"
							spacing={14}
							mb={20}
							p={8}>
							<Heading fontSize="lg" fontFamily="body">
								Post:
								<Text as="span" fontWeight="normal" px={2} color="cyan.500">
									{postId}
								</Text>
							</Heading>

							<VStack
								w="max-content"
								maxH="580px"
								spacing={12}
								overflowY="auto"
								sx={{
									"&::-webkit-scrollbar": {
										w: 0,
										display: "none",
									},
								}}>
								{feedbackList.map(feedback => (
									<VStack
										key={feedback._id.toString()}
										bg="whiteAlpha.100"
										p={4}
										rounded="sm">
										<HStack spacing={8}>
											<Avatar
												size="sm"
												name={feedback.name}
												src={feedback.avatar}
											/>
											<Text fontWeight="bold">
												Name:
												<Text
													as="span"
													fontWeight="normal"
													px={2}
													color="gbdx.sun">
													{feedback.name}
												</Text>
											</Text>

											<Text as="time" fontSize="sm" fontFamily="number">
												{new Date(feedback.createdAt).toLocaleString("pt-br")}
											</Text>
										</HStack>

										<FeedComment comment={feedback.comment} />
										<Stack
											direction="row"
											w="full"
											px={4}
											justify="space-between">
											<HStack>
												<Text>
													Likes:
													<Text as="span" px={2} color="blue.100">
														{feedback.likes.length}
													</Text>
												</Text>
												<Text>
													Dislikes:
													<Text as="span" px={2} color="red.100">
														{feedback.dislikes.length}
													</Text>
												</Text>
											</HStack>

											<DeleteFeedback
												idPost={_id.toString()}
												idFeedback={feedback.feedbackId}
											/>
										</Stack>
									</VStack>
								))}
							</VStack>
							<Divider w="full" bg="whiteAlpha.50" opacity=".1" />
						</Stack>
					))}
				</Flex>
			</AbsoluteCenter>
		</TabPanel>
	);
};
