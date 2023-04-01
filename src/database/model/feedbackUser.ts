import {Schema, models, model} from "mongoose";

const feedbackUserSchema = new Schema({
	name: String,
	emoji: String,
	content: Array,
});

//TODO criar schema para o feedback dos usuários
