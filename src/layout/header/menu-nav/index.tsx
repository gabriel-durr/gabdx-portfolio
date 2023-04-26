import { getStaticProps } from "@/pages";
import { DropDownMenu } from "./drop-down-menu";

import NextLink from "next/link";
import { useRouter } from "next/router";
import { InferGetStaticPropsType } from "next";

import { Link, useColorModeValue } from "@chakra-ui/react";

export type MenuNavProps = Pick<
	InferGetStaticPropsType<typeof getStaticProps>,
	"menuItems"
>;

export const MenuNav = ({ menuItems }: MenuNavProps) => {
	const router = useRouter();
	const colorPathMode = useColorModeValue("#DAA520", "#ffc32b");

	return (
		<>
			<Link
				as={NextLink}
				href="/"
				whiteSpace="nowrap"
				fontSize={{ base: "1.02rem", md: "1.148rem" }}
				color={router.asPath === "/" ? colorPathMode : undefined}>
				{menuItems.about}
			</Link>

			<Link
				as={NextLink}
				href="/posts"
				fontSize={{ base: "1.02rem", md: "1.148rem" }}
				color={router.asPath === "/posts" ? colorPathMode : undefined}>
				{menuItems.posts}
			</Link>

			<DropDownMenu menuItems={menuItems} />
		</>
	);
};
