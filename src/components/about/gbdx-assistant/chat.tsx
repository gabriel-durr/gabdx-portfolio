import { api } from '@services/api'
import { WritingMessages } from './writing-messages'
import { useChatReducer } from '@hooks/use-chat-reducer'

import { useCurrentFeedback } from '@hooks/use-current-feedback'

import { useForm } from 'react-hook-form'
import { RiseLoader } from 'react-spinners'
import { AiOutlineSend } from 'react-icons/ai'

import { useState } from 'react'
import {
  Stack,
  HStack,
  VStack,
  Textarea,
  InputGroup,
  IconButton,
  FormControl
} from '@chakra-ui/react'

type inputUserType = {
  user: string
}

export const Chat = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<inputUserType>()

  const { currentFeedback } = useCurrentFeedback()
  const { messages, handleUserMessage, handleBotMessage } = useChatReducer()

  const [isWriting, setIsWriting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleMessage = async ({ user: userMessage }: inputUserType) => {
    try {
      handleUserMessage(userMessage)

      reset()
      setIsLoading(true)

      const { data: botMessage } = await api.post('/openai', {
        userMessage
      })

      handleBotMessage(botMessage)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Stack color="gbdx.white" spacing={4}>
      <VStack
        w="full"
        h="258px"
        maxH="328px"
        p={2}
        spacing={8}
        bg="light.300"
        rounded="md"
        overflowY="scroll"
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }}
      >
        {messages.map((message, key) => {
          const isEqualBot = message.from === 'bot'

          return (
            <WritingMessages
              key={key}
              isBot={isEqualBot}
              message={message.text}
              setIsWriting={setIsWriting}
              currentFeedback={currentFeedback}
            />
          )
        })}
      </VStack>

      <HStack
        bg="gbdx.black"
        as="form"
        noValidate
        align="end"
        onSubmit={handleSubmit(handleMessage)}
      >
        <FormControl isInvalid={!!errors.user}>
          <InputGroup pos="relative">
            <Textarea
              variant="gdxComment"
              autoComplete="off"
              sx={{
                '&::-webkit-scrollbar': {
                  display: 'none'
                }
              }}
              {...register('user', {
                required: 'Campo obrigatório'
              })}
            />

            <IconButton
              type="submit"
              variant="unstyled"
              pos="absolute"
              bottom={2}
              right={isLoading || isWriting ? '46%' : 4}
              size="sm"
              fontSize="xl"
              aria-label="send message"
              _hover={{
                color: 'gbdx.sun',
                transition: 'color .2s ease'
              }}
              icon={<AiOutlineSend />}
              isLoading={isLoading || isWriting}
              spinner={<RiseLoader size={6} color="white" />}
            />
          </InputGroup>
        </FormControl>
      </HStack>
    </Stack>
  )
}
