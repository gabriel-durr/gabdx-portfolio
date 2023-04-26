import { LayoutProps } from "@/layout";
import { PrismicLink } from "@prismicio/react";
import { linkResolver } from "@services/prismicio";
import "/node_modules/flag-icons/css/flag-icons.min.css";

import { HStack, Box, BoxProps } from "@chakra-ui/react";

type FlagIconProps = BoxProps & { lang: string };

const FlagIcon = ({ lang, ...props }: FlagIconProps) => {
	const code = lang.substring(3).toLowerCase();

	return <Box as="span" className={`fi fi-${code}`} {...props} />;
};

type LanguageSwitcherProps = Pick<LayoutProps, "altLangs"> & {
	isLargerScreen: boolean;
};

export const LanguageSwitcher = ({
	altLangs = [],
	isLargerScreen,
}: LanguageSwitcherProps) => {
	return (
		<HStack pr={{ base: ".2rem", md: "2rem" }}>
			{altLangs.map(altLang => {
				const { lang } = altLang;

				const isBrLang = lang === "pt-br";

				return (
					<PrismicLink<any>
						key={lang}
						href={linkResolver(altLang)}
						locale={lang}>
						<FlagIcon lang={isBrLang ? "en-us" : "pt-br"} aria-label={lang} />

						{isLargerScreen && (
							<Box
								as="span"
								whiteSpace="nowrap"
								ml={3}
								fontWeight="bold"
								fontSize={[".7rem", ".9rem"]}
								color={isBrLang ? "red" : "#c0c904"}
								className="sr-only">
								{isBrLang ? "en-us" : "pt-br"}
							</Box>
						)}
					</PrismicLink>
				);
			})}
		</HStack>
	);
};
