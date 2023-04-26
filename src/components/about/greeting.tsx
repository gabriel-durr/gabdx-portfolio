import { motion } from "framer-motion";
import { Content } from "@prismicio/client";
import { getTimeGreeting } from "@utils/get-time-greeting";
import { useTypewriter, Cursor } from "react-simple-typewriter";

import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";

type GreetingProps = Pick<Content.HomeDocument, "lang">;

export const Greeting = ({ lang }: GreetingProps) => {
	const [greeting, setGreeting] = useState("");

	const content = [
		`Gabriel ${lang === "pt-br" ? "aqui" : "here"}`,
		`${
			lang === "pt-br"
				? "Sou Desenvolvedor Front-end Web/Mobile"
				: "I'am Front-end Developer Web/Mobile"
		}`,
		`${lang === "pt-br" ? "e UI Designer" : "and UI Designer"}`,
	];

	const [text] = useTypewriter({
		words: [greeting, ...content],
		loop: true,
		typeSpeed: 120,
		deleteSpeed: 80,
	});

	useEffect(() => {
		const currentTime = new Date().getHours();
		const timeGreeting = getTimeGreeting(currentTime, lang);
		setGreeting(timeGreeting);
	}, [lang]);

	return (
		<Text
			as={motion.p}
			my={4}
			fontWeight="bold"
			color="goldenrod"
			textShadow="0 0 22px #4b30c4"
			fontSize={{ base: 14, md: "subText" }}
			_light={{
				textShadow: "0 0 22px #ffee10",
			}}>
			{text}
			<Text as="span" fontWeight="bold" fontSize="2xl">
				<Cursor cursorStyle="⚡" />
			</Text>
		</Text>
	);
};
