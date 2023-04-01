import {Form} from "./form";
import {DevAnimation} from "./dev-animation";
import {MenuNavProps} from "@/layout/header/menu-nav";

import {
	Text,
	Modal,
	Image,
	HStack,
	ModalBody,
	ModalHeader,
	ModalContent,
	ModalOverlay,
	useDisclosure,
	ModalCloseButton,
	useColorModeValue,
} from "@chakra-ui/react";

export type ContactFormProps = Pick<MenuNavProps["menuItems"], "formData"> & {
	lang: string;
	linkColor: string;
};

export const ContactForm = ({formData, lang, linkColor}: ContactFormProps) => {
	const {isOpen, onOpen, onClose} = useDisclosure();

	const bgModelMode = useColorModeValue(
		"myColors.gradFormDark",
		"myColors.gradFormLight"
	);

	const colorHeaderMode = useColorModeValue("light.100", "gray.600");
	const emailNameButtonLang = lang === "pt-br" ? "E-mail" : "Email";

	return (
		<>
			<HStack cursor="pointer" onClick={onOpen}>
				<Image w={["22px", "27px"]} src="/email.svg" alt="Email para contato" />
				<Text
					pl=".440rem"
					fontWeight="medium"
					textTransform="uppercase"
					fontSize={[".72rem", ".84rem"]}
					color="gray.900"
					lineHeight="shorter"
					fontFamily="Raleway"
					_hover={{color: linkColor}}
					transition="color ease .2s">
					{emailNameButtonLang}
				</Text>
			</HStack>

			<Modal
				preserveScrollBarGap
				scrollBehavior="inside"
				size={["xs", "sm", "3xl"]}
				isOpen={isOpen}
				onClose={onClose}>
				<ModalOverlay backdropFilter="auto" backdropInvert="20%" />
				<ModalContent borderRadius="4px" alignItems="center" bg={bgModelMode}>
					<ModalHeader
						fontSize={["1.3rem", "1.32rem"]}
						lineHeight="shorter"
						letterSpacing="wide"
						fontFamily="DM Sans"
						textTransform="uppercase"
						color={colorHeaderMode}>
						{formData.title}
					</ModalHeader>
					<ModalCloseButton
						bg="#8c34345a"
						color="myColors.white"
						border="1px solid #ffffff43"
						_hover={{
							bg: "red",
							transition: "all .2s ease-in-out",
						}}
					/>
					<ModalBody boxSize="100%" display="flex" alignItems="end">
						<DevAnimation />
						<Form formData={formData} lang={lang} />
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};
