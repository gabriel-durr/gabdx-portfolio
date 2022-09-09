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
	useColorModeValue,
	HStack,
} from "@chakra-ui/react";
import * as prismicH from "@prismicio/helpers";

import {useRef} from "react";
import {Form} from "./Form";

export const ContactModal = ({contact}) => {
	const {isOpen, onOpen, onClose} = useDisclosure();
	const initialRef = useRef(null);

	return (
		<>
			<HStack onClick={onOpen}>
				<Image w="27px" h="27px" src="/email.svg" alt="" />
				<Text fontWeight={500} pl="0.440rem" fontSize="1.03rem">
					Email
				</Text>
			</HStack>

			<Modal
				preserveScrollBarGap="true"
				scrollBehavior="inside"
				size="2xl"
				initialFocusRef={initialRef}
				isOpen={isOpen}
				onClose={onClose}>
				<ModalOverlay backdropFilter="auto" backdropInvert="20%" />
				<ModalContent borderRadius="4px" align="center">
					<ModalHeader
						fontSize="1.5rem"
						color={useColorModeValue("gray.900", "gray.100")}>
						{contact.title}
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
							<Form contact={contact} initialRef={initialRef} />
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};
