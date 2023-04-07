import { FeedbacksData } from "@hooks/use-feedbacks";

type ChangeTheLikeNowType = {
	isLike: boolean;
	data: FeedbacksData;
	feedbackTo: string;
};

type ChangeTheDislikeNowType = {
	isDislike: boolean;
	data: FeedbacksData;
	feedbackTo: string;
};

const changeTheLikeNow = ({
	data,
	isLike,
	feedbackTo,
}: ChangeTheLikeNowType) => {
	const updatedFeedbackList = data.feedbackList.map(feedback => {
		if (feedback._id.toString() === feedbackTo) {
			return {
				...feedback,
				like: {
					isLike,
				},
			};
		}
		return feedback;
	});

	const updatedData: FeedbacksData = {
		...data,
		feedbackList: updatedFeedbackList || [],
	};

	return updatedData;
};

const changeTheDislikeNow = ({
	data,
	isDislike,
	feedbackTo,
}: ChangeTheDislikeNowType) => {
	const updatedFeedbackList = data.feedbackList.map(feedback => {
		if (feedback._id.toString() === feedbackTo) {
			return {
				...feedback,
				dislike: {
					isDislike,
				},
			};
		}
		return feedback;
	});

	const updatedData: FeedbacksData = {
		...data,
		feedbackList: updatedFeedbackList || [],
	};

	return updatedData;
};

export { changeTheLikeNow, changeTheDislikeNow };
