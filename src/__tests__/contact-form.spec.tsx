import { Form } from '@components/contact-form/form'

import axios from 'axios'
import { faker } from '@faker-js/faker'
import userEvent from '@testing-library/user-event'
import { render, waitFor } from '@testing-library/react'

jest.mock('axios')

describe('Contact Form', () => {
  it('should submit form', async () => {
    const { getByRole, getByText } = render(
      <Form
        onClose={() => {}}
        formData={{
          title: 'Contact',
          submit: 'Submit',
          toastLang: {
            sucess: { title: 'error', description: 'error ...' },
            error: { title: 'error' }
          },
          emailNameButtonLang: 'email',
          inputs: {
            inputEmail: {
              label: 'email',
              max_msg: 'max',
              pattern_msg: 'asdasd',
              placeholder: 'asdasd',
              required_msg: 'asdas'
            },
            inputMessage: {
              label: 'message',
              max_msg: 'asdasd',
              placeholder: 'asdas',
              required_msg: 'asdasd'
            },
            inputName: {
              label: 'asdas',
              max_msg: 'asdas',
              min_msg: 'asdasd',
              pattern_msg: 'asdasdasd',
              placeholder: 'asdasdasd',
              required_msg: 'asdasd'
            }
          }
        }}
      />
    )

    const spyAxiosPost = jest.spyOn(axios, 'post')

    const nameFaker = faker.name.fullName()
    const emailFaker = faker.internet.email()
    const messageFaker = faker.lorem.paragraph()

    const nameInput = getByText('name')
    const emailInput = getByText('email')
    const messageTextarea = getByText('message')

    await userEvent.type(nameInput, nameFaker)
    await userEvent.type(emailInput, emailFaker)
    await userEvent.type(messageTextarea, messageFaker)

    const submitButton = getByRole('button', { name: /submit/i })
    userEvent.click(submitButton)

    await waitFor(
      () =>
        expect(spyAxiosPost).toHaveBeenCalledWith('/api/mail', {
          name: nameFaker,
          email: emailFaker,
          textarea: messageFaker
        }),
      { timeout: 2000 }
    )
  })
})
