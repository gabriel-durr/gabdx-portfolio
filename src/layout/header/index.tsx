import { MenuNav } from "./menu-nav";
import { LayoutProps } from "@/layout";
import { SwitchColorMode } from "./switch-color-mode";
import { LanguageSwitcher } from "./language-switcher";

import NextLink from "next/link";

import { Flex, HStack, Link, useMediaQuery, Image } from "@chakra-ui/react";

type HeaderProps = Pick<LayoutProps, "menuItems" | "altLang">;

export const Header = ({ menuItems, altLang }: HeaderProps) => {
	const [isLargerScreen] = useMediaQuery("(min-width: 700px)");
	const [isVerySmallScreen] = useMediaQuery("max-width: 400px");

	return (
		<Flex
			as="header"
			justify="center"
			w="100vw"
			h="4rem"
			position="fixed"
			backdropFilter="blur(10px)"
			zIndex={17}>
			<HStack
				as="nav"
				w="100%"
				px={2}
				maxW="94rem"
				align="center"
				justify="space-around">
				{!isVerySmallScreen && (
					<Link as={NextLink} href="/" rounded="full" p={{ sm: 0, md: 2 }}>
						<Image src="/gd-logo.png" w="2.374rem" alt="my brand logo" />
					</Link>
				)}

				<HStack
					spacing={{ base: 4, md: 8 }}
					fontSize={["1rem", "1.13rem"]}
					h="100%"
					align="flex-end"
					p=".52rem">
					<MenuNav menuItems={menuItems} />

					<LanguageSwitcher isLargerScreen={isLargerScreen} altLang={altLang} />

					<SwitchColorMode />
				</HStack>
			</HStack>
		</Flex>
	);
};
