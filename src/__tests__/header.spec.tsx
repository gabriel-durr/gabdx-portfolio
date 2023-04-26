import { faker } from "@faker-js/faker";
import { Header } from "@/layout/header";
import { render } from "@testing-library/react";

jest.mock("next/router", () => ({
	useRouter() {
		return {
			route: "/",
			pathname: "",
			query: "",
			asPath: "",
			push: jest.fn(),
			events: {
				on: jest.fn(),
				off: jest.fn(),
			},
			beforePopState: jest.fn(() => null),
			prefetch: jest.fn(() => null),
		};
	},
}));

window.matchMedia =
	window.matchMedia ||
	function () {
		return {
			matches: false,
			addListener: function () {},
			removeListener: function () {},
		};
	};

const menuItemsFaker = {
	about: "sobre",
	connect: "conectar",
	formData: {
		email: faker.internet.email(),
		emailPlace: "digite seu email",
		message: faker.lorem.sentence(),
		messagePlace: "Digite sua mensagem",
		name: faker.name.fullName(),
		namePlace: "digite seu nome",
		submit: "enviar",
		title: "Contato",
	},
	lang: "pt-br",
	posts: faker.animal.cat(),
};

describe("Header", () => {
	it("should be on screen ", () => {
		const { getByTestId } = render(
			<Header
				altLangs={[
					{
						id: faker.datatype.uuid(),
						lang: "pt-br",
						type: "menu",
						uid: faker.lorem.slug(),
					},
					{
						id: faker.datatype.uuid(),
						lang: "en-us",
						type: "menu",
						uid: faker.lorem.slug(),
					},
				]}
				menuItems={menuItemsFaker}
			/>
		);

		const navigation = getByTestId("header");

		expect(navigation).toBeInTheDocument();
	});
});
