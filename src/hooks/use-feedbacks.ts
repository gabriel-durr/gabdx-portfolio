import { api } from "@services/api";
import { Types } from "mongoose";
import useSWR, { SWRResponse } from "swr";

type FeedbackProps = {
	_id: Types.ObjectId;
	userIp: string;
	feedbackLevel: "terrible" | "bad" | "regular" | "good" | "excellent";
	name: string;
	comment: string;
	likes: string[];
	createdAt: Date;
	reports: {
		reportedBy_Id: string;
		reportedByName: string;
		message: string;
	}[];
};

type useSWRProps = {
	totalFeedbacks: number;
	feedbackList: FeedbackProps[];
};

const fetcher = (url: string) => api.get(url).then(res => res.data);

const useFeedback = (queryPostId: string) => {
	const { data, error, mutate, isLoading, isValidating } = useSWR<
		useSWRProps,
		Error
	>(`/feedbacks?postId=${queryPostId}`, fetcher);

	return {
		data,
		error,
		mutate,
		isLoading,
		isValidating,
	};
};

export { useFeedback };
