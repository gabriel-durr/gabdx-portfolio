import { inputsFeedbackLang } from "@utils/lang-formatter";
import { useFeedback, CreateFeedbackType } from "@hooks/use-feedbacks";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { TfiClose } from "react-icons/tfi";
import { AiOutlineSend } from "react-icons/ai";

import { useState } from "react";
import {
	Image,
	Input,
	VStack,
	HStack,
	Heading,
	IconButton,
	InputGroup,
	Textarea,
	FormControl,
	FormErrorMessage,
} from "@chakra-ui/react";

type InputFeedbacksFormType = CreateFeedbackType;

type EmojisType = InputFeedbacksFormType["feedbackLevel"];

type InputsFeedbacksProps = {
	lang: string;
	cookieFeedbackId: string;
};
export const InputsFeedbacks = ({
	lang,
	cookieFeedbackId,
}: InputsFeedbacksProps) => {
	const [emojis, setEmojis] = useState<EmojisType[]>([]);
	const { createFeedback } = useFeedback();

	const {
		register,
		setValue,
		handleSubmit,
		resetField,
		formState: { errors },
	} = useForm<InputFeedbacksFormType>();

	const emojisData: EmojisType[] = [
		"terrible",
		"bad",
		"regular",
		"good",
		"excellent",
	];

	const isSelectedEmoji = Boolean(emojis.length === 1);
	const isFeedbackHasBeenCreated = Boolean(cookieFeedbackId?.length ?? "");

	function handleEmoji(emojiSelect: EmojisType[]) {
		setEmojis(emojiSelect);

		if (emojiSelect.length === 1)
			return setValue("feedbackLevel", emojiSelect[0]);

		resetField("feedbackLevel");
	}

	async function onSubmit(data: InputFeedbacksFormType) {
		try {
			await createFeedback(data);
		} catch (err) {
			console.error(err);
		}
	}

	const {
		emojiLang,
		feedbackTitle,
		feedbackForm: { inputName, inputComment },
	} = inputsFeedbackLang(lang);

	register("feedbackLevel", {
		required: emojiLang.requireMsg,
	});

	return (
		<VStack
			onSubmit={handleSubmit(onSubmit)}
			w="full"
			boxShadow="0px 1px 1px 1px #24242413"
			rounded="sm"
			spacing={8}
			_light={{ shadow: "sm" }}
			p={{ base: 4, md: 8 }}
		>
			<FormControl
				isInvalid={!!errors.feedbackLevel}
				flexDir="column"
				display="flex"
				gap={8}
				alignItems="center"
			>
				<Heading size="md">{feedbackTitle}</Heading>

				{isSelectedEmoji ? (
					<HStack spacing={8}>
						<Image
							as={motion.img}
							boxSize={{ base: 12, md: 50 }}
							whileHover={{ scale: 1.2 }}
							cursor="pointer"
							alt={`${emojiLang.altSelected}: "${emojis[0]}"`}
							src={`/emojis/${emojis[0]}.gif`}
						/>

						<IconButton
							size={{ base: "sm", md: "md" }}
							fontSize={{ base: "xl", md: "3xl" }}
							variant="unstyled"
							color="red.400"
							_hover={{ color: "red.600", fontWeight: "bold" }}
							icon={<TfiClose />}
							aria-label={emojiLang.restartEmojis}
							onClick={() => handleEmoji(emojisData)}
						/>
					</HStack>
				) : (
					<HStack justify="center" spacing={{ base: 6, md: 8 }}>
						{emojisData.map(emoji => (
							<Image
								key={emoji}
								as={motion.img}
								boxSize={{ base: 10, md: 50 }}
								whileHover={{ scale: 1.2 }}
								cursor="pointer"
								alt={emojiLang.allEmojis}
								src={`/emojis/${emoji}.gif`}
								onClick={() => handleEmoji([emoji])}
							/>
						))}
					</HStack>
				)}

				<FormErrorMessage>
					{errors.feedbackLevel && errors.feedbackLevel.message}
				</FormErrorMessage>
			</FormControl>

			<VStack
				as="form"
				noValidate
				spacing={4}
				p={{ base: 2, md: 8 }}
				w={{ base: "full", md: "72%" }}
			>
				{!isFeedbackHasBeenCreated && (
					<FormControl isInvalid={!!errors.name}>
						<Input
							{...register("name", {
								required: inputName.requiredMsg,
								minLength: { value: 4, message: inputName.minMsg },
							})}
							variant="gdxInput"
							placeholder={inputName.placeholder}
						/>
						<FormErrorMessage>
							{errors.name && errors.name.message}
						</FormErrorMessage>
					</FormControl>
				)}

				<HStack w="full" justify="space-between" align="end">
					<FormControl pos="relative" isInvalid={!!errors.comment}>
						<InputGroup pos="relative">
							<Textarea
								{...register("comment", {
									required: inputComment.requiredMsg,
									minLength: { value: 8, message: inputComment.minMsg },
								})}
								variant="gdxComment"
								placeholder={inputComment.placeholder}
							/>

							<IconButton
								type="submit"
								variant="unstyled"
								pos="absolute"
								bottom={2}
								right={4}
								display="flex"
								size="sm"
								fontSize="xl"
								aria-label={inputComment.submitLabel}
								_hover={{
									color: "gbdx.sun",
									transition: "color .2s ease",
								}}
								icon={<AiOutlineSend />}
							/>
						</InputGroup>

						<FormErrorMessage>
							{errors.comment && errors.comment.message}
						</FormErrorMessage>
					</FormControl>
				</HStack>
			</VStack>
		</VStack>
	);
};
