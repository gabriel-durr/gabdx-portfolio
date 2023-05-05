import { ContactFormProps } from "..";
import { InputName } from "./input-name";
import { InputEmail } from "./input-email";
import { useToast } from "@hooks/use-toast";
import { InputMessage } from "./input-message";

import axios from "axios";
import { MoonLoader } from "react-spinners";
import { useForm, FieldErrorsImpl, UseFormRegister } from "react-hook-form";

import { VStack, Button } from "@chakra-ui/react";

type HookFormTypes = {
	name: string;
	email: string;
	textarea: string;
};

export type FormContactProps = {
	register: UseFormRegister<HookFormTypes>;
	errors: Partial<FieldErrorsImpl<HookFormTypes>>;
};

export type FormProps = Omit<ContactFormProps, "linkColor"> & {
	onClose(): void;
};

export const Form = ({ formData, onClose }: FormProps) => {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting, isSubmitted, isValid },
	} = useForm<HookFormTypes>();

	const { toastExec } = useToast();

	const isErrorExists = Boolean(Object.keys(errors).length);
	const isDisabled = (isSubmitted && !isValid) || isErrorExists;

	const {
		inputs: { inputName, inputEmail, inputMessage },
		toastLang,
	} = formData;

	const onSubmit = async ({ name, email, textarea }: HookFormTypes) => {
		await new Promise(resolve => setTimeout(resolve, 1400));

		try {
			await axios.post("/api/mail", {
				name,
				email,
				textarea,
			});

			toastExec({
				title: toastLang.sucess.title,
				description: toastLang.sucess.description,
			});
		} catch (err) {
			console.error(err);

			toastExec({
				title: toastLang.error.title,
				status: "error",
			});
		} finally {
			onClose();
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
			spacing={8}
			borderRadius="5px"
		>
			<InputName inputName={inputName} register={register} errors={errors} />

			<InputEmail inputEmail={inputEmail} register={register} errors={errors} />

			<InputMessage
				inputMessage={inputMessage}
				register={register}
				errors={errors}
			/>

			<Button
				variant="gdxSolidButton"
				role="button"
				type="submit"
				isDisabled={isDisabled}
				isLoading={isSubmitting}
				spinner={<MoonLoader size={22} color="white" />}
			>
				{formData.submit}
			</Button>
		</VStack>
	);
};
