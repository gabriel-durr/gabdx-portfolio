import { api } from "@services/api";
import {
	changeTheLikeNow,
	removeFeedbackNow,
	UpdatedFeedbackNow,
	changeTheDislikeNow,
} from "@utils/att-swr-cache-now";

import useSWR from "swr";
import { Types } from "mongoose";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";

export type FeedbackList = {
	_id: Types.ObjectId;
	feedbackId: string;
	feedbackLevel: "terrible" | "bad" | "regular" | "good" | "excellent";
	avatar?: string;
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
	updatedAt: Date;
};

export type FeedbackLevelQdt = {
	excellent: number;
	good: number;
	regular: number;
	bad: number;
	terrible: number;
};

export type CreateFeedbackType = Pick<
	FeedbackList,
	"feedbackLevel" | "name" | "comment"
>;

export type FeedbacksData = {
	isBanned: boolean;
	feedbackList: FeedbackList[];
	totalFeedbacks: number;
	feedbackLevelQdt: FeedbackLevelQdt;
};

export type UpdatedFeedbackType = Partial<
	Pick<FeedbackList, "avatar" | "comment">
>;

export type ReportFeedbackType = {
	reportedByName: string;
	reporterTo: string;
	typeOfReport: string;
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

	const { feedbackId } = parseCookies();

	async function createFeedback(newData: CreateFeedbackType) {
		try {
			await api.post(`/feedbacks/${queryPostId}`, newData);

			mutate();

			await api.post("/wbhook-notification", {
				message: `NEW FEEDBACK!  Name: ${newData.name}  Comment: ${newData.comment}`,
			});
		} catch (err) {
			throw err;
		}
	}

	async function updateFeedback(updatedData: UpdatedFeedbackType) {
		try {
			await api.put(`/feedbacks/${queryPostId}`, updatedData);

			if (!data) return;

			const updatedDataNow = UpdatedFeedbackNow({
				data,
				updatedData,
				feedbackId,
			});

			mutate(updatedDataNow);
		} catch (err) {
			throw err;
		}
	}

	async function removeFeedback() {
		try {
			await api.delete(`/feedbacks/${queryPostId}`);

			if (!data) return;

			const updatedDataNow = removeFeedbackNow({ data, feedbackId });

			mutate(updatedDataNow);
		} catch (err) {
			throw err;
		}
	}

	async function addLike(feedbackTo: string) {
		try {
			await api.post(`/feedbacks/${queryPostId}/likes`, {
				feedbackTo,
			});

			if (!data) return;

			const updatedDataNow = changeTheLikeNow({
				isLike: true,
				data,
				feedbackTo,
			});

			mutate(updatedDataNow);
		} catch (err) {
			throw err;
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

			const updatedDataNow = changeTheLikeNow({
				isLike: false,
				data,
				feedbackTo,
			});

			mutate(updatedDataNow);
		} catch (err) {
			throw err;
		}
	}

	async function addDislike(feedbackTo: string) {
		try {
			await api.post(`/feedbacks/${queryPostId}/dislikes`, {
				feedbackTo,
			});

			if (!data) return;

			const updatedDataNow = changeTheDislikeNow({
				data,
				feedbackTo,
				isDislike: true,
			});

			mutate(updatedDataNow);
		} catch (err) {
			throw err;
		}
	}
	async function removeDislike(feedbackTo: string) {
		try {
			await api.delete(`/feedbacks/${queryPostId}/dislikes`, {
				params: { feedbackTo },
			});

			if (!data) return;

			const updatedDataNow = changeTheDislikeNow({
				data,
				feedbackTo,
				isDislike: false,
			});

			mutate(updatedDataNow);
		} catch (err) {
			throw err;
		}
	}

	async function reportThisUser({
		reportedByName,
		reporterTo,
		typeOfReport,
	}: ReportFeedbackType) {
		try {
			await api.post(`feedbacks/${queryPostId}/reports`, {
				reporterTo,
				reportedByName,
				typeOfReport,
			});

			await api.post("/wbhook-notification", {
				message: `NEW REPORT!  reporterTo: ${reporterTo}  reportedByName: ${reportedByName}`,
			});
		} catch (err) {
			throw err;
		}
	}

	return {
		data,
		error,
		mutate,
		addLike,
		isLoading,
		removeLike,
		addDislike,
		isValidating,
		removeDislike,
		createFeedback,
		removeFeedback,
		updateFeedback,
		reportThisUser,
	};
};

export { useFeedback };
