import { FormContactProps, FormProps } from '.'

import { HiMail } from 'react-icons/hi'

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

type InputEmailProps = FormContactProps & {
  inputEmail: FormProps['formData']['inputs']['inputEmail']
}

export const InputEmail = ({ inputEmail, register, errors }: InputEmailProps) => {
  const [isMove, setMove] = useBoolean(false)

  const validEmailRgx = /^\S+@\S+$/i
  const isEmailError = !!errors.email

  function handleOnBlur({ target: { value } }: FocusEvent<HTMLInputElement>) {
    value.length > 0 ? setMove.on() : setMove.off()
  }

  return (
    <FormControl variant="floating" isInvalid={isEmailError} isRequired>
      <FormLabel fontWeight="medium" fontSize="1.1rem" fontFamily="body">
        {inputEmail.label}
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
          placeholder={inputEmail.placeholder}
          {...register('email', {
            required: inputEmail.required_msg,
            maxLength: {
              value: 80,
              message: inputEmail.max_msg
            },
            pattern: {
              value: validEmailRgx,
              message: inputEmail.pattern_msg
            },
            onBlur: handleOnBlur
          })}
        />
      </InputGroup>

      <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
    </FormControl>
  )
}
