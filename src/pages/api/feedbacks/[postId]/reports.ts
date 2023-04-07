import { dbConnect } from "@services/db-connect";
import { createReport } from "@database/controllers/feedbacks-ctrls/reports-ctrls";

import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	try {
		await dbConnect();

		if (method === "POST") return await createReport(req, res);

		res.setHeader("Allow", ["POST"]);
		res.status(405).end(`Method ${method} Not Allowed`);
	} catch (err) {
		return res.status(500).json({ message: "Internal server error" });
	}
}

export default handler;
