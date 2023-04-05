import { Document, model, models, Schema, Model, Types } from "mongoose";

export interface FeedbackUser {
	_id: Types.ObjectId;
	userIp: string;
	createdAt?: Date;
	feedbackLevel: string;
	name: string;
	comment: string;
	likes?: String[];
	reports?: {
		reportedBy_Id: String;
		reportedByName: String;
		message: string;
	}[];
}
export interface FeedbackDocument extends Document {
	postId: string;
	feedbackList: FeedbackUser[];
}

const feedbackUserSchema = new Schema<FeedbackUser>({
	_id: {
		type: Schema.Types.ObjectId,
		default: () => new Types.ObjectId(),
	},
	userIp: { type: String, required: true },
	createdAt: { type: Date, default: Date.now, required: true, immutable: true },
	feedbackLevel: { type: String, required: true },
	name: { type: String, required: true },
	comment: { type: String, required: true },
	likes: { type: [String], required: true, default: [] },
	reports: {
		type: [
			{
				reportedBy_Id: { type: String, required: true },
				reportedByName: { type: String, required: true },
				message: { type: String, required: true },
			},
		],
		required: true,
		default: [],
	},
});

const feedbackSchema = new Schema<FeedbackDocument>({
	postId: { type: String, required: true, unique: true },
	feedbackList: { type: [feedbackUserSchema], required: true },
});

const FeedbackModel: Model<FeedbackDocument> =
	models["Feedback"] || model("Feedback", feedbackSchema);

export { Types };
export default FeedbackModel;
