import { toastContactForm } from "@utils/lang-formatter";

import { Content } from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";

type LayoutFormatProps = {
	menu: Content.MenuDocument;
	footer: Content.FooterDocument;
};

type InputTypes = NonNullable<
	Record<keyof Content.MenuDocumentDataInputItem, string>
>;

type InputsProps = {
	inputName: InputTypes;
	inputEmail: Omit<InputTypes, "min_msg">;
	inputMessage: Omit<InputTypes, "min_msg" | "pattern_msg">;
};

export const layoutFormat = ({ menu, footer }: LayoutFormatProps) => {
	const inputs = {} as InputsProps;

	menu.data.input.forEach(({ label: labelPrismic, ...rest }) => {
		const label = labelPrismic?.toString() as string;

		const prop = {
			label,
			...Object.fromEntries(
				Object.entries(rest).filter(([_, value]) => value !== null)
			),
		} as InputTypes;

		if (["Nome", "Name"].includes(label)) {
			inputs.inputName = prop;
		} else if (["E-mail", "Email"].includes(label)) {
			inputs.inputEmail = prop;
		} else if (["Mensagem", "Message"].includes(label)) {
			inputs.inputMessage = prop;
		}
	});

	const menuItems = {
		about: menu.data.about,
		posts: menu.data.posts,
		connect: menu.data.connect,
		formData: {
			inputs,
			title: menu.data.form_title,
			submit: menu.data.submit,
			emailNameButtonLang: menu.lang === "pt-br" ? "E-mail" : "Email",
			toastLang: toastContactForm(menu.lang),
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
