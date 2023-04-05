import FeedbackModel from "@database/model/feedback-schema";

import { parseCookies } from "nookies";
import { NextApiRequest, NextApiResponse } from "next";

type RequestBody = {
	reporterTo: string;
	reportedByName: string;
	message: string;
};

const createReport = async (req: NextApiRequest, res: NextApiResponse) => {
	const { body, query } = req;

	const { feedbackId } = parseCookies({ req });

	const { postId } = query;
	const { reportedByName, message, reporterTo } = body as RequestBody;

	try {
		if (!postId || !feedbackId || !reportedByName || !message || !reporterTo)
			return res.status(422).json({ message: "Missing required data" });

		const postCollection = await FeedbackModel.findOne({ postId });

		if (!postCollection)
			return res.status(404).json({ message: "Post not found" });

		const feedbackReported = postCollection?.feedbackList.find(
			f => f._id.toHexString() === reporterTo
		);

		if (!feedbackReported)
			return res.status(404).json({ message: "Feedback reported not found" });

		const yourReportsOnFeedback =
			feedbackReported?.reports?.filter(r => r.reportedBy_Id === feedbackId) ||
			[];

		const isMoreThanFiveYourReports = yourReportsOnFeedback?.length === 2;

		if (isMoreThanFiveYourReports)
			return res.status(400).json({
				message: "You cannot create more reports for this feedback",
			});

		feedbackReported.reports?.push({
			message,
			reportedByName,
			reportedBy_Id: feedbackId,
		});

		await postCollection.save();

		return res.status(201).json({ message: "Report sucessfully created" });
	} catch (err) {
		console.error(err);

		return res.status(500).json({ message: "Error creating report" });
	}
};

export { createReport };
