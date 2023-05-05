import { NextApiRequest, NextApiResponse } from "next";
import sendgrid, { MailDataRequired } from "@sendgrid/mail";

const templateId = process.env.SENDGRID_MODEL_ID;
const sendgridApiKey = process.env.SENDGRID_API_KEY as string;

sendgrid.setApiKey(sendgridApiKey);

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { name, email, textarea } = req.body;

	const message: MailDataRequired = {
		to: "contato@gabrieldurr.site",
		from: "contato@gabrieldurr.site",
		subject: "Recebimento de Contato Formulário",
		html: `<b>${name}</b>
			   <p><b>${email}</b></p>
		       <p>${textarea}</p> `,
	};

	const autoEmail: MailDataRequired = {
		to: email,
		from: "contato@gabrieldurr.site",
		subject: "Contato Gabriel Dürr M.",
		html: `Olá, ${name}`,
		templateId,
	};

	try {
		await sendgrid.send([message, autoEmail]);

		return res.status(200).json({ sucess: true });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error });
	}
}

export default handler;
