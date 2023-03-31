import * as prismic from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";

import { NextApiRequest, NextApiResponse } from "next";
import { linkResolver, repositoryName } from "@services/prismicio";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.body.type === "api-update" && req.body.documents.length > 0) {
		if (req.body.secret !== process.env.PRISMIC_WEBHOOK_SECRET) {
			return res.status(401).json({ message: "Invalid token" });
		}

		const client = prismic.createClient(repositoryName);

		const documents = await client.getAllByIDs(req.body.documents, {
			lang: "*",
		});
		const urls = documents.map(doc => prismicH.asLink(doc, linkResolver));

		try {
			await Promise.all(urls.map(async url => await res.revalidate(url!)));

			return res.json({ revalidated: true });
		} catch (err) {
			return res.status(500).send("Error revalidating");
		}
	}

	return res.status(400).json({ message: "Invalid body" });
}
