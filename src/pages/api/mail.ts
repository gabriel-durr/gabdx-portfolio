import { NextApiRequest, NextApiResponse } from "next";
import sendgrid from "@sendgrid/mail";

const sendgridApiKey = process.env.SENDGRID_API_KEY as string;

sendgrid.setApiKey(sendgridApiKey);

async function mail(req: NextApiRequest, res: NextApiResponse) {
	const { name, email, textarea } = req.body;

	const message = {
		to: "contato@gabrieldurr.site", // destinatario 👈
		from: "contato@gabrieldurr.site", // Auth email sendgrid
		subject: "Recebimento de Contato Formulário", // assunto
		html: `<b>${name}</b>
			   <p><b>${email}</b></p>
			   <p>${textarea}</p> `, //Conteúdo do email (textarea)
	};

	const autoEmail = {
		to: email,
		from: "contato@gabrieldurr.site",
		subject: "Contato Gabriel Dürr M.",
		html: `Olá, ${name}`,
		templateId: "d-d96cb460965440b28fd65844e0a05e87",
	};

	await sendgrid
		.send([message, autoEmail])
		.then(() => res.status(200).json({ success: true }))
		.catch(error => res.status(500).json({ error: error.message }));
}

export default mail;
