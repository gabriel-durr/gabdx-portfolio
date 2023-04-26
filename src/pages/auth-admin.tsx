import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";

import { Text, Heading, Button, HStack, Icon, Center } from "@chakra-ui/react";

// GiFairyWand icon ADMIN page login

const AuthAdmin = () => {
	return (
		<Center w="100vw" h="100vh" bg="whiteAlpha.500">
			<HStack spacing={4}>
				<Heading fontFamily="number">Gabdx ADM</Heading>
				<Button
					colorScheme="blackAlpha"
					rounded="md"
					onClick={() =>
						signIn("github", { redirect: true, callbackUrl: "/admin" })
					}>
					<Text as="span" px={2}>
						SigIn with Github
					</Text>
					<Icon as={FaGithub} />
				</Button>
			</HStack>
		</Center>
	);
};

export default AuthAdmin;
