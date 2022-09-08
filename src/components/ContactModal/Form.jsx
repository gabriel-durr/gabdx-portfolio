import axios from "axios";
import {useForm} from "react-hook-form";
import {
	Textarea,
	ModalFooter,
	FormControl,
	FormLabel,
	Input,
	VStack,
	Button,
	FormErrorMessage,
	useToast,
} from "@chakra-ui/react";

export const Form = ({contact, initialRef}) => {
	const toast = useToast();

	const {
		handleSubmit,
		register,
		formState: {errors, isSubmitting},
	} = useForm();

	const onSubmit = async data => {
		await new Promise(resolve => setTimeout(resolve, 2000));

		axios
			.post("/api/mail", data)
			.then(() =>
				toast({
					title: "Enviado com Sucesso! 🎉🎉🎉",
					description: "Logo você será respondido!",
					status: "success",
					position: "top",
					duration: "10000",
					isClosable: true,
				})
			)
			.catch(err => {
				console.log(err);
				toast({
					title: "Algo de errado, não esta certo 😵‍💫",
					status: "error",
					position: "top",
					duration: "10000",
					isClosable: true,
				});
			});
	};

	return (
		<VStack
			as="form"
			onSubmit={handleSubmit(onSubmit)}
			align="center"
			p="1rem"
			w="100%"
			h={errors.name ? "35rem" : "31rem"} // Se ouver erro, aumentar container pra caber o button
			borderRadius="5px">
			<FormControl isInvalid={errors.name}>
				<FormLabel
					htmlFor="name"
					fontWeight="bold"
					fontSize="1.1rem"
					fontFamily="OpenSans">
					{contact.name}
				</FormLabel>
				<Input
					type="text"
					ref={initialRef}
					placeholder={contact.namePlace}
					{...register("name", {
						required: "Nome Obrigatório!",
						maxLength: {
							value: 50,
							message: "Tamanho Máximo de 56 Caracteres",
						},
						minLength: {
							value: 4,
							message: "Tamanho Minímo de 4 Caracteres",
						},
						pattern: {
							value: /^[a-z \b\0]+$/i, // Regex não aceitar números!
							message: "Não é aceito Números!",
						},
					})}
				/>
				<FormErrorMessage>
					{errors.name && errors.name.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={errors.email}>
				<FormLabel
					htmlFor="email"
					fontWeight="bold"
					fontSize="1.1rem"
					fontFamily="OpenSans">
					{contact.email}
				</FormLabel>
				<Input
					type="email"
					placeholder={contact.emailPlace}
					{...register("email", {
						required: "E-mail Obrigatório!",
						maxLength: {
							value: 80,
							message: "Tamanho Máximo de 80 Caracteres",
						},
						pattern: /^\S+@\S+$/i,
					})}
				/>
				<FormErrorMessage>
					{errors.email && errors.email.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={errors.textarea}>
				<FormLabel
					fontWeight="bold"
					fontSize="1.1rem"
					fontFamily="OpenSans">
					{contact.message}
				</FormLabel>
				<Textarea
					htmlFor="Mensagem"
					h="15rem"
					placeholder={contact.messagePlace}
					resize="vertical"
					maxH="12rem"
					{...register("textarea", {
						required: "Mensagem Obrigatória!",
						maxLength: {
							value: 1400,
							message: "Tamanho Máximo de 1400 Caracteres",
						},
					})}
				/>
				<FormErrorMessage>
					{errors.textarea && errors.textarea.message}
				</FormErrorMessage>
			</FormControl>

			<ModalFooter>
				<Button
					isLoading={isSubmitting}
					type="submit"
					mr="0.2rem"
					w="12.5rem"
					h="2.3rem"
					fontSize="1.1rem"
					bg="#f6c342df"
					_hover={{
						filter: "contrast(80%)",
						transition: "0.5s ease",
					}}
					color="whiteAlpha.900">
					{contact.submit}
				</Button>
			</ModalFooter>
		</VStack>
	);
};
