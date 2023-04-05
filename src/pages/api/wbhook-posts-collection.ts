import { postCollections } from "@database/controllers/post-collections-ctrls";

import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	if (method === "POST") await postCollections(req, res);

	res.setHeader("Allow", ["POST"]);
	res.status(405).end(`Method ${method} Not Allowed`);
}

export default handler;
