import { LayoutProps } from "@/layout";
import { PrismicLink } from "@prismicio/react";
import { linkResolver } from "@services/prismicio";
import "/node_modules/flag-icons/css/flag-icons.min.css";

import { HStack, Box } from "@chakra-ui/react";

const FlagIcon = ({ lang }: { lang: string }) => {
	const code = lang.substring(3).toLowerCase();

	return <Box as="span" className={`fi fi-${code}`} />;
};

type LanguageSwitcherProps = Pick<LayoutProps, "altLang"> & {
	isLargerScreen: boolean;
};

export const LanguageSwitcher = ({
	altLang = [],
	isLargerScreen,
}: LanguageSwitcherProps) => {
	return (
		<HStack pr={[".2rem", "2rem"]}>
			{altLang.map(({ id, lang }: any) => (
				<PrismicLink<any> key={id} href={linkResolver(lang)} locale={lang}>
					<FlagIcon lang={lang === "pt-br" ? "en-us" : "pt-br"} />

					{isLargerScreen && (
						<Box
							whiteSpace="nowrap"
							ml={["2px", "15px"]}
							as="span"
							fontWeight="bold"
							fontSize={[".7rem", ".9rem"]}
							color={lang === "en-us" ? "#c0c904" : "red"}
							className="sr-only">
							{lang === "pt-br" ? "en-us" : "pt-br"}
						</Box>
					)}
				</PrismicLink>
			))}
		</HStack>
	);
};
