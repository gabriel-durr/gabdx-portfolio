/* eslint-disable react-hooks/rules-of-hooks */
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Text,
	Image,
	Flex,
	useDisclosure,
	HStack,
} from "@chakra-ui/react";
import * as prismicH from "@prismicio/helpers";

import {useRef} from "react";
import {Form} from "./Form";

export const ContactModal = () => {
	const {isOpen, onOpen, onClose} = useDisclosure();
	const initialRef = useRef(null);

	const contact = [
		{
			title: "eae",
			titleModal: "Contato",
			name: "Nome",
			namePlace: "Digite o seu nome",
			email: "Email",
			emailPlace: "Digite o seu email",
			message: "Message",
			messagePlace: "Digite a sua Mensagem",
			submit: "Enviar",
			cancel: "Cancelar",
		},
	];

	return (
		<>
			<HStack onClick={onOpen}>
				<Image w="27px" h="27px" src="/email.svg" alt="" />
				<Text fontWeight={500} pl="0.440rem">
					Email
				</Text>
			</HStack>

			{contact.map((contact, i) => (
				<Modal
					preserveScrollBarGap="true"
					key={i}
					scrollBehavior="inside"
					size="2xl"
					initialFocusRef={initialRef}
					isOpen={isOpen}
					onClose={onClose}>
					<ModalOverlay backdropFilter="auto" backdropInvert="20%" />
					<ModalContent borderRadius="4px" align="center">
						<ModalHeader color="gray.900">
							{contact.titleModal}
						</ModalHeader>
						<ModalCloseButton
							_hover={{
								bg: "red",
								transition: "all 0.2s ease-in-out",
							}}
							bg="#8c34345a"
							color="#fff"
							border="1px solid #ffffff43"
						/>
						<ModalBody
							color="gray.900"
							bg="gray.50"
							align="center"
							border="1px solid black">
							<Flex
								h="90%"
								mt="1rem"
								align="center"
								justify="space-between"
								direction="column">
								<Form
									contact={contact}
									initialRef={initialRef}
								/>
							</Flex>
						</ModalBody>
					</ModalContent>
				</Modal>
			))}
		</>
	);
};
