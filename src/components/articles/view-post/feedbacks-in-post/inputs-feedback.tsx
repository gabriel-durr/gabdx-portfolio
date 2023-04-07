import { motion } from "framer-motion";
import { TfiClose } from "react-icons/tfi";
import { AiOutlineSend } from "react-icons/ai";

import { useState } from "react";
import {
	Image,
	Input,
	VStack,
	HStack,
	Heading,
	useToken,
	IconButton,
	InputGroup,
	FormControl,
	InputRightElement,
	useColorModeValue,
} from "@chakra-ui/react";

export const InputsFeedbacks = () => {
	const emojisData = ["terrible", "bad", "regular", "good", "excellent"];
	const [emojis, setEmojis] = useState<string[]>([]);

	const [focusBorderYellow, borderLight, borderDark] = useToken("colors", [
		"myColors.satinYellow",
		"light.600",
		"gray.300",
	]);
	const borderInputMode = useColorModeValue(borderLight, borderDark);

	const isSelectedEmoji = Boolean(emojis.length === 1);

	const handleEmoji = (emojiSelect: string[]) => {
		setEmojis(emojiSelect);
	};

	return (
		<VStack bg="whiteAlpha.400" w="100%" rounded="sm" p="2rem" spacing={8}>
			<Heading size="md">Digite seu comentário</Heading>
			<HStack spacing={8}>
				{isSelectedEmoji ? (
					<HStack spacing={8}>
						<Image
							as={motion.img}
							boxSize={50}
							whileHover={{ scale: 1.2 }}
							cursor="pointer"
							alt="good"
							src={`/emojis/${emojis[0]}.gif`}
						/>

						<IconButton
							aria-label="restart emojis"
							size="md"
							fontSize="3xl"
							color="red.400"
							_hover={{ color: "red.600", fontWeight: "bold" }}
							icon={<TfiClose />}
							onClick={() => handleEmoji(emojisData)}
						/>
					</HStack>
				) : (
					emojisData.map(emoji => (
						<Image
							key={emoji}
							as={motion.img}
							boxSize={50}
							whileHover={{ scale: 1.2 }}
							cursor="pointer"
							alt="good"
							src={`/emojis/${emoji}.gif`}
							onClick={() => handleEmoji([emoji])}
						/>
					))
				)}
			</HStack>

			<VStack p="2rem" spacing={4} w="72%">
				<FormControl>
					<Input
						type="text"
						variant="unstyled"
						h="38px"
						pl="8px"
						rounded="sm"
						borderBottom={`1px solid ${borderInputMode}`}
						_focus={{
							boxShadow: "none",
							borderBottom: `1px solid ${focusBorderYellow}`,
						}}
						placeholder="Digite seu nome"
					/>
				</FormControl>

				<HStack w="100%" justify="space-between" align="end">
					<FormControl pos="relative">
						<InputGroup>
							<Input
								type="text"
								variant="unstyled"
								h="38px"
								pl="8px"
								pr="4rem"
								rounded="sm"
								borderBottom={`1px solid ${borderInputMode}`}
								_focus={{
									boxShadow: "none",
									borderBottom: `1px solid ${focusBorderYellow}`,
								}}
								placeholder="Digite seu comentário"
							/>
							<InputRightElement>
								<IconButton
									pos="absolute"
									right={2}
									bottom={0}
									fontSize="xl"
									aria-label="Send icon"
									_hover={{ color: "green.400", transition: "color .2s ease" }}
									icon={<AiOutlineSend />}
								/>
							</InputRightElement>
						</InputGroup>
					</FormControl>
				</HStack>
			</VStack>
		</VStack>
	);
};
