import { LanguageSwitcher } from "@/layout/header/language-switcher";

import { faker } from "@faker-js/faker";
import { render } from "@testing-library/react";

describe("Language Switcher", () => {
	it("should render language flags and names", () => {
		const { getByLabelText } = render(
			<LanguageSwitcher
				altLangs={[
					{
						uid: faker.lorem.slug(),
						id: faker.datatype.uuid(),
						lang: "pt-br",
						type: "menu",
					},
					{
						uid: faker.lorem.slug(),
						id: faker.datatype.uuid(),
						lang: "en-us",
						type: "menu",
					},
				]}
				isLargerScreen={true}
			/>
		);

		const enFlag = getByLabelText("en-us");
		const ptFlag = getByLabelText("pt-br");

		expect(enFlag).toBeInTheDocument();
		expect(ptFlag).toBeInTheDocument();

		expect(enFlag.closest("a")?.getAttribute("locale")).toBe("en-us");
		expect(ptFlag.closest("a")?.getAttribute("locale")).toBe("pt-br");
	});
});
