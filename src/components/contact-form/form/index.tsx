import { ContactFormProps } from '..'
import { InputName } from './input-name'
import { InputEmail } from './input-email'
import { useToast } from '@hooks/use-toast'
import { InputMessage } from './input-message'
import { zodResolver } from '@hookform/resolvers/zod'

import { z } from 'zod'
import { zodFormSchema } from '@helpers/zod-schemas'

import axios from 'axios'
import { useForm } from 'react-hook-form'
import { MoonLoader } from 'react-spinners'

import { VStack, Button } from '@chakra-ui/react'

export type FormProps = Omit<ContactFormProps, 'linkColor'> & {
  onClose(): void
}

export const Form = ({ formData, onClose }: FormProps) => {
  const contactFormSchema = zodFormSchema(formData.inputs)

  type contactFormType = z.infer<typeof contactFormSchema>

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isSubmitted, isValid }
  } = useForm<contactFormType>({ resolver: zodResolver(contactFormSchema) })

  const { toastExec } = useToast()

  const isErrorExists = Boolean(Object.keys(errors).length)
  const isDisabled = (isSubmitted && !isValid) || isErrorExists

  const {
    inputs: { inputName, inputEmail, inputMessage },
    toastLang
  } = formData

  const onSubmit = async ({ name, email, textarea }: contactFormType) => {
    await new Promise((resolve) => setTimeout(resolve, 1400))

    console.log(name, email, textarea)

    try {
      await axios.post('/api/mail', {
        name,
        email,
        textarea
      })

      toastExec({
        title: toastLang.sucess.title,
        description: toastLang.sucess.description
      })
    } catch (err) {
      console.error(err)

      toastExec({
        title: toastLang.error.title,
        status: 'error'
      })
    } finally {
      onClose()
    }
  }

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      align="center"
      flex={1}
      p={{ base: '.4rem', md: '2rem' }}
      spacing={8}
      borderRadius="5px"
    >
      <InputName i18nName={inputName} register={register} errorName={errors.name} />

      <InputEmail i18nEmail={inputEmail} register={register} errorEmail={errors.email} />

      <InputMessage i18nMessage={inputMessage} register={register} errorMessage={errors.textarea} />

      <Button
        variant="gdxSolidButton"
        role="button"
        type="submit"
        isDisabled={isDisabled}
        isLoading={isSubmitting}
        spinner={<MoonLoader size={22} color="white" />}
      >
        {formData.submit}
      </Button>
    </VStack>
  )
}
