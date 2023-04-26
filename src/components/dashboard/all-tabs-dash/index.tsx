import { TabSpam, TabSpamPainel, SpamFeedback } from "./tab-spam";
import { TabActions, TabActionsPainel, BanLocationType } from "./tab-actions";
import {
	TabReports,
	TabReportsPainel,
	AllReportsInFeedbackType,
} from "./tab-reports";
import {
	TabFeedbacks,
	TabFeedbacksPainel,
	FeedbackListOfPostsTypes,
} from "./tab-feedbacks";

import { Tabs, TabList, TabPanels } from "@chakra-ui/react";

type TabItemsProps = {
	allBans: BanLocationType[];
	spamFeedback: SpamFeedback[];
	feedbackListOfPosts: FeedbackListOfPostsTypes[];
	allReportsInFeedback: AllReportsInFeedbackType[];
};

export const AllTabsDash = ({
	allBans,
	spamFeedback,
	feedbackListOfPosts,
	allReportsInFeedback,
}: TabItemsProps) => {
	return (
		<Tabs isLazy orientation="vertical" w="80%" zIndex={2}>
			<TabList minW="full" bg="whiteAlpha.100">
				<TabActions />
				<TabSpam />
				<TabFeedbacks />
				<TabReports />
			</TabList>

			<TabPanels>
				<TabActionsPainel allBans={allBans} />
				<TabSpamPainel spamFeedbacks={spamFeedback} />
				<TabFeedbacksPainel feedbackListOfPosts={feedbackListOfPosts} />
				<TabReportsPainel allReportsInFeedback={allReportsInFeedback} />
			</TabPanels>
		</Tabs>
	);
};
