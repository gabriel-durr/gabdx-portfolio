import { motion } from "framer-motion";
import { Content } from "@prismicio/client";
import { getTimeGreeting } from "@utils/get-time-greeting";
import { useTypewriter, Cursor } from "react-simple-typewriter";

import { useEffect, useState } from "react";
import { Text, useColorModeValue } from "@chakra-ui/react";

type GreetingProps = Pick<Content.HomeDocument, "lang">;

export const Greeting = ({ lang }: GreetingProps) => {
	const [greeting, setGreeting] = useState("");

	const textShadowMode = useColorModeValue(
		"0 0 22px #4b30c4",
		"0 0 22px #ffee10"
	);

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
			mb={5}
			fontWeight="bold"
			color="goldenrod"
			textShadow={textShadowMode}
			fontSize={{ base: ".9rem", md: "1.1rem" }}>
			{text}
			<Text as="span" fontWeight="bold" fontSize="2xl">
				<Cursor cursorStyle="⚡" />
			</Text>
		</Text>
	);
};
