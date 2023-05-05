import { FormContactProps, FormProps } from ".";

import { BsPersonVcardFill } from "react-icons/bs";

import { FocusEvent } from "react";
import {
	Icon,
	Input,
	FormLabel,
	InputGroup,
	useBoolean,
	FormControl,
	FormErrorMessage,
	InputRightElement,
} from "@chakra-ui/react";

type InputNameProps = FormContactProps & {
	inputName: FormProps["formData"]["inputs"]["inputName"];
};

export const InputName = ({ inputName, errors, register }: InputNameProps) => {
	const [isMove, setMove] = useBoolean(false);

	const notNumberRgx = /^[a-z \b\0]+$/i;
	const isNameError = !!errors.name;

	function handleOnBlur({ target: { value } }: FocusEvent<HTMLInputElement>) {
		value.length > 0 ? setMove.on() : setMove.off();
	}

	return (
		<FormControl variant="floating" isInvalid={isNameError} isRequired>
			<FormLabel fontSize="1.1rem" fontFamily="body">
				{inputName.label}
			</FormLabel>
			<InputGroup>
				<InputRightElement h="full">
					<Icon fontSize="17px" as={BsPersonVcardFill} />
				</InputRightElement>
				<Input
					variant="gdxContact"
					textIndent={isMove ? "92px" : "8px"}
					transition="text-indent ease .6s"
					onFocus={() => isMove && setMove.off()}
					placeholder={inputName.placeholder}
					{...register("name", {
						required: inputName.required_msg,
						maxLength: {
							value: 50,
							message: inputName.max_msg,
						},
						minLength: {
							value: 4,
							message: inputName.min_msg,
						},
						pattern: {
							value: notNumberRgx,
							message: inputName.pattern_msg,
						},
						onBlur: handleOnBlur,
					})}
				/>
			</InputGroup>
			<FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
		</FormControl>
	);
};
