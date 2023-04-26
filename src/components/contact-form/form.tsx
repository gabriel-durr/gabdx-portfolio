import { ContactFormProps } from ".";
import { contactFormLang } from "@utils/lang-formatter";

import axios from "axios";
import { HiMail } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { BsPersonVcardFill } from "react-icons/bs";

import {
	Icon,
	Input,
	VStack,
	Button,
	Textarea,
	useToast,
	FormLabel,
	InputGroup,
	FormControl,
	FormErrorMessage,
	InputRightElement,
} from "@chakra-ui/react";

type FormProps = Omit<ContactFormProps, "linkColor">;

type HookFormTypes = {
	name: string;
	email: string;
	textarea: string;
};

export const Form = ({ formData, lang }: FormProps) => {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting, isSubmitted, isValid },
	} = useForm<HookFormTypes>();

	const isErrorExists = Boolean(Object.keys(errors).length);
	const isDisabled = (isSubmitted && !isValid) || isErrorExists;

	const notNumberRgx = /^[a-z \b\0]+$/i;
	const validEmailRgx = /^\S+@\S+$/i;
	const isNameError = !!errors.name;
	const isEmailError = !!errors.email;
	const isTextAreaError = !!errors.textarea;

	const { toastLang, inputName, inputEmail, inputTextarea } =
		contactFormLang(lang);

	const teenSeconds = 10 * 1000;

	const toast = useToast({
		position: "top",
		duration: teenSeconds,
		isClosable: true,
	});

	const onSubmit = async ({ name, email, textarea }: HookFormTypes) => {
		await new Promise(resolve => setTimeout(resolve, 1400));

		try {
			await axios.post("/api/mail", {
				name,
				email,
				textarea,
			});

			toast({
				title: `${toastLang.sucess.title} 🎉🎉🎉`,
				description: toastLang.sucess.description,
				status: "success",
			});
		} catch (err) {
			console.error(err);

			toast({
				title: `${toastLang.error.title} 😵‍💫`,
				status: "error",
			});
		}
	};

	return (
		<VStack
			as="form"
			onSubmit={handleSubmit(onSubmit)}
			noValidate
			align="center"
			flex={1}
			p={{ base: ".4rem", md: "2rem" }}
			spacing={4}
			borderRadius="5px">
			<FormControl isInvalid={isNameError} isRequired>
				<FormLabel fontSize="1.1rem" fontFamily="body">
					{formData.name}
				</FormLabel>
				<InputGroup>
					<InputRightElement h="full">
						<Icon fontSize="17px" as={BsPersonVcardFill} />
					</InputRightElement>
					<Input
						variant="gdxInput"
						placeholder={formData.namePlace!}
						{...register("name", {
							required: inputName.requiredMsg,
							maxLength: {
								value: 50,
								message: inputName.maxMsg,
							},
							minLength: {
								value: 4,
								message: inputName.minMsg,
							},
							pattern: {
								value: notNumberRgx,
								message: inputName.patternMsg,
							},
						})}
					/>
				</InputGroup>
				<FormErrorMessage>
					{errors.name && errors.name.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={isEmailError} isRequired>
				<FormLabel fontWeight="medium" fontSize="1.1rem" fontFamily="body">
					{formData.email}
				</FormLabel>

				<InputGroup>
					<InputRightElement h="full">
						<Icon fontSize="20px" as={HiMail} />
					</InputRightElement>

					<Input
						type="email"
						variant="gdxInput"
						placeholder={formData.emailPlace!}
						{...register("email", {
							required: inputEmail.requiredMsg,
							maxLength: {
								value: 80,
								message: inputEmail.maxMsg,
							},
							pattern: {
								value: validEmailRgx,
								message: inputEmail.patternMsg,
							},
						})}
					/>
				</InputGroup>

				<FormErrorMessage>
					{errors.email && errors.email.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={isTextAreaError} isRequired>
				<FormLabel fontWeight="medium" fontFamily="body">
					{formData.message}
				</FormLabel>
				<Textarea
					variant="gdxTextarea"
					placeholder={formData.messagePlace!}
					{...register("textarea", {
						required: inputTextarea.requiredMsg,
						maxLength: {
							value: 1400,
							message: inputTextarea.maxMsg,
						},
					})}
				/>
				<FormErrorMessage>
					{errors.textarea && errors.textarea.message}
				</FormErrorMessage>
			</FormControl>

			<Button
				variant="gdxSolidButton"
				type="submit"
				isDisabled={isDisabled}
				isLoading={isSubmitting}
				role="button">
				{formData.submit}
			</Button>
		</VStack>
	);
};
