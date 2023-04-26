import { SwitchColorMode } from "@/layout/header/switch-color-mode";

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function mockUserColorMode() {
	return {
		colorMode: "light",
		toggleColorMode() {
			this.colorMode === "light"
				? (this.colorMode = "dark")
				: (this.colorMode = "light");
		},
	};
}

jest.mock("@chakra-ui/react", () => ({
	...jest.requireActual("@chakra-ui/react"),
	useColorMode: jest.fn(() => mockUserColorMode()),
}));

describe("SwitchColorMode", () => {
	it("should toggle color mode on click", () => {
		const { getByRole } = render(<SwitchColorMode />);
		const button = getByRole("button");

		userEvent.click(button);

		expect(button).toHaveAttribute("aria-label", "light");
	});
});
