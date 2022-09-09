import {PrismicLink} from "@prismicio/react";
import {linkResolver} from "../../../prismicio";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import {HStack, Box} from "@chakra-ui/react";

const FlagIcon = ({lang}) => {
	const code = lang.substring(3).toLowerCase();

	return <Box as="span" className={`fi fi-${code}`} />;
};

export const LanguageSwitcher = ({altLangs = []}) => {
	return (
		<HStack>
			{altLangs.map(lang => (
				<PrismicLink
					key={lang.id}
					href={linkResolver(lang)}
					locale={lang.lang}>
					<FlagIcon lang={lang.lang} />
					<Box
						ml="15px"
						as="span"
						fontWeight="bold"
						fontSize="0.9rem"
						color={lang.lang === "en-us" ? "red" : "#c0c904"}
						className="sr-only">
						{lang.lang}
					</Box>
				</PrismicLink>
			))}
		</HStack>
	);
};

export default LanguageSwitcher;
