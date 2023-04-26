import { NextApiRequest, NextApiResponse } from "next";

import twilio from "twilio";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method, body } = req;

	const { message } = body;

	const accountSid = process.env.TWILIO_ACC_SID;
	const authToken = process.env.TWILIO_TOKEN;
	const twilioPhone = process.env.TWILIO_PHONE;
	const myPhone = process.env.MY_PHONE!;

	const client = twilio(accountSid, authToken);

	try {
		if (method !== "POST") {
			res.setHeader("Allow", ["POST"]);
			return res.status(405).end(`Method ${method} Not Allowed`);
		}

		await client.messages.create({
			from: twilioPhone,
			to: myPhone,
			body: message,
		});

		return res
			.status(200)
			.json({ message: "WathsApp message sent succesfully" });
	} catch (err) {
		console.error(err);

		return res.status(500).json({ message: "Error sending sms notification" });
	}
}

export default handler;
