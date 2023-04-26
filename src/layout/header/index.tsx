import { MenuNav } from "./menu-nav";
import { LayoutProps } from "@/layout";
import { SwitchColorMode } from "./switch-color-mode";
import { LanguageSwitcher } from "./language-switcher";

import NextLink from "next/link";

import { Flex, HStack, Link, useMediaQuery, Image } from "@chakra-ui/react";

type HeaderProps = Pick<LayoutProps, "menuItems" | "altLangs">;

export const Header = ({ menuItems, altLangs }: HeaderProps) => {
	const [isLargerScreen] = useMediaQuery("(min-width: 700px)");

	return (
		<Flex
			as="header"
			justify="center"
			w="100vw"
			h="4rem"
			position="fixed"
			backdropFilter="blur(10px)"
			zIndex={17}
			data-testid="header">
			<HStack
				as="nav"
				w="full"
				maxW="94rem"
				align="center"
				px={{ base: 0, md: 2 }}
				justify={{ base: "center", md: "space-around" }}>
				{isLargerScreen && (
					<Link as={NextLink} href="/" rounded="full" p={2}>
						<Image src="/gd-logo.png" w="2.374rem" alt="my brand logo" />
					</Link>
				)}

				<HStack
					pos="relative"
					h="full"
					p=".52rem"
					align="end"
					spacing={{ base: 4, sm: 6, md: 8 }}
					fontSize={{ base: "1rem", md: "1.13rem" }}>
					<MenuNav menuItems={menuItems} />

					<LanguageSwitcher
						isLargerScreen={isLargerScreen}
						altLangs={altLangs}
					/>

					<SwitchColorMode />
				</HStack>
			</HStack>
		</Flex>
	);
};
