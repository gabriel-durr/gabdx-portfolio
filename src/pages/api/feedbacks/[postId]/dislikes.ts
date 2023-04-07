import { dbConnect } from "@services/db-connect";
import {
	addDislike,
	removeDislike,
} from "@database/controllers/feedbacks-ctrls/dislikes-ctrls";

import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	await dbConnect();

	switch (method) {
		case "POST":
			await addDislike(req, res);
			break;

		case "DELETE":
			await removeDislike(req, res);
			break;

		default:
			res.setHeader("Allow", ["POST", "DELETE"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}

export default handler;
