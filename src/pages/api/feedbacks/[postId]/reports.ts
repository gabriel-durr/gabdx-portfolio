import { createReport } from "@database/controllers/feedbacks-ctrls/reports-ctrls";

import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	if (method === "POST") await createReport(req, res);

	res.setHeader("Allow", ["POST"]);
	res.status(405).end(`Method ${method} Not Allowed`);
}

export default handler;
