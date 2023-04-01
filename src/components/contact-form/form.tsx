import {ContactFormProps} from ".";

import axios from "axios";
import {useForm} from "react-hook-form";

import {
	Input,
	VStack,
	Button,
	Textarea,
	useToken,
	useToast,
	FormLabel,
	FormControl,
	FormErrorMessage,
	useColorModeValue,
} from "@chakra-ui/react";

type FormProps = Omit<ContactFormProps, "linkColor">;

type HookFormTypes = {
	name: string;
	email: string;
	textarea: string;
};

export const Form = ({formData, lang}: FormProps) => {
	const toast = useToast();
	const [focusBorderYellow, borderLight, borderDark] = useToken("colors", [
		"myColors.satinYellow",
		"light.600",
		"gray.300",
	]);

	const {
		handleSubmit,
		register,
		formState: {errors, isSubmitting, isSubmitted, isValid},
	} = useForm<HookFormTypes>();

	const isErrorExists = Boolean(Object.keys(errors).length);
	const isDisabled = (isSubmitted && !isValid) || isErrorExists;

	const notNumberRgx = /^[a-z \b\0]+$/i;
	const validEmailRgx = /^\S+@\S+$/i;
	const isNameError = !!errors.name;
	const isEmailError = !!errors.email;
	const isTextAreaError = !!errors.textarea;
	const isLangPtBr = lang === "pt-br";

	const borderInputMode = useColorModeValue(borderLight, borderDark);

	const onSubmit = async (data: HookFormTypes) => {
		await new Promise(resolve => setTimeout(resolve, 2000));

		axios
			.post("/api/mail", data)
			.then(() =>
				toast({
					title: `${
						isLangPtBr
							? "Mensagem enviada com Sucesso"
							: "Message sent sucessfully"
					} 🎉🎉🎉`,
					description: `${
						isLangPtBr
							? "Fique tranquilo, logo entrarei em contato"
							: "Don't worry, I'll be in touch soon"
					}!`,
					status: "success",
					position: "top",
					duration: 10000,
					isClosable: true,
				})
			)
			.catch(err => {
				console.error(err);
				toast({
					title: `${
						isLangPtBr
							? "Algo de errado, não esta certo"
							: "Something's wrong, it's not right"
					} 😵‍💫`,
					status: "error",
					position: "top",
					duration: 10000,
					isClosable: true,
				});
			});
	};

	return (
		<VStack
			as="form"
			onSubmit={handleSubmit(onSubmit)}
			noValidate
			align="center"
			flex={1}
			p={{base: ".4rem", md: "2rem"}}
			spacing={4}
			borderRadius="5px">
			<FormControl isInvalid={isNameError} isRequired>
				<FormLabel fontSize="1.1rem" fontFamily="Raleway">
					{formData.name}
				</FormLabel>
				<Input
					type="text"
					variant="unstyled"
					h="38px"
					pl="8px"
					rounded="sm"
					borderBottom={`1px solid ${isNameError ? "red" : borderInputMode}`}
					_focus={{
						boxShadow: "none",
						borderRadius: "md",
						border: `1px solid ${focusBorderYellow}`,
					}}
					placeholder={formData.namePlace!}
					{...register("name", {
						required: `${isLangPtBr ? "Nome Obrigatório" : "Name Required"}!`,
						maxLength: {
							value: 50,
							message: `${
								isLangPtBr
									? "Tamanho máximo de 50 caracteres"
									: "Maximum Size of 50 Characters"
							}`,
						},
						minLength: {
							value: 4,
							message: `${
								isLangPtBr
									? "Tamanho Minímo de 4 Caracteres"
									: "Minimum Size of 4 Characters"
							}`,
						},
						pattern: {
							value: notNumberRgx,
							message: `${
								isLangPtBr ? "Não é aceito Números" : "Numbers are not accepted"
							}!`,
						},
					})}
				/>
				<FormErrorMessage>
					{errors.name && errors.name.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={isEmailError} isRequired>
				<FormLabel fontWeight="medium" fontSize="1.1rem" fontFamily="Raleway">
					{formData.email}
				</FormLabel>
				<Input
					type="email"
					variant="unstyled"
					h="38px"
					pl="8px"
					rounded="sm"
					borderBottom={`1px solid ${isNameError ? "red" : borderInputMode}`}
					_focus={{
						boxShadow: "none",
						borderRadius: "md",
						border: `1px solid ${focusBorderYellow}`,
					}}
					placeholder={formData.emailPlace!}
					{...register("email", {
						required: `${
							isLangPtBr ? "E-mail Obrigatório" : "Required Email"
						}!`,
						maxLength: {
							value: 80,
							message: `${
								isLangPtBr
									? "Tamanho Máximo de 80 Caracteres"
									: "Maximum Size of 80 Characters"
							}`,
						},
						pattern: validEmailRgx,
					})}
				/>
				<FormErrorMessage>
					{errors.email && errors.email.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={isTextAreaError} isRequired>
				<FormLabel fontWeight="medium" fontFamily="Raleway">
					{formData.message}
				</FormLabel>
				<Textarea
					variant="unstyled"
					h={{base: "10rem", xl: "8.4rem", "2xl": "12rem"}}
					pl="8px"
					border={`1px solid ${borderInputMode}`}
					_focus={{
						border: `1px solid ${focusBorderYellow}`,
						boxShadow: "none",
					}}
					maxH="12rem"
					resize="vertical"
					placeholder={formData.messagePlace!}
					{...register("textarea", {
						required: `${
							isLangPtBr ? "Mensagem Obrigatória" : "Required Message"
						}!`,
						maxLength: {
							value: 1400,
							message: `${
								isLangPtBr
									? "Tamanho Máximo de 1400 Caracteres"
									: "Maximum Size of 1400 Characters"
							}`,
						},
					})}
				/>
				<FormErrorMessage>
					{errors.textarea && errors.textarea.message}
				</FormErrorMessage>
			</FormControl>

			<Button
				type="submit"
				isDisabled={isDisabled}
				isLoading={isSubmitting}
				rounded="sm"
				w="100%"
				h="2.3rem"
				fontFamily="DM Sans"
				fontSize=".98rem"
				letterSpacing="1.2px"
				textTransform="uppercase"
				bg="myColors.satinYellow"
				_hover={{
					filter: "contrast(80%)",
					transition: ".5s ease",
				}}
				color="whiteAlpha.900">
				{formData.submit}
			</Button>
		</VStack>
	);
};
