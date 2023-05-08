import { useTypewriter } from 'react-simple-typewriter'
import { CurrentFeedbackProps } from '@hooks/use-current-feedback'

import { useMemo, useEffect } from 'react'
import { Text, Image, HStack } from '@chakra-ui/react'

type TypewriterMessageProps = {
  message: string
  isBot: boolean
  currentFeedback?: CurrentFeedbackProps
  setIsWriting(isWriting: boolean): void
}

export const WritingMessages = ({
  message,
  isBot,
  setIsWriting,
  currentFeedback
}: TypewriterMessageProps) => {
  const [text, helper] = useTypewriter({
    words: [message],
    delaySpeed: 20
  })

  const userName = currentFeedback?.name ?? 'Guest'
  const userAvatar = currentFeedback?.avatar ?? ''

  const memoIsType = useMemo(() => helper.isType, [helper.isType])

  useEffect(() => {
    setIsWriting(memoIsType)
  }, [memoIsType, setIsWriting])

  return (
    <HStack
      spacing={2}
      w="full"
      p={1}
      align="start"
      direction="row-reverse"
      justify={isBot ? 'start' : 'end'}
    >
      <Image
        boxSize={14}
        ml={isBot ? 0 : 2}
        order={isBot ? 0 : 1}
        alt={isBot ? 'gbdx-assistant' : userName}
        src={isBot ? '/gbdx-assistant.svg' : userAvatar}
      />

      <Text p={2} boxSize="full" bg={isBot ? 'blackAlpha.50' : 'blackAlpha.200'}>
        <Text as="span" fontSize="sm" color="gray.900">
          {isBot ? text : message}
        </Text>
      </Text>
    </HStack>
  )
}
