import FeedbackModel from "@database/model/feedback-schema";
import BanLocationModel from "@database/model/ban-location-schema";
import { decrypt } from "@utils/crypt-hash";

import { NextApiRequest, NextApiResponse } from "next";

const getAllFeedbacks = async (req: NextApiRequest, res: NextApiResponse) => {
	const { query, socket } = req;

	const { postId } = query;
	const userIp = socket.remoteAddress;
	const authHeader = req.headers.authorization;
	const feedbackId = authHeader?.split(" ")[1];

	try {
		if (!userIp || !postId)
			return res
				.status(422)
				.json({ message: "Query requirements not provided" });

		const allBanLocations = await BanLocationModel.find({});

		const isBanned = allBanLocations.some(
			ban => decrypt(ban.userIp) === userIp
		);

		const postCollection = await FeedbackModel.findOne(
			{ postId },
			{ "feedbackList.userIp": 0, "feedbackList.reports": 0 }
		).lean();

		if (!postCollection)
			return res.status(404).json({ message: "PostId not found." });

		const feedbackListOrigin = postCollection?.feedbackList;

		if (!feedbackListOrigin)
			return res.status(404).json({ message: "Feedbacks not found" });

		const totalFeedbacks = postCollection.feedbackList.map(
			f => f.feedbackLevel
		).length;

		const feedbackList = feedbackListOrigin.map(feedback => {
			const likes = feedback.likes;
			const dislikes = feedback.dislikes;

			const isLike = feedbackId ? likes?.includes(feedbackId) : false;
			const isDislike = feedbackId ? dislikes?.includes(feedbackId) : false;

			return {
				...feedback,
				likes: {
					isLike,
					likeQdt: likes?.length,
				},
				dislikes: {
					isDislike,
					dislikeQdt: dislikes?.length,
				},
			};
		});

		const feedbackLevelQdt = feedbackList.reduce(
			(acc, f) => {
				switch (f.feedbackLevel) {
					case "excellent":
						acc.excellent++;
						break;
					case "good":
						acc.good++;
						break;
					case "regular":
						acc.regular++;
						break;
					case "bad":
						acc.bad++;
						break;
					case "terrible":
						acc.terrible++;
						break;
					default:
						break;
				}
				return acc;
			},
			{ excellent: 0, good: 0, regular: 0, bad: 0, terrible: 0 }
		);

		return res.status(200).json({
			isBanned,
			feedbackList,
			totalFeedbacks,
			feedbackLevelQdt,
		});
	} catch (err: any) {
		console.error(err.message);

		res.status(500).json({ message: "Internal server error" });
	}
};

export { getAllFeedbacks };
