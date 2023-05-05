import { MenuNavProps } from ".";
import { DropDownItem } from "./drop-down-item";
import { ContactForm } from "@components/contact-form";

import { AiFillCaretDown } from "react-icons/ai";

import {
	Text,
	Icon,
	Stack,
	HStack,
	Popover,
	useDisclosure,
	PopoverTrigger,
	PopoverContent,
} from "@chakra-ui/react";

type DropDownProps = MenuNavProps;

export const DropDownMenu = ({ menuItems }: DropDownProps) => {
	const { onOpen, onClose, isOpen } = useDisclosure();

	const linksProps = [
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
		<Stack direction="row" spacing={4} pr={{ base: 0, md: "5rem" }}>
			<Popover
				trigger="hover"
				placement="bottom-start"
				onOpen={onOpen}
				onClose={onClose}
			>
				<PopoverTrigger>
					<HStack align="end" cursor="pointer" role="group">
						<Text
							fontSize={{ base: "1.02rem", md: "1.148rem" }}
							fontFamily="DM Sans"
							cursor="pointer"
						>
							{menuItems.connect}
						</Text>
						<Icon
							alignSelf="center"
							as={AiFillCaretDown}
							h={4}
							w={4}
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
					pl={3}
					borderStyle="dotted"
					borderColor="gray.800"
					bg="gbdx.white"
					maxW={["150px", "180px"]}
					_light={{ borderColor: "gbdx", bg: "gray.50" }}
				>
					<Stack>
						<ContactForm formData={menuItems.formData} linkColor={linkColor} />
						{linksProps.map(link => (
							<DropDownItem key={link.label} linkColor={linkColor} {...link} />
						))}
					</Stack>
				</PopoverContent>
			</Popover>
		</Stack>
	);
};
