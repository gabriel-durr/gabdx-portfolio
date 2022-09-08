import {Flex, HStack, Link, Box} from "@chakra-ui/react";
import NextLink from "next/link";
import DropDownMenu from "./DropDownMenu";
import {SwitchColorMode} from "./SwitchColorMode";

export function Header() {
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
				maxW="75rem"
				align="center"
				justify="space-between">
				<Box>
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
						<Link>About me</Link>
					</NextLink>
					<NextLink href="/posts" passHref>
						<Link>Posts</Link>
					</NextLink>

					<DropDownMenu />

					<SwitchColorMode />
				</HStack>
			</HStack>
		</Flex>
	);
}
