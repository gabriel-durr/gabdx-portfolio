import FeedbackModel from "@database/model/feedback-schema";

import { NextApiRequest, NextApiResponse } from "next";

const getAllFeedbacks = async (res: NextApiResponse) => {
	try {
		const feedbackListOfPosts = await FeedbackModel.find({}).select(
			"postId feedbackList"
		);

		if (!feedbackListOfPosts)
			return res.status(404).json({ message: "No feedback found on posts" });

		return res.status(200).json({ feedbackListOfPosts });
	} catch (err) {
		return res.status(500).json({ message: "Error fetching feedbacks" });
	}
};

const removeFeedback = async (req: NextApiRequest, res: NextApiResponse) => {
	const { query } = req;

	const { idPost, feedbackId } = query;

	try {
		if (!idPost || !feedbackId)
			return res.status(400).json({
				message:
					"It is necessary to inform the _id of the post and the feedback",
			});

		await FeedbackModel.updateOne(
			{ _id: idPost },
			{ $pull: { feedbackList: { feedbackId: feedbackId } } }
		);

		return res.json({ message: "Feedback sucessfully deleted" });
	} catch (err) {
		return res.status(500).json({ message: "Error deleting feedback spam" });
	}
};

export { getAllFeedbacks, removeFeedback };
