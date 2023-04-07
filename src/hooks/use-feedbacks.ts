import { api } from "@services/api";

import useSWR from "swr";
import { Types } from "mongoose";
import { useRouter } from "next/router";

export type FeedbackList = {
	_id: Types.ObjectId;
	feedbackLevel: "terrible" | "bad" | "regular" | "good" | "excellent";
	name: string;
	comment: string;
	likes: string[];
	dislikes: string[];
	createdAt: Date;
};

export type FeedbackLevelQdt = {
	excellent: number;
	good: number;
	regular: number;
	bad: number;
	terrible: number;
};

export type FeedbacksData = {
	feedbackList: FeedbackList[];
	totalFeedbacks: number;
	feedbackLevelQdt: FeedbackLevelQdt;
};

const fetcher = (url: string) => api.get(url).then(res => res.data);

const useFeedback = () => {
	const {
		query: { uid: queryPostId },
	} = useRouter();

	const { data, error, mutate, isLoading, isValidating } = useSWR<
		FeedbacksData,
		Error
	>(`/feedbacks?postId=${queryPostId}`, fetcher, { revalidateOnFocus: false });

	return {
		data,
		error,
		mutate,
		isLoading,
		isValidating,
	};
};

export { useFeedback };
