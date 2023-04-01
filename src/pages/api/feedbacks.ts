import { NextApiRequest, NextApiResponse } from "next";

//TODO criar api para cadastrar feedbacks de usuários, criar schema no mongo de acordo e connection...

const feebacks = [
	{
		name: "Gabriel Dürr",
		emoji: "😄",
		content: "eu gostei, porém isso poderia ter ficado bla bla bla",
	},

	{
		name: "Larissa Sthefany",
		emoji: "🫠",
		content: "Não entendi essa parte aqui aiduaiosdas, mas ok",
	},
];

async function feedbacks(req: NextApiRequest, res: NextApiResponse) {
	const {
		method,
		body,
		query: { del },
	} = req;

	const { name, emoji, content } = body;

	switch (method) {
		case "GET":
			const qdtFeedbacks = feebacks.length;

			res.status(200).json({
				message: "Quantida de feedbacks disponível:",
				qdtFeedbacks,
				feebacks,
			});

			break;

		case "POST":
			const userExist = feebacks.some(user => user.name === name);

			if (userExist) {
				feebacks.forEach(user => {
					if (user.name === name) {
						user;
					}
				});
			} else {
				feebacks.push({
					name,
					emoji,
					content,
				});

				res
					.status(201)
					.send(`Client ${name} criou um feedback com sucesso! 🤘⚡`);
			}

			break;
		case "DELETE":
			let feedbackIndex = feebacks.findIndex(feedback => feedback.name === del);

			feebacks.splice(feedbackIndex, 1);

			res.status(201).send(`feedback apagado com sucesso! ❌`);

			break;
	}
}

export default feedbacks;
