import { FormProps } from '.'

import { HiMail } from 'react-icons/hi'
import { FieldError, UseFormRegister } from 'react-hook-form'

import { FocusEvent } from 'react'
import {
  Icon,
  Input,
  FormLabel,
  useBoolean,
  InputGroup,
  FormControl,
  FormErrorMessage,
  InputRightElement
} from '@chakra-ui/react'

type InputEmailProps = {
  i18nEmail: FormProps['formData']['inputs']['inputEmail']
  errorEmail?: FieldError
  register: UseFormRegister<{
    name: string
    email: string
    textarea: string
  }>
}

export const InputEmail = ({ i18nEmail, register, errorEmail }: InputEmailProps) => {
  const [isMove, setMove] = useBoolean(false)

  const isEmailError = !!errorEmail

  function handleOnBlur({ target: { value } }: FocusEvent<HTMLInputElement>) {
    value.length > 0 ? setMove.on() : setMove.off()
  }

  return (
    <FormControl variant="floating" isInvalid={isEmailError} isRequired>
      <FormLabel fontWeight="medium" fontSize="1.1rem" fontFamily="body">
        {i18nEmail.label}
      </FormLabel>

      <InputGroup>
        <InputRightElement h="full">
          <Icon fontSize="20px" as={HiMail} />
        </InputRightElement>

        <Input
          type="email"
          variant="gdxContact"
          textIndent={isMove ? '92px' : '8px'}
          transition="text-indent ease .6s"
          onFocus={() => isMove && setMove.off()}
          placeholder={i18nEmail.placeholder}
          {...register('email', { onBlur: handleOnBlur })}
        />
      </InputGroup>

      <FormErrorMessage>{isEmailError && errorEmail.message}</FormErrorMessage>
    </FormControl>
  )
}
