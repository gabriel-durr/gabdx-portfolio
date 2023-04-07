import { api } from "@services/api";
import {
	changeTheLikeNow,
	changeTheDislikeNow,
} from "@utils/att-swr-cache-now";

import useSWR from "swr";
import { Types } from "mongoose";
import { useRouter } from "next/router";

export type FeedbackList = {
	_id: Types.ObjectId;
	feedbackLevel: "terrible" | "bad" | "regular" | "good" | "excellent";
	name: string;
	comment: string;
	likes: {
		isLike: boolean;
		likeQdt: number;
	};
	dislikes: {
		isDislike: boolean;
		dislikeQdt: number;
	};
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

	async function addLike(feedbackTo: string) {
		try {
			await api.post(`/feedbacks/${queryPostId}/likes`, {
				feedbackTo,
			});

			if (!data) return;

			const updatedData = changeTheLikeNow({ isLike: true, data, feedbackTo });

			mutate(updatedData);
		} catch (err) {
			console.error(err);
		}
	}

	async function removeLike(feedbackTo: string) {
		try {
			await api.delete(`/feedbacks/${queryPostId}/likes`, {
				params: {
					feedbackTo,
				},
			});

			if (!data) return;

			const updatedData = changeTheLikeNow({ isLike: false, data, feedbackTo });

			mutate(updatedData);
		} catch (err) {
			console.error(err);
		}
	}

	async function addDislike(feedbackTo: string) {
		try {
			await api.post(`/feedbacks/${queryPostId}/dislikes`, {
				feedbackTo,
			});

			if (!data) return;

			const updatedData = changeTheDislikeNow({
				data,
				feedbackTo,
				isDislike: true,
			});

			mutate(updatedData);
		} catch (err) {
			console.error(err);
		}
	}
	async function removeDislike(feedbackTo: string) {
		try {
			await api.delete(`/feedbacks/${queryPostId}/dislikes`, {
				params: { feedbackTo },
			});

			if (!data) return;

			const updatedData = changeTheDislikeNow({
				data,
				feedbackTo,
				isDislike: false,
			});

			mutate(updatedData);
		} catch (err) {
			console.error(err);
		}
	}

	return {
		data,
		error,
		mutate,
		isLoading,
		isValidating,
		addLike,
		removeLike,
		addDislike,
		removeDislike,
	};
};

export { useFeedback };
