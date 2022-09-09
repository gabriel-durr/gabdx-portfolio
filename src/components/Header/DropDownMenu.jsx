import {
	Stack,
	Image,
	Popover,
	Link,
	Text,
	Icon,
	HStack,
	PopoverTrigger,
	PopoverContent,
	useDisclosure,
	useColorModeValue,
	Button,
} from "@chakra-ui/react";

// Here we have used react-icons package for the icons
import {AiFillCaretDown} from "react-icons/ai";
import {ContactModal} from "../ContactModal";

const DropDownMenu = ({nav}) => {
	const {onOpen, onClose, isOpen} = useDisclosure();
	const menuData = [
		{
			ContactModal: <ContactModal contact={nav.form_data} />,
		},
		{
			label: "Github",
			href: "https://github.com/gabriel-durr",
			src: "/github.svg",
			alt: "Github",
		},
		{
			label: "LinkedIn",
			href: "https://www.linkedin.com/in/gabriel-durr",
			src: "/linkedin.svg",
			alt: "LinkedIn",
		},
		{
			label: "Instagram",
			href: "https://www.instagram.com/gabrieldurr_",
			src: "/instagram.svg",
			alt: "Instagram",
		},
	];

	const linkColor = "#DAA520";

	return (
		<Stack direction="row" spacing={4} pr="5rem">
			<Popover
				trigger="hover"
				placement="bottom-start"
				onOpen={onOpen}
				onClose={onClose}>
				<PopoverTrigger>
					<HStack alignItems="flex-end" cursor="pointer" role="group">
						<Link
							href="#"
							_groupHover={{
								color: linkColor,
							}}>
							{nav.connect}
						</Link>
						<Icon
							alignSelf="center"
							as={AiFillCaretDown}
							h="4"
							w="4"
							_groupHover={{
								color: linkColor,
							}}
							transition="all .25s ease-in-out"
							transform={isOpen ? "translateY(20%)" : ""}
						/>
					</HStack>
				</PopoverTrigger>

				<PopoverContent
					p={2}
					borderStyle="dotted"
					borderColor={useColorModeValue("#fff", "#000")}
					pl="3"
					bg={useColorModeValue("#fff", "gray.50")}
					maxW="180px">
					<Stack>
						{menuData.map((data, i) => (
							<DropDownItem
								key={i}
								linkColor={linkColor}
								{...data}
							/>
						))}
					</Stack>
				</PopoverContent>
			</Popover>
		</Stack>
	);
};

const DropDownItem = ({label, href, src, alt, ContactModal, linkColor}) => {
	return (
		<Link
			color="gray.900"
			fontSize="1.03rem"
			href={href}
			display="block"
			py={1}
			_hover={{color: linkColor}}>
			<Stack direction="row" align="center" spacing="4">
				{ContactModal}
				{src && <Image h="26px" w="27px" src={src} alt={alt} />}
				{label && <Text fontWeight="500">{label}</Text>}
			</Stack>
		</Link>
	);
};

export default DropDownMenu;
