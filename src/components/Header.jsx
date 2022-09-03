import {Text, Flex, Image, HStack, Link, Box} from "@chakra-ui/react";
import NextLink from "next/link";
import {ToggleButtonIcon} from "./ToggleButtonSwitch";

export function Header() {
	return (
		<Flex
			align="center"
			justify="center"
			as="header"
			w="100vw"
			position="fixed"
			backdropFilter="blur(10px)"
			zIndex="17">
			<HStack
				as="nav"
				p="1"
				width="100%"
				maxW="container.xl"
				align="center"
				justify="center">
				<NextLink href="/" passHref>
					<Link>
						<Box position="absolute" top="50%" left="20%">
							<Image src="/brand.png" w="7rem" />
						</Box>
					</Link>
				</NextLink>

				<Flex py="0.2rem" w="auto" align="center" justify="flex-start">
					<HStack gap="5" ml="10">
						<NextLink href="/" passHref>
							<Link>
								<Text fontWeight="bold">About me</Text>
							</Link>
						</NextLink>
						<NextLink href="/works" passHref>
							<Link>
								<Text fontWeight="bold">Works </Text>
							</Link>
						</NextLink>

						<Text fontWeight="bold">Contact</Text>
					</HStack>
				</Flex>

				<ToggleButtonIcon />
			</HStack>
		</Flex>
	);
}
