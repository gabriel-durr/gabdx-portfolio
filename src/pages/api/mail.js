import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function mail(req, res) {
	const {name, email, textarea} = req.body;

	const message = {
		to: "gabriel.durr@outlook.com", // destinatario 👈
		from: "gabriel.durr@outlook.com", // Auth email sendgrid
		html: `<p><b>${name}</b> <b>${email}</b></p>
				<p>${textarea}</p> `, //Conteúdo do email (textarea)
	};

	const autoEmail = {
		to: email,
		from: "gabriel.durr@outlook.com",
		subject: "Contato Gabriel Dürr M.", // assunto
		html: `Olá, ${name}`,
		// templateId: "d-d96cb460965440b28fd65844e0a05e87", // Template SendGrid
	};

	await sendgrid
		.send([message, autoEmail])
		.then(() => res.status(200).json({success: true}))
		.catch(() => res.status(500).json({error: error.message}));
}

export default mail;
