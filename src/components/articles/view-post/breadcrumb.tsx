import NextLink from "next/link";
import { useRouter } from "next/router";
import { FaAngleRight, FaHome } from "react-icons/fa";

import {
	Icon,
	BreadcrumbItem,
	BreadcrumbLink,
	Breadcrumb as BreadcrumbChakra,
} from "@chakra-ui/react";

type BreadcrumbProps = {
	lang: string;
};

export const Breadcrumb = ({ lang }: BreadcrumbProps) => {
	const {
		query: { uid },
	} = useRouter();

	const isBrLang = lang === "pt-br";

	return (
		<BreadcrumbChakra
			fontSize={{ base: 14, md: 16 }}
			spacing={2}
			separator={<FaAngleRight color="gray.500" />}>
			<BreadcrumbItem
				_hover={{
					transition: "all 0.4s",
					filter: "opacity(0.8)",
					textDecoration: "underline",
				}}>
				<Icon as={FaHome} mr={2} />
				<BreadcrumbLink as={NextLink} href="/">
					{isBrLang ? "Incio" : "Home"}
				</BreadcrumbLink>
			</BreadcrumbItem>

			<BreadcrumbItem
				_hover={{
					transition: "all 0.4s",
					filter: "opacity(0.8)",
					textDecoration: "underline",
				}}>
				<BreadcrumbLink as={NextLink} href={`/${lang}/posts`}>
					Posts
				</BreadcrumbLink>
			</BreadcrumbItem>

			<BreadcrumbItem
				isCurrentPage
				w="152px"
				h="min"
				opacity={0.7}
				noOfLines={1}
				overflow="hidden">
				<BreadcrumbLink textDecoration="none !important" pointerEvents="none">
					{uid}
				</BreadcrumbLink>
			</BreadcrumbItem>
		</BreadcrumbChakra>
	);
};
