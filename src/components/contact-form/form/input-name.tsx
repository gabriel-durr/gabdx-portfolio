import { FormProps } from '.'

import { BsPersonVcardFill } from 'react-icons/bs'

import { FieldError, UseFormRegister } from 'react-hook-form'

import { FocusEvent } from 'react'
import {
  Icon,
  Input,
  FormLabel,
  InputGroup,
  useBoolean,
  FormControl,
  FormErrorMessage,
  InputRightElement
} from '@chakra-ui/react'

type InputNameProps = {
  i18nName: FormProps['formData']['inputs']['inputName']
  errorName?: FieldError
  register: UseFormRegister<{
    name: string
    email: string
    textarea: string
  }>
}

export const InputName = ({ i18nName, errorName, register }: InputNameProps) => {
  const [isMove, setMove] = useBoolean(false)

  const isNameError = !!errorName

  function handleOnBlur({ target: { value } }: FocusEvent<HTMLInputElement>) {
    value.length > 0 ? setMove.on() : setMove.off()
  }

  return (
    <FormControl variant="floating" isInvalid={isNameError} isRequired>
      <FormLabel fontSize="1.1rem" fontFamily="body">
        {i18nName.label}
      </FormLabel>
      <InputGroup>
        <InputRightElement h="full">
          <Icon fontSize="17px" as={BsPersonVcardFill} />
        </InputRightElement>
        <Input
          variant="gdxContact"
          textIndent={isMove ? '92px' : '8px'}
          transition="text-indent ease .6s"
          onFocus={() => isMove && setMove.off()}
          placeholder={i18nName.placeholder}
          {...register('name', {
            onBlur: handleOnBlur
          })}
        />
      </InputGroup>
      <FormErrorMessage>{isNameError && errorName.message}</FormErrorMessage>
    </FormControl>
  )
}
