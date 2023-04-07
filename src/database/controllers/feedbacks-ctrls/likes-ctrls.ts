import FeedbackModel from "@database/model/feedback-schema";

import { parseCookies } from "nookies";
import { NextApiRequest, NextApiResponse } from "next";

type RequestBody = {
	feedbackTo: string;
};

//TODO criar um aviso de pedido de utilização de cookies na home, e enviar uma status de erro pra só aceitar requests se o usuário já fez algum feedback, ou seja ele só vai poder curtir, denunciar, etc se ele já fez algum comentário.

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

		const feedback = postCollection?.feedbackList.find(
			f => f._id.toHexString() === feedbackTo
		);

		if (!feedback)
			return res.status(404).json({ message: "Feedback not found" });

		const likes = feedback.likes || [];
		const dislikes = feedback.dislikes || [];

		const yourLikeOnFeedback = likes.some(like => like === feedbackId);
		const yourDislikeOnFeedback = dislikes.some(
			dislike => dislike === feedbackId
		);

		if (yourLikeOnFeedback)
			return res.status(422).json({ message: "Like already exists" });

		const updatedLikes = [...likes, feedbackId];
		const updatedDislikes = yourDislikeOnFeedback
			? dislikes.filter(dislike => dislike !== feedbackId)
			: dislikes;

		feedback.likes = updatedLikes;
		feedback.dislikes = updatedDislikes;

		await postCollection.save();

		return res.status(201).json({ message: "Like successfully added" });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "Error saving your like" });
	}
};

const removeLike = async (req: NextApiRequest, res: NextApiResponse) => {
	const { query } = req;

	const { postId, feedbackTo } = query;
	const { feedbackId } = parseCookies({ req });

	try {
		if (!postId || !feedbackTo || !feedbackId)
			return res.status(422).json({ message: "Missing required data" });

		const postCollection = await FeedbackModel.findOne({ postId });

		if (!postCollection)
			return res.status(404).json({ message: "Post collection not found" });

		const feedback = postCollection.feedbackList.find(
			f => f._id.toHexString() === feedbackTo
		);

		if (!feedback)
			return res.status(404).json({ message: "Feedback not found" });

		const likes = feedback.likes || [];

		const updatedLikes = likes.filter(like => like !== feedbackId);

		feedback.likes = updatedLikes;

		const dislikes = feedback.dislikes || [];

		const updatedDislikes = dislikes.filter(dislike => dislike !== feedbackId);

		feedback.dislikes = updatedDislikes;

		await postCollection.save();

		return res.status(204).json({ message: "Like removed successfully" });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "Error removing like" });
	}
};

export { addLike, removeLike };
