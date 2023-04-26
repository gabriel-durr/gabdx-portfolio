import { Form } from "@components/contact-form/form";

import axios from "axios";
import { faker } from "@faker-js/faker";
import userEvent from "@testing-library/user-event";
import { render, waitFor } from "@testing-library/react";

const formData = {
	title: "Contact form",
	email: "email",
	emailPlace: "Type your e-mail",
	message: "message",
	messagePlace: "write your message",
	name: "name",
	namePlace: "type your name",
	submit: "submit",
};

jest.mock("axios");

describe("Contact Form", () => {
	it("should submit form", async () => {
		const { getByRole, getByText } = render(
			<Form formData={formData} lang={"en-us"} />
		);

		const spyAxiosPost = jest.spyOn(axios, "post");

		const nameFaker = faker.name.fullName();
		const emailFaker = faker.internet.email();
		const messageFaker = faker.lorem.paragraph();

		const nameInput = getByText("name");
		const emailInput = getByText("email");
		const messageTextarea = getByText("message");

		await userEvent.type(nameInput, nameFaker);
		await userEvent.type(emailInput, emailFaker);
		await userEvent.type(messageTextarea, messageFaker);

		const submitButton = getByRole("button", { name: /submit/i });
		userEvent.click(submitButton);

		await waitFor(
			() =>
				expect(spyAxiosPost).toHaveBeenCalledWith("/api/mail", {
					name: nameFaker,
					email: emailFaker,
					textarea: messageFaker,
				}),
			{ timeout: 2000 }
		);
	});
});
