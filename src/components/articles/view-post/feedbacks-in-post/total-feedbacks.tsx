import { FeedbacksData } from '@hooks/use-feedbacks'

import { Flex, HStack, Text } from '@chakra-ui/react'

type EmojisType = {
  [key in keyof FeedbacksData['feedbackLevelQdt']]: string
}

type FeedbackExistsType = {
  feedbackLevel: string
  feedbackQdt: number
  emoji: string
}

type TotalFeedbacksProps = {
  feedbackLevelQdt: FeedbacksData['feedbackLevelQdt'] & {
    [key: string]: number
  }
}

export const TotalFeedbacks = ({ feedbackLevelQdt }: TotalFeedbacksProps) => {
  const emojis: EmojisType = {
    excellent: '😁',
    good: '🙂',
    regular: '😐',
    bad: '🙁',
    terrible: '😣'
  }

  const feedbacksExists: FeedbackExistsType[] = []

  Object.keys(feedbackLevelQdt).forEach((key) => {
    if (feedbackLevelQdt[key] > 0) {
      const item = {
        feedbackLevel: key,
        feedbackQdt: feedbackLevelQdt[key],
        emoji: emojis[key as keyof EmojisType]
      }

      feedbacksExists.push(item)
    }
  })

  function colorByEmojiType(feedbackLevel: string) {
    const colors: Record<string, string> = {
      excellent: 'green',
      good: 'green',
      regular: 'cyan.600',
      bad: 'red',
      terrible: 'red'
    }
    return colors[feedbackLevel] || 'white'
  }

  return (
    <Flex gap={4} userSelect="none" pointerEvents="none">
      {feedbacksExists.map(({ emoji, feedbackQdt, feedbackLevel }) => (
        <HStack spacing={1} key={emoji}>
          <Text>{emoji}</Text>

          <Text as="span" fontFamily="body">
            <Text as="sup" fontFamily="number" color={colorByEmojiType(feedbackLevel)}>
              {feedbackQdt}
            </Text>
          </Text>
        </HStack>
      ))}
    </Flex>
  )
}
