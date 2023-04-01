import { Content } from "@prismicio/client";

import Head from "next/head";

type SeoProps = Pick<
	Content.HomeDocumentData,
	"seoTitle" | "seoDescription" | "imagePreview"
>;

export const SeoMetaData = ({
	seoTitle,
	imagePreview,
	seoDescription,
}: SeoProps) => {
	return (
		<Head>
			<title>{seoTitle}</title>
			<meta name="description" content={seoDescription ?? ""} />
			<meta property="og:image" content={imagePreview?.url ?? ""} />
			<meta property="og:image:secure_url" content={imagePreview.url ?? ""} />
			<meta name="twitter:image" content={imagePreview?.url ?? ""} />
			<meta name="twitter:image:src" content={imagePreview?.url ?? ""} />
			<meta property="og:description" content={seoDescription ?? ""} />
		</Head>
	);
};
