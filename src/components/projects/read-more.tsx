import { motion } from "framer-motion";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

import { useState, ReactNode, Children } from "react";
import {
	Icon,
	VStack,
	Button,
	SimpleGrid,
	AbsoluteCenter,
} from "@chakra-ui/react";

type ReadMoreProps = {
	lang: string;
	children: ReactNode;
};

export const ReadMore = ({ children, lang }: ReadMoreProps) => {
	const [isReadMore, setIsReadMore] = useState(true);

	const toggleReadMore = () => {
		setIsReadMore(!isReadMore);
	};

	const readShowLang = {
		read: lang === "pt-br" ? "Ver mais" : "View more",
		show: lang === "pt-br" ? "Ocultar" : "hide",
	};

	const fullCards = children;
	const childrenList = Children.toArray(children);
	const twoCards = childrenList.slice(0, 2);

	return (
		<VStack spacing="14" align="center">
			<SimpleGrid
				columns={{ base: 1, lg: 2 }}
				justifyItems="center"
				spacing={4}>
				{isReadMore ? twoCards : fullCards}
			</SimpleGrid>

			<Button
				pos="relative"
				right="1%"
				w="200px"
				shadow="dark-lg"
				rounded="md"
				bg="gbdx.white"
				color="gbdx.black"
				cursor="pointer"
				fontWeight="bolder"
				textTransform="uppercase"
				fontSize={["1.07rem", "1.18rem"]}
				_hover={{
					color: "cyan.500",
					filter: "grayscale(.6)",
					transition: "0.7s ease",
				}}
				_light={{ color: "gray.500", "&:hover": { color: "#f5c245" } }}
				onClick={toggleReadMore}>
				{isReadMore ? readShowLang.read : readShowLang.show}

				<AbsoluteCenter
					as={motion.span}
					top={-8}
					left="42%"
					w="42px"
					h="36px"
					clipPath="polygon(0% 0%, 100% 0%, 50% 100%);"
					bg="purple.700"
					rounded="2xl"
					animate={{
						scale: 1.1,
						transition: {
							repeat: Infinity,
							repeatType: "reverse",
							duration: 1,
						},
					}}
					_light={{ bg: "gbdx.orangeVibrance" }}>
					{isReadMore ? (
						<Icon boxSize={7} as={FaAngleDown} />
					) : (
						<Icon boxSize={7} as={FaAngleUp} />
					)}
				</AbsoluteCenter>
			</Button>
		</VStack>
	);
};
