import { Curriculum } from "@components/about/curriculum";

import { faker } from "@faker-js/faker";
import { render } from "@testing-library/react";

describe("Curriculum", () => {
	it("should be download curriculum link", () => {
		const url = faker.internet.url();

		const { getByRole } = render(<Curriculum curriculum={url} />);

		const link = getByRole("link", { name: "CV Curriculum Download" });

		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute("href", url);
	});
});
