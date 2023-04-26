import { api } from "@services/api";
import { useRouter } from "next/router";

import { MdOutlineRemoveCircle } from "react-icons/md";
import {
	Button,
	useToast,
	IconButton,
	AlertDialog,
	useDisclosure,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogCloseButton,
} from "@chakra-ui/react";

import { useRef } from "react";

type CloseReportProps = {
	idLocation: string;
};

export const UnbanLocation = ({ idLocation }: CloseReportProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const router = useRouter();

	const sevenSeconds = 7 * 1000;
	const toast = useToast({
		duration: sevenSeconds,
		position: "top",
	});

	const cancelRef = useRef(null);

	async function handleRemoveBan() {
		try {
			const {
				data: { message },
			} = await api.delete(`/admin/ban?idLocation=${idLocation}`);

			toast({
				title: message,
				description: "Sucessfully unbanned location",
				status: "success",
			});

			router.push("/admin");
		} catch ({ response }: any) {
			const {
				data: { message },
			} = response;

			toast({
				title: message,
				description:
					"A server error occurred while trying to unban the location",
				status: "error",
			});
		}
	}

	return (
		<>
			<IconButton
				bg="whiteAlpha.50"
				rounded="sm"
				display="flex"
				fontSize={20}
				aria-label="remove ban"
				icon={<MdOutlineRemoveCircle />}
				onClick={onOpen}
			/>
			<AlertDialog
				motionPreset="slideInBottom"
				leastDestructiveRef={cancelRef}
				onClose={onClose}
				isOpen={isOpen}
				isCentered>
				<AlertDialogOverlay />

				<AlertDialogContent bg="gbdx.white" fontFamily="body">
					<AlertDialogHeader>
						Do you really want to unban this location?
					</AlertDialogHeader>
					<AlertDialogCloseButton />
					<AlertDialogBody>
						If accepted, that location will be unbanned
					</AlertDialogBody>
					<AlertDialogFooter>
						<Button
							colorScheme="green"
							flex={1}
							ref={cancelRef}
							onClick={onClose}>
							Cancel
						</Button>
						<Button flex={1} onClick={handleRemoveBan} colorScheme="red" ml={4}>
							Delete
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};
