import {Heading, Text, Flex} from "@chakra-ui/react";
import {ToggleButtonIcon} from "./ToggleButtonSwitch";

export function Header() {
	return (
		<>
			<Flex w="100%" justify="space-around">
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
		</>
	);
}
