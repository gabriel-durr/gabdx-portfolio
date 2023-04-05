import { dbConnect } from "@services/db-connect";
import {
	getFeedback,
	createFeedback,
	updateFeedback,
	deleteFeedback,
} from "@database/controllers/feedbacks-ctrls";

import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	try {
		await dbConnect();

		switch (method) {
			case "GET":
				await getFeedback(req, res);
				break;

			case "POST":
				await createFeedback(req, res);
				break;

			case "PUT":
				await updateFeedback(req, res);
				break;

			case "DELETE":
				await deleteFeedback(req, res);
				break;
			default:
				res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
				res.status(405).end(`Method ${method} Not Allowed`);
		}
	} catch (err) {
		console.error(err);

		res.status(500).json("Internal server error");
	}
}

export default handler;
