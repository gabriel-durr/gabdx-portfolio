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
		<Link
			as={NextLink}
			href={href}
			target="_blank"
			display="block"
			py={1}
			_hover={{ color: linkColor }}>
			<Stack direction="row" align="center" spacing={4}>
				<Image w={["22px", "27px"]} src={src} alt={alt} />

				<Text
					fontFamily="Raleway"
					textTransform="uppercase"
					fontSize={[".72rem", ".84rem"]}
					color="gray.900"
					lineHeight="shorter"
					fontWeight="medium">
					{label}
				</Text>
			</Stack>
		</Link>
	);
};
