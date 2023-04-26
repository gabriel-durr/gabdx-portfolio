import { Document, Model, Schema, model, models } from "mongoose";

interface BanLocationTypes extends Document {
	userIp: string;
	reason: string;
}

const BanLocation = new Schema<BanLocationTypes>({
	userIp: { type: String, required: true },
	reason: { type: String, required: true },
});

const BanLocationModel: Model<BanLocationTypes> =
	models["BanLocation"] || model("BanLocation", BanLocation);

export default BanLocationModel;
