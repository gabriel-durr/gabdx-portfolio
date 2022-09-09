import {Flex, HStack, Link, Box} from "@chakra-ui/react";
import NextLink from "next/link";
import DropDownMenu from "./DropDownMenu";
import {LanguageSwitcher} from "./LanguageSwitcher";
import {SwitchColorMode} from "./SwitchColorMode";

export function Header({menu, altLangs}) {
	const nav = {
		about: menu.about,
		posts: menu.posts,
		connect: menu.connect,
		form_data: {
			title: menu.form_title,
			name: menu.name,
			name_place: menu.name_place,
			email: menu.email,
			email_place: menu.email_place,
			message: menu.message,
			message_place: menu.message_place,
			submit: menu.submit,
		},
	};

	return (
		<Flex
			as="header"
			justify="center"
			w="100vw"
			h="4rem"
			position="fixed"
			backdropFilter="blur(10px)"
			zIndex="17">
			<HStack
				as="nav"
				width="100%"
				maxW="94rem"
				align="center"
				justify="space-between">
				<Box ml="2rem">
					<NextLink href="/" passHref>
						<Link
							color="gold"
							fontSize="1.5rem"
							fontFamily="monospace">
							gabdurr.
						</Link>
					</NextLink>
				</Box>

				<HStack
					gap="7"
					fontSize="1.13rem"
					h="100%"
					align="flex-end"
					pb="0.2rem">
					<NextLink href="/" passHref>
						<Link>{nav.about}</Link>
					</NextLink>
					<NextLink href="/posts" passHref>
						<Link>{nav.posts}</Link>
					</NextLink>

					<DropDownMenu nav={nav} />
					<LanguageSwitcher altLangs={altLangs} />

					<SwitchColorMode />
				</HStack>
			</HStack>
		</Flex>
	);
}
