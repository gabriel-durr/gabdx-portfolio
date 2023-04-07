import { Comments } from "./comments";
import { useFeedback } from "@hooks/use-feedbacks";
import { TotalFeedbacks } from "./total-feedbacks";
import { InputsFeedbacks } from "./inputs-feedback";
import { SkeletonsLoading } from "./skeletons-loading";

import {
	Text,
	Flex,
	VStack,
	Heading,
	Divider,
	useColorModeValue,
} from "@chakra-ui/react";

export const FeedbacksInPost = () => {
	const { data, isLoading } = useFeedback();

	const bgColorMode = useColorModeValue("blackAlpha.100", "whiteAlpha.100");

	if (isLoading || !data) return <SkeletonsLoading />;

	return (
		<Flex
			direction="column"
			shadow="sm"
			w="100%"
			bg={bgColorMode}
			justify="center"
			align="center"
			gap={12}>
			<TotalFeedbacks feedbackLevelQdt={data.feedbackLevelQdt} />

			<VStack p={8} spacing={16} align="center">
				<InputsFeedbacks />

				<Heading
					alignSelf="start"
					fontFamily="DM Sans"
					fontWeight="medium"
					fontSize="1.4rem">
					Feedbacks
					<Text pl={2} fontSize="lg" fontWeight="hairline" as="span">
						{`(${data.totalFeedbacks})`}
					</Text>
				</Heading>
				<Divider w="90%" bg="blackAlpha.200" />

				<Comments feedbackList={data.feedbackList} />
			</VStack>
		</Flex>
	);
};
