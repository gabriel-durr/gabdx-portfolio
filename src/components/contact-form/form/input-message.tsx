import { FormContactProps, FormProps } from '.'

import { Textarea, FormLabel, FormControl, FormErrorMessage } from '@chakra-ui/react'

type InputMessageProps = FormContactProps & {
  inputMessage: FormProps['formData']['inputs']['inputMessage']
}

export const InputMessage = ({ errors, register, inputMessage }: InputMessageProps) => {
  const isTextAreaError = !!errors.textarea

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
        {inputMessage.label}
      </FormLabel>
      <Textarea
        variant="gdxTextarea"
        placeholder={inputMessage.placeholder}
        {...register('textarea', {
          required: inputMessage.required_msg,
          maxLength: {
            value: 1400,
            message: inputMessage.max_msg
          }
        })}
      />
      <FormErrorMessage>{errors.textarea && errors.textarea.message}</FormErrorMessage>
    </FormControl>
  )
}
