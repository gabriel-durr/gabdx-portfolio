import NextLink from "next/link";

import { Stack, Link, Text, Image } from "@chakra-ui/react";

type DropDownItemProps = {
	label: string;
	href: string;
	src: string;
	alt: string;
	linkColor: string;
};

export const DropDownItem = ({
	src,
	alt,
	href,
	label,
	linkColor,
}: DropDownItemProps) => {
	return (
		<Link as={NextLink} href={href} target="_blank" display="block" py={1}>
			<Stack direction="row" align="center" spacing={4}>
				<Image w={["22px", "27px"]} src={src} alt={alt} />

				<Text
					fontFamily="Raleway"
					color="gray.900"
					lineHeight="shorter"
					fontWeight="medium"
					textTransform="uppercase"
					fontSize={[".72rem", ".84rem"]}
					_hover={{ color: linkColor }}>
					{label}
				</Text>
			</Stack>
		</Link>
	);
};
