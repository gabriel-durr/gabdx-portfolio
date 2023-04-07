import FeedbackModel from "@database/model/feedback-schema";

import {parseCookies} from "nookies";

import {NextApiRequest, NextApiResponse} from "next";

const getAllFeedbacks = async (req: NextApiRequest, res: NextApiResponse) => {
	const {query, socket} = req;

	const {postId} = query;
	const userIp = socket.remoteAddress;
	const {feedbackId} = parseCookies({req});

	try {
		if (!userIp || !postId)
			return res.status(422).json({message: "Query requirements not provided"});

		const postCollection = await FeedbackModel.findOne(
			{postId},
			{"feedbackList.userIp": 0, "feedbackList.reports": 0}
		);

		if (!postCollection)
			return res.status(404).json({message: "PostId not found."});

		const feedbackList = postCollection?.feedbackList;

		if (!feedbackList)
			return res.status(404).json({message: "Feedbacks not found"});

		const totalFeedbacks = postCollection.feedbackList.map(
			f => f.feedbackLevel
		).length;

		const likesByFeedback = feedbackList.map(feedback => {
			const likes = feedback.likes;
			const likeQdt = likes.length;
			const isLike = likes.includes(feedbackId);

			return {
				...feedback,
				likes: {
					isLike,
					likeQdt,
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
			{excellent: 0, good: 0, regular: 0, bad: 0, terrible: 0}
		);

		return res
			.status(200)
			.json({feedbackList, totalFeedbacks, feedbackLevelQdt, likesByFeedback});
	} catch (err: any) {
		console.error(err.message);

		res.status(500).json({message: "Internal server error"});
	}
};

export {getAllFeedbacks};
