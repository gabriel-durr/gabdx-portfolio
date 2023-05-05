import { NextApiRequest, NextApiResponse } from "next";

import { openai } from "@services/openai-client";

const gbdxCustomModel = process.env.GBDX_MODEL as string;

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method, body } = req;

	const { userMessage } = body;

	try {
		if (method === "POST") {
			if (!userMessage)
				return res
					.status(422)
					.json({ message: "User text is required to be used in the prompt" });

			const { data } = await openai.createCompletion({
				model: gbdxCustomModel,
				prompt: userMessage + " ->",
				max_tokens: 500,
				stop: ["END"],
			});

			const botMessage = data.choices[0].text;

			return res.status(200).json(botMessage);
		}

		res.setHeader("Allow", ["GET"]);
		res.status(405).end(`Method ${method} Not Allowed`);
	} catch (err) {
		return res.status(500).json({ message: "Internal server error" });
	}
}

export default handler;
