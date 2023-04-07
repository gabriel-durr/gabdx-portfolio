import { dbConnect } from "@services/db-connect";
import { getAllFeedbacks } from "@database/controllers/feedbacks-ctrls/fedback-ctrl";

import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	try {
		await dbConnect();

		if (method === "GET") return await getAllFeedbacks(req, res);

		res.setHeader("Allow", ["GET"]);
		res.status(405).end(`Method ${method} Not Allowed`);
	} catch (err) {
		return res.status(500).json({ message: "Internal server error" });
	}
}

export default handler;
