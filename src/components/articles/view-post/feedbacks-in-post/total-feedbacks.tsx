import {FeedbacksData} from "@hooks/use-feedbacks";

import {Flex, HStack, Text, useColorModeValue} from "@chakra-ui/react";

type EmojisType = {
	[key in keyof FeedbacksData["feedbackLevelQdt"]]: string;
};

type FeedbackExistsType = {
	feedbackLevel: string;
	feedbackQdt: number;
	emoji: string;
};

type TotalFeedbacksProps = {
	feedbackLevelQdt: FeedbacksData["feedbackLevelQdt"] & {
		[key: string]: number;
	};
};

export const TotalFeedbacks = ({feedbackLevelQdt}: TotalFeedbacksProps) => {
	const emojis: EmojisType = {
		excellent: "😁",
		good: "🙂",
		regular: "😐",
		bad: "🙁",
		terrible: "😣",
	};

	const feedbacksExists: FeedbackExistsType[] = [];

	Object.keys(feedbackLevelQdt).forEach(key => {
		if (feedbackLevelQdt[key] > 0) {
			const item = {
				feedbackLevel: key,
				feedbackQdt: feedbackLevelQdt[key],
				emoji: emojis[key as keyof EmojisType],
			};

			feedbacksExists.push(item);
		}
	});

	const colorNumberMode = useColorModeValue("light.900", "myColors.moonSky");
	const colorTextMode = useColorModeValue("whiteAlpha.500", "blackAlpha.500");

	return (
		<Flex userSelect="none" pointerEvents="none">
			{feedbacksExists.map(({emoji, feedbackQdt}) => (
				<HStack spacing={2} key={emoji}>
					<Text>{emoji}</Text>

					<Text color={colorTextMode} pr={4} fontFamily="Raleway">
						(
						<Text as="span" color={colorNumberMode}>
							{feedbackQdt}
						</Text>
						)
					</Text>
				</HStack>
			))}
		</Flex>
	);
};
