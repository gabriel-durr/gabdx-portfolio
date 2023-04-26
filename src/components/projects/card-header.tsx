import { ProjectCardProps } from "./project-card";

import NextLink from "next/link";
import { FiZap } from "react-icons/fi";
import { FiGithub } from "react-icons/fi";
import { SiCloudflarepages } from "react-icons/si";

import {
	Icon,
	Flex,
	Link,
	HStack,
	Tooltip,
	Heading,
	useToken,
	useColorModeValue,
} from "@chakra-ui/react";

type TitleProps = Omit<ProjectCardProps, "image" | "techs">;

export const CardHeader = ({
	title,
	githubLink,
	deployLink,
	lang,
}: TitleProps) => {
	const [sunShadow, moonShadow] = useToken("colors", [
		"gbdx.sunShadow",
		"gbdx.moonShadow",
	]);

	const shadowIconMode = useColorModeValue(sunShadow, moonShadow);

	const githubLinkLang =
		lang === "pt-br"
			? "Link do repositório do projeto (Github)"
			: "Project repository link (Github)";

	const deployLinkLang =
		lang === "pt-br"
			? "Link do projeto em produção (deploy)"
			: "Project link in production (deploy)";

	const bgToltipMode = useColorModeValue("whiteAlpha.900", "blackAlpha.900");

	return (
		<Flex w="full" justify="space-between">
			<HStack w="274px" overflow="hidden">
				<Icon
					as={FiZap}
					boxSize=".9em"
					mt="1px"
					color="yellow.400"
					_light={{ color: "yellow" }}
				/>

				<Heading
					as="h3"
					noOfLines={1}
					textTransform="uppercase"
					fontSize={["sm", "md"]}
					fontWeight={600}
					alignItems="left"
					color="gray.900"
					_light={{ color: "gray.100" }}>
					{title}
				</Heading>
			</HStack>
			<HStack>
				{githubLink && (
					<Tooltip
						placement="bottom"
						bg={bgToltipMode}
						hasArrow
						color="light.600"
						_light={{ color: "gray.900" }}
						label={githubLinkLang}
						aria-label={`Toltip: ${githubLinkLang}`}>
						<Link as={NextLink} href={githubLink} target="_blank">
							<Icon
								as={FiGithub}
								p={1}
								rounded="md"
								boxSize="32px"
								bg="blackAlpha.200"
								color="gbdx.black"
								boxShadow={`0px 10px 4px -10px ${shadowIconMode}`}
								_light={{ bg: "whiteAlpha.200", color: "gbdx.white" }}
							/>
						</Link>
					</Tooltip>
				)}

				{deployLink && (
					<Tooltip
						placement="bottom"
						bg={bgToltipMode}
						hasArrow
						color="light.600"
						_light={{ color: "gray.900" }}
						label={deployLinkLang}
						aria-label={`Toltip: ${deployLinkLang}`}>
						<Link as={NextLink} href={deployLink} target="_blank">
							<Icon
								as={SiCloudflarepages}
								p={1}
								rounded="md"
								boxSize="34px"
								bg="blackAlpha.200"
								color="gbdx.black"
								boxShadow={`0px 10px 4px -10px ${shadowIconMode}`}
								_light={{ bg: "whiteAlpha.200", color: "gbdx.white" }}
							/>
						</Link>
					</Tooltip>
				)}
			</HStack>
		</Flex>
	);
};
