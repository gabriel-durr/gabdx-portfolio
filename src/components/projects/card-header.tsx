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
		"myColors.sunShadow",
		"myColors.moonShadow",
	]);

	const shadowIconMode = useColorModeValue(moonShadow, sunShadow);

	const githubLinkLang =
		lang === "pt-br"
			? "Link do repositório do projeto (Github)"
			: "Project repository link (Github)";

	const deployLinkLang =
		lang === "pt-br"
			? "Link do projeto em produção (deploy)"
			: "Project link in production (deploy)";

	const bgIconMode = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
	const colorIconMode = useColorModeValue("myColors.black", "myColors.white");
	const bgToltipMode = useColorModeValue("blackAlpha.900", "whiteAlpha.900");

	return (
		<Flex w="100%" justify="space-between">
			<HStack w="274px" overflow="hidden">
				<Icon
					as={FiZap}
					boxSize=".9em"
					mt="1px"
					color={useColorModeValue("yellow.400", "yellow")}
				/>

				<Heading
					as="h3"
					noOfLines={1}
					textTransform="uppercase"
					color={useColorModeValue("gray.900", "gray.100")}
					fontSize={["sm", "md"]}
					fontWeight={600}
					alignItems="left">
					{title}
				</Heading>
			</HStack>
			<HStack>
				{githubLink && (
					<Tooltip
						placement="bottom"
						bg={bgToltipMode}
						hasArrow
						label={githubLinkLang}
						aria-label={`Toltip: ${githubLinkLang}`}>
						<Link as={NextLink} href={githubLink} target="_blank">
							<Icon
								as={FiGithub}
								bg={bgIconMode}
								boxShadow={`0px 10px 4px -10px ${shadowIconMode}`}
								color={colorIconMode}
								rounded="md"
								boxSize="32px"
								p={1}
							/>
						</Link>
					</Tooltip>
				)}

				{deployLink && (
					<Tooltip
						placement="bottom"
						bg={bgToltipMode}
						hasArrow
						label={deployLinkLang}
						aria-label={`Toltip: ${deployLinkLang}`}>
						<Link as={NextLink} href={deployLink} target="_blank">
							<Icon
								as={SiCloudflarepages}
								bg={bgIconMode}
								boxShadow={`0px 10px 4px -10px ${shadowIconMode}`}
								color={colorIconMode}
								rounded="md"
								boxSize="34px"
								p={1}
							/>
						</Link>
					</Tooltip>
				)}
			</HStack>
		</Flex>
	);
};
