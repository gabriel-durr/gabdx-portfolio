import { Content } from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";

type LayoutFormatProps = {
	menu: Content.MenuDocument;
	footer: Content.FooterDocument;
};

export const layoutFormat = ({ menu, footer }: LayoutFormatProps) => {
	const menuItems = {
		about: menu.data.about,
		posts: menu.data.posts,
		connect: menu.data.connect,
		lang: menu.lang,
		formData: {
			title: menu.data.form_title,
			name: menu.data.name,
			namePlace: menu.data.name_place,
			email: menu.data.email,
			emailPlace: menu.data.email_place,
			message: menu.data.message,
			messagePlace: menu.data.message_place,
			submit: menu.data.submit,
		},
	};

	const footerData = {
		credits: footer.data.credits,
		linkedinLink: prismicH.asLink(footer.data.linkedinLink) || "",
		githubLink: prismicH.asLink(footer.data.githubLink) || "",
		instagramLink: prismicH.asLink(footer.data.instagramLink) || "",
	};

	return {
		menuItems,
		footerData,
	};
};
