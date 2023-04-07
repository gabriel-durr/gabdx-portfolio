import { FeedbacksData } from "@hooks/use-feedbacks";

import { Flex, HStack, Image, Text, useColorModeValue } from "@chakra-ui/react";

type TotalFeedbacksProps = Pick<FeedbacksData, "feedbackLevelQdt">;

export const TotalFeedbacks = ({ feedbackLevelQdt }: TotalFeedbacksProps) => {
	const feedbacksLevelKeys = Object.entries(feedbackLevelQdt);

	const feedbacksExists = feedbacksLevelKeys.filter(([key, value]) => {
		if (value > 0) return [key, value];
	});

	const colorNumberMode = useColorModeValue("light.900", "myColors.moonSky");
	const colorTextMode = useColorModeValue("whiteAlpha.500", "blackAlpha.500");

	return (
		<Flex userSelect="none" pointerEvents="none">
			{feedbacksExists.map(([key, value]) => (
				<HStack spacing={2} key={key}>
					<Image
						boxSize={6}
						borderRadius="50%"
						src={`/emojis/svgs/${key}.svg`}
						alt={key}
					/>

					<Text color={colorTextMode} pr={4} fontFamily="Raleway">
						(
						<Text as="span" color={colorNumberMode}>
							{value}
						</Text>
						)
					</Text>
				</HStack>
			))}
		</Flex>
	);
};
