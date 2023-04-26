import { AiFillFlag } from "react-icons/ai";
import { reportLang } from "@utils/lang-formatter";
import { useFeedback, ReportFeedbackType } from "@hooks/use-feedbacks";

import { useForm, Controller } from "react-hook-form";

import {
	Modal,
	Radio,
	Button,
	useToast,
	ModalBody,
	RadioGroup,
	IconButton,
	ModalFooter,
	FormControl,
	ModalHeader,
	ModalOverlay,
	ModalContent,
	useDisclosure,
	FormErrorMessage,
} from "@chakra-ui/react";

type ReportFormType = {
	optionReport: string;
};

type ReportFeedbackProps = {
	lang: string;
	feedbackId: string;
};

export const ReportFeedback = ({ lang, feedbackId }: ReportFeedbackProps) => {
	const {
		control,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<ReportFormType>();

	const { reportThisUser, currentFeedback } = useFeedback();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const sevenSeconds = 7 * 1000;
	const toast = useToast({
		isClosable: true,
		position: "top",
		duration: sevenSeconds,
	});

	const { optsLang, toastLang, btnReportLang, modalLang } = reportLang(lang);

	const options = [
		optsLang.offensive,
		optsLang.discrimination,
		optsLang.harassment,
		optsLang.spam,
		optsLang.anotherMotive,
	];

	async function handleReportUser(_: ReportFormType) {
		try {
			const typeOfReport = getValues("optionReport");

			const { name } = await currentFeedback();

			const reportData: ReportFeedbackType = {
				reportedByName: name,
				reporterTo: feedbackId,
				typeOfReport,
			};

			await reportThisUser(reportData);

			toast({
				title: toastLang.titleMsg,
				description: toastLang.sucessMsg,
				status: "success",
			});
		} catch ({ response }: any) {
			const isErrorLimitFeedback = response.status === 429;
			const isFeedbackRequired = Boolean(feedbackId.length);

			toast({
				title: toastLang.titleMsg,
				description:
					(isErrorLimitFeedback && toastLang.limitMsg) ||
					(isFeedbackRequired && toastLang.requireFeedbackMsg) ||
					toastLang.errorMsg,
				status: "error",
			});
		} finally {
			onClose();
		}
	}

	return (
		<>
			<IconButton
				variant="unstyled"
				rounded="sm"
				display="flex"
				justifyContent="center"
				bg="gbdx.white"
				color="gbdx.black"
				w="full"
				h="min"
				gap={4}
				p={1}
				px={4}
				fontSize="md"
				aria-label={btnReportLang.ariaLabel}
				icon={<AiFillFlag />}
				_hover={{
					filter: "brightness(.92)",
				}}
				_after={{
					content: `'${btnReportLang.title}'`,
					fontSize: "sm",
					color: "blackAlpha.800",
				}}
				_light={{
					bg: "gbdx.black",
					color: "gbdx.white",
					"&:hover": {
						color: "gray.100",
						filter: "brightness(1.7)",
					},
					"&::after": {
						color: "whiteAlpha.800",
					},
				}}
				onClick={onOpen}
			/>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg="whiteAlpha.900" _dark={{ bg: "blackAlpha.900" }}>
					<ModalHeader>{modalLang.title}</ModalHeader>

					<ModalBody
						as="form"
						noValidate
						onSubmit={handleSubmit(handleReportUser)}>
						<FormControl isInvalid={!!errors.optionReport}>
							<Controller
								name="optionReport"
								control={control}
								rules={{ required: modalLang.rules }}
								render={({ field: { onChange, onBlur, value } }) => (
									<RadioGroup
										display="flex"
										flexDir="column"
										value={value}
										onChange={onChange}
										onBlur={onBlur}>
										{options.map(option => (
											<Radio key={option} value={option}>
												{option}
											</Radio>
										))}
									</RadioGroup>
								)}
							/>

							<FormErrorMessage>
								{errors.optionReport && errors.optionReport.message}
							</FormErrorMessage>
						</FormControl>

						<ModalFooter w="full" gap={4} justifyContent="center">
							<Button
								type="submit"
								flex={1}
								bg="green.400"
								color="gbdx.white"
								_hover={{
									filter: "brightness(.8)",
									transition: "filter .2s ease",
								}}>
								{modalLang.confirm}
							</Button>
							<Button
								flex={1}
								bg="red.400"
								color="gbdx.white"
								_hover={{
									filter: "brightness(.8)",
									transition: "filter .2s ease",
								}}
								onClick={onClose}>
								{modalLang.cancel}
							</Button>
						</ModalFooter>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};
