import { Header } from "./header";
import { Footer } from "./footer";
import { GabdxImg } from "./gabdx-img";
import { getStaticProps } from "@/pages";
import { Progressbar } from "@components/progress-bar";

import { Content } from "@prismicio/client";
import { InferGetStaticPropsType } from "next";

import { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

type typeAllDocumentsLang = Content.AllDocumentTypes["alternate_languages"];

export type LayoutProps = Pick<
	InferGetStaticPropsType<typeof getStaticProps>,
	"menuItems" | "footerData"
> & {
	isGabdxImg?: boolean;
	children: ReactNode;
	altLang: typeAllDocumentsLang;
};

export const Layout = ({
	isGabdxImg = false,
	menuItems,
	altLang,
	footerData,
	children,
}: LayoutProps) => {
	return (
		<>
			<Header altLang={altLang} menuItems={menuItems} />
			<Progressbar />

			<Flex pb="17rem" minH="100vh" minW="100vw" pt="9.7rem" justify="center">
				{children}
			</Flex>

			{isGabdxImg && <GabdxImg />}

			<Footer footerData={footerData} />
		</>
	);
};
