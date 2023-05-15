import { FormProps } from '.'

import { FieldError, UseFormRegister } from 'react-hook-form'

import { Textarea, FormLabel, FormControl, FormErrorMessage } from '@chakra-ui/react'

type InputMessageProps = {
  i18nMessage: FormProps['formData']['inputs']['inputMessage']
  errorMessage?: FieldError
  register: UseFormRegister<{
    name: string
    email: string
    textarea: string
  }>
}

export const InputMessage = ({ errorMessage, register, i18nMessage }: InputMessageProps) => {
  const isTextAreaError = !!errorMessage

  return (
    <FormControl isInvalid={isTextAreaError} isRequired>
      <FormLabel
        w="min"
        fontSize={14}
        fontWeight="medium"
        fontFamily="heading"
        textTransform="uppercase"
        _dark={{
          color: 'light.400'
        }}
      >
        {i18nMessage.label}
      </FormLabel>
      <Textarea
        variant="gdxTextarea"
        placeholder={i18nMessage.placeholder}
        {...register('textarea')}
      />
      <FormErrorMessage>{isTextAreaError && errorMessage.message}</FormErrorMessage>
    </FormControl>
  )
}
