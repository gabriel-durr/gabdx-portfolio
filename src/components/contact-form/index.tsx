import { Form } from "./form";
import { MenuNavProps } from "@/layout/header/menu-nav";
import { DevProgramming } from "@animations/dev-programming";

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
} from "@chakra-ui/react";

export type ContactFormProps = Pick<MenuNavProps["menuItems"], "formData"> & {
	linkColor: string;
};

export const ContactForm = ({ formData, linkColor }: ContactFormProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

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
					fontFamily="body"
					_hover={{ color: linkColor }}
					transition="color ease .2s"
				>
					{formData.emailNameButtonLang}
				</Text>
			</HStack>

			<Modal
				preserveScrollBarGap
				scrollBehavior="inside"
				size={["xs", "sm", "3xl"]}
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay backdropFilter="auto" backdropInvert="20%" />
				<ModalContent
					borderRadius="4px"
					alignItems="center"
					bg="gbdx.gradFormDark"
					_light={{ bg: "gbdx.gradFormLight" }}
				>
					<ModalHeader
						fontSize={["1.3rem", "1.32rem"]}
						lineHeight="shorter"
						letterSpacing="wide"
						fontFamily="heading"
						textTransform="uppercase"
						color="light.100"
						_light={{ color: "gray.600" }}
					>
						{formData.title}
					</ModalHeader>
					<ModalCloseButton
						bg="gbdx.redClose"
						color="gbdx.white"
						size="sm"
						border="1px solid"
						borderColor="gbdx.borderGray"
						_hover={{
							bg: "red",
							transition: "all .2s ease-in-out",
						}}
					/>
					<ModalBody boxSize="full" display="flex" alignItems="end">
						<DevProgramming />
						<Form formData={formData} onClose={onClose} />
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};
