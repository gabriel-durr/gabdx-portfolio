import { NextApiRequest, NextApiResponse } from "next";

export async function postUser(req: NextApiRequest, res: NextApiResponse) {
	try {
		const userFeedback = req.body;

		if (!userFeedback)
			return res.status(404).json({ error: "Feedback Not Provided!" });
	} catch (error) {}
}

//TODO criar as funções da API aqui (get, post ...), mudar para o next 13
