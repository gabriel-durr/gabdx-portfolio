import FeedbackModel from "@database/model/feedback-schema";

import { parseCookies } from "nookies";
import { NextApiRequest, NextApiResponse } from "next";

type RequestBody = {
	feedbackTo: string;
};

const getDislikes = async (req: NextApiRequest, res: NextApiResponse) => {
	const { query } = req;

	const { postId } = query;
	const { feedbackId } = parseCookies({ req });

	try {
		if (!postId || !feedbackId)
			return res.status(422).json({ message: "Missing required data" });

		const postCollection = await FeedbackModel.findOne({ postId });

		if (!postCollection)
			return res.status(404).json({ message: "Post collection not found" });

		const AllfeedbacksDislikes = postCollection?.feedbackList.map(f => ({
			feedbackId: f._id,
			feedbackDislikes: f.dislikes,
		}));

		const feedbacksWithYourDislike = AllfeedbacksDislikes.filter(f =>
			f.feedbackDislikes?.includes(feedbackId)
		).map(f => f.feedbackId);

		return res.status(200).json({ feedbacksWithYourDislike });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "Error get this dislikes" });
	}
};

const addDislike = async (req: NextApiRequest, res: NextApiResponse) => {
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

		const dislikesUserToFeedback = postCollection?.feedbackList.find(
			f => f._id.toHexString() === feedbackTo
		)?.dislikes;

		if (!dislikesUserToFeedback)
			return res.status(404).json({ message: "Feedback dislikes not found" });

		const yourDislikeOnFeedback = dislikesUserToFeedback?.some(
			dislike => dislike === feedbackId
		);

		if (yourDislikeOnFeedback)
			return res.status(422).json({ message: "Dislike already exists" });

		dislikesUserToFeedback.push(feedbackId);

		await postCollection.save();

		return res.status(201).json({ message: "Dislike sucessfully added" });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "Error saving your dislike" });
	}
};

const removeDislike = async (req: NextApiRequest, res: NextApiResponse) => {
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

		const dislikesUserToFeedback = postCollection.feedbackList.find(
			f => f._id.toHexString() === feedbackTo
		);

		if (!dislikesUserToFeedback)
			return res.status(404).json({ message: "Feedback not found" });

		const removeToDislike = dislikesUserToFeedback.dislikes?.filter(
			dislike => dislike !== feedbackId
		);

		if (removeToDislike?.length === dislikesUserToFeedback.dislikes?.length)
			return res.status(404).json({ message: "Dislike not found" });

		dislikesUserToFeedback.dislikes = removeToDislike;

		await postCollection.save();

		return res.status(204).json({ message: "Dislike removed successfully" });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "Error removing dislike" });
	}
};

export { getDislikes, addDislike, removeDislike };
