import { dbConnect } from "@services/db-connect";
import {
	addLike,
	getLikes,
	removeLike,
} from "@database/controllers/feedbacks-ctrls/likes-ctrls";

import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	await dbConnect();

	switch (method) {
		case "GET":
			await getLikes(req, res);

		case "POST":
			await addLike(req, res);
			break;

		case "DELETE":
			await removeLike(req, res);
			break;

		default:
			res.setHeader("Allow", ["GET", "POST", "DELETE"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}

export default handler;
