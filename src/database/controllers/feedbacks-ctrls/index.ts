import { encrypt, decrypt } from "@utils/crypt-hash";
import FeedbackModel, { FeedbackUser } from "@database/model/feedback-schema";

import { Types } from "mongoose";
import { setCookie, parseCookies } from "nookies";

import { NextApiRequest, NextApiResponse } from "next";

type BodyDataUpdateFeedback = Partial<FeedbackUser>;
type BodyDataCreateFeedback = Omit<FeedbackUser, "userIp">;

const getFeedback = async (req: NextApiRequest, res: NextApiResponse) => {
	const { query, socket } = req;

	const { postId } = query;
	const userIp = socket.remoteAddress;

	try {
		if (!userIp || !postId)
			return res
				.status(422)
				.json({ message: "Query requirements not provided" });

		const postCollection = await FeedbackModel.findOne({ postId });

		if (!postCollection)
			return res.status(404).json({ message: "Post not found" });

		const { feedbackId } = parseCookies({ req });

		const userFeedback = postCollection.feedbackList.find(
			f => f._id.toHexString() === feedbackId && decrypt(f.userIp) === userIp
		);

		if (!userFeedback)
			return res.status(404).json({ message: "Feedback not found" });

		return res.status(200).json({ userFeedback });
	} catch (err) {
		console.error(err);

		res.status(404).json({ message: "Error get this feedback" });
	}
};

const createFeedback = async (req: NextApiRequest, res: NextApiResponse) => {
	const { body, query, socket } = req;

	const { postId } = query;
	const userIp = socket.remoteAddress;
	const { feedbackLevel, name, comment } = body as BodyDataCreateFeedback;

	try {
		if (!userIp || !postId)
			return res
				.status(422)
				.json({ message: "Query requeriments not provided" });

		if (!feedbackLevel || !name || !comment)
			return res
				.status(400)
				.json({ message: "Some required fields are missing" });

		const postCollection = await FeedbackModel.findOne({ postId });

		if (!postCollection)
			return res.status(404).json({ message: "PostId not found" });

		const { feedbackId } = parseCookies({ req });

		const userFeedback = postCollection.feedbackList.find(
			f => f._id.toHexString() === feedbackId && decrypt(f.userIp) === userIp
		);

		if (userFeedback)
			return res.status(400).json({ message: "Feedback already exists" });

		const newFeedbackId = new Types.ObjectId();
		const hashIp = encrypt(userIp);

		postCollection.feedbackList.push({
			_id: newFeedbackId,
			userIp: hashIp,
			feedbackLevel,
			name,
			comment,
		});

		await postCollection.save();

		const isProduction = process.env.NODE_ENV === "production";

		setCookie({ res }, "feedbackId", newFeedbackId.toHexString(), {
			expires: new Date("August 17 2100"),
			path: "/",
			httpOnly: isProduction,
			sameSite: isProduction ? "strict" : "none",
			secure: isProduction,
		});

		return res.status(201).json({ message: "Feedback created successfully" });
	} catch (err) {
		console.error(err);

		return res.status(400).json({
			message: "Creation of the feedback unsuccessfully",
		});
	}
};

const updateFeedback = async (req: NextApiRequest, res: NextApiResponse) => {
	const { body, query, socket } = req;

	const { postId } = query;
	const userIp = socket.remoteAddress;
	const updatedFields = body as BodyDataUpdateFeedback;

	try {
		const postCollection = await FeedbackModel.findOne({ postId });

		if (!postCollection) {
			return res.status(404).json({ message: "PostId not found" });
		}

		const { feedbackId } = parseCookies({ req });

		const userFeedback = postCollection.feedbackList.find(
			f => f._id.toHexString() === feedbackId && decrypt(f.userIp) === userIp
		);

		if (!userFeedback) {
			return res.status(404).json({ message: "Feedback not found" });
		}

		Object.assign(userFeedback, updatedFields);

		await postCollection.save();

		return res.status(200).json({ userFeedback });
	} catch (err) {
		console.error(err);

		return res
			.status(400)
			.json({ message: "Update of the feedback unsuccessfully" });
	}
};

const deleteFeedback = async (req: NextApiRequest, res: NextApiResponse) => {
	const { query, socket } = req;

	const { postId } = query;
	const userIp = socket.remoteAddress;
	const { feedbackId } = parseCookies({ req });

	try {
		if (!userIp || !postId || !feedbackId)
			return res
				.status(422)
				.json({ message: "Query requirements not provided" });

		const postCollection = await FeedbackModel.findOne({ postId });

		const userIpDecrypt = postCollection?.feedbackList.find(
			f => f._id.toHexString() === feedbackId && decrypt(f.userIp) === userIp
		);

		//TODO arrumar querys desbecessárias

		const filter = { postId };
		const update = {
			$pull: { feedbackList: { userIp: userIpDecrypt?.userIp } },
		};

		const feedbackBeforeUpdate = await FeedbackModel.findOne(filter);

		const deletedFeedback = await FeedbackModel.findOneAndUpdate(
			filter,
			update,
			{ new: true }
		);

		const isFeddbackDeleted =
			feedbackBeforeUpdate?.feedbackList.length ===
			deletedFeedback?.feedbackList.length;

		if (isFeddbackDeleted)
			return res.status(404).json({ message: "Feedback not found" });

		return res.status(200).json({ message: "Feedback sucessfully deleted" });
	} catch (err) {
		console.error(err);

		res.status(500).json({ message: "Error deleting feedback" });
	}
};

export { getFeedback, createFeedback, updateFeedback, deleteFeedback };
