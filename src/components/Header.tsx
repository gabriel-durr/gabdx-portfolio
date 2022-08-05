import {Heading, Text, Flex, Box, HStack} from "@chakra-ui/react";
import Link from "next/link";
import {ToggleButtonIcon} from "./ToggleButtonSwitch";

export function Header() {
	return (
		<Box
			as="header"
			width="100%"
			position="fixed"
			backdropFilter="blur(10px)"
			zIndex="2">
			<Flex
				as="nav"
				p="1"
				width="100%"
				maxW="container.md"
				m="auto"
				wrap="wrap"
				align="center"
				justify="space-between">
				<HStack align="center">
					<Link href="/">
						<Heading size="lg" px="3">
							<Text color="orangeblue.400" fontWeight="bold">
								gabd
							</Text>
						</Heading>
					</Link>
				</HStack>

				<Flex py="0.2rem" w="auto" align="center" justify="flex-start">
					<HStack gap="5" ml="10">
						<Link href="#">
							<Text fontWeight="bold">About me</Text>
						</Link>

						<Link href="#">
							<Text fontWeight="bold">Works </Text>
						</Link>
						<Link href="#">
							<Text fontWeight="bold">Contact</Text>
						</Link>
					</HStack>
				</Flex>
				<HStack ml="auto" p="3" align="right">
					<ToggleButtonIcon />
				</HStack>
			</Flex>
		</Box>
	);
}
