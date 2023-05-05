import { Configuration, OpenAIApi } from "openai";

const org = process.env.OPENAI_ORG;
const openaiKey = process.env.OPENAI_KEY;

const configuration = new Configuration({
	organization: org,
	apiKey: openaiKey,
});

const openai = new OpenAIApi(configuration);

export { openai };
