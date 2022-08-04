import {Heading, Text, Flex, Box} from "@chakra-ui/react";
import {ToggleButtonIcon} from "./ToggleButtonSwitch";

export function Header() {
	return (
		<Flex as="header" width="100%">
			<Flex
				m="0.2rem auto"
				py="0.2rem"
				w="container.lg"
				justify="space-between">
				<Heading color="orangeblue.400">
					<Text fontWeight="bold">
						gabdr
						<Text color="orangeblue.100" as="span">
							.
						</Text>
					</Text>
				</Heading>
				<ToggleButtonIcon />
			</Flex>
		</Flex>
	);
}
