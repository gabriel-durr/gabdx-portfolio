import { dbConnect } from "@services/db-connect";
import FeedbackModel from "@database/model/feedback-schema";

import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method, query, socket } = req;

	const { postId } = query;
	const userIp = socket.remoteAddress;

	switch (method) {
		case "GET":
			try {
				await dbConnect();

				if (!userIp || !postId)
					return res
						.status(422)
						.json({ message: "Query requirements not provided" });

				const postCollection = await FeedbackModel.findOne({ postId });

				if (!postCollection)
					return res.status(404).json({ message: "PostId not found." });

				const feedbackList = postCollection?.feedbackList;

				if (!feedbackList)
					return res.status(404).json({ message: "Feedbacks not found" });

				const totalFeedbacks = postCollection.feedbackList.map(
					f => f.feedbackLevel
				).length;

				return res.status(200).json({ feedbackList, totalFeedbacks });
			} catch (err: any) {
				console.error(err.message);

				res.status(500).json({ message: "Internal server error" });
			}

			break;

		default:
			res.setHeader("Allow", ["GET"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}

export default handler;
