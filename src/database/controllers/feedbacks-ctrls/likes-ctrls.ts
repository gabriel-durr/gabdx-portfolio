import FeedbackModel from "@database/model/feedback-schema";

import { parseCookies } from "nookies";
import { NextApiRequest, NextApiResponse } from "next";

type RequestBody = {
	feedbackTo: string;
};

const getLikes = async (req: NextApiRequest, res: NextApiResponse) => {
	const { query } = req;

	const { postId } = query;
	const { feedbackId } = parseCookies({ req });

	try {
		if (!postId || !feedbackId)
			return res.status(422).json({ message: "Missing required data" });

		const postCollection = await FeedbackModel.findOne({ postId });

		if (!postCollection)
			return res.status(404).json({ message: "Post collection not found" });

		const AllfeedbacksLikes = postCollection?.feedbackList.map(f => ({
			feedbackId: f._id,
			feedbackLikes: f.likes,
			feedbacksLikesQdt: f.likes?.length,
		}));

		const feedbacksWithYourLike = AllfeedbacksLikes.filter(f =>
			f.feedbackLikes?.includes(feedbackId)
		).map(f => f.feedbackId);

		return res.status(200).json({ AllfeedbacksLikes, feedbacksWithYourLike });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "Error get this likes" });
	}
};

const addLike = async (req: NextApiRequest, res: NextApiResponse) => {
	const { body, query } = req;

	const { postId } = query;
	const { feedbackTo } = body as RequestBody;
	const { feedbackId } = parseCookies({ req });

	try {
		if (!postId || !feedbackTo || !feedbackId)
			return res.status(422).json({ message: "Missing required data" });

		const postCollection = await FeedbackModel.findOne({ postId });

		if (!postCollection)
			return res.status(404).json({ message: "Post collection not found" });

		const likesUserToFeedback = postCollection?.feedbackList.find(
			f => f._id.toHexString() === feedbackTo
		)?.likes;

		if (!likesUserToFeedback)
			return res.status(404).json({ message: "Feedback likes not found" });

		const yourLikeOnFeedback = likesUserToFeedback?.some(
			like => like === feedbackId
		);

		if (yourLikeOnFeedback)
			return res.status(422).json({ message: "Like already exists" });

		likesUserToFeedback.push(feedbackId);

		await postCollection.save();

		return res.status(201).json({ message: "Like sucessfully added" });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "Error saving your like" });
	}
};

const removeLike = async (req: NextApiRequest, res: NextApiResponse) => {
	const { body, query } = req;

	const { postId } = query;
	const { feedbackTo } = body as RequestBody;
	const { feedbackId } = parseCookies({ req });

	try {
		if (!postId || !feedbackTo || !feedbackId)
			return res.status(422).json({ message: "Missing required data" });

		const postCollection = await FeedbackModel.findOne({ postId });

		if (!postCollection)
			return res.status(404).json({ message: "Post collection not found" });

		const likesUserToFeedback = postCollection.feedbackList.find(
			f => f._id.toHexString() === feedbackTo
		);

		if (!likesUserToFeedback)
			return res.status(404).json({ message: "Feedback not found" });

		const removeToLike = likesUserToFeedback.likes?.filter(
			f => f !== feedbackId
		);

		if (removeToLike?.length === likesUserToFeedback.likes?.length)
			return res.status(404).json({ message: "Like not found" });

		likesUserToFeedback.likes = removeToLike;

		await postCollection.save();

		return res.status(204).json({ message: "Like removed successfully" });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "Error removing like" });
	}
};

export { getLikes, addLike, removeLike };
