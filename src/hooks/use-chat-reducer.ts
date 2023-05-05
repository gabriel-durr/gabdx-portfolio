import { useReducer } from "react";

type UserMessage = {
	text: string;
	from: "user";
};

type BotMessage = {
	text: string;
	from: "bot";
};

type Action =
	| { type: "ADD_USER_MESSAGE"; payload: UserMessage }
	| { type: "ADD_BOT_MESSAGE"; payload: BotMessage };

type State = {
	messages: (UserMessage | BotMessage)[];
};

const initialState: State = {
	messages: [
		{
			from: "bot",
			text: "Olá, sou a gbdx-assistant, e posso esclarecer dúvidas a respeito da história e futuro projeto",
		},
	],
};

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case "ADD_USER_MESSAGE":
			return {
				messages: [...state.messages, action.payload],
			};
		case "ADD_BOT_MESSAGE":
			return {
				messages: [...state.messages, action.payload],
			};
		default:
			return state;
	}
}

export const useChatReducer = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	function handleUserMessage(text: string) {
		const userMessage: UserMessage = { text, from: "user" };

		dispatch({ type: "ADD_USER_MESSAGE", payload: userMessage });
	}

	function handleBotMessage(text: string) {
		const botMessage: BotMessage = { text, from: "bot" };

		dispatch({ type: "ADD_BOT_MESSAGE", payload: botMessage });
	}

	return { messages: state.messages, handleUserMessage, handleBotMessage };
};
