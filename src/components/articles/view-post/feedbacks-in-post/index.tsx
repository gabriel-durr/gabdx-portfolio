import Comment from './comment'
import { useFeedback } from '@hooks/use-feedbacks'
import { TotalFeedbacks } from './total-feedbacks'
import { InputsFeedbacks } from './inputs-feedback'
import { SkeletonsLoading } from './skeletons-loading'
import { feedbacksInPostLang } from '@utils/lang-formatter'

import NextImage from 'next/image'
import { parseCookies } from 'nookies'

import { Box, Text, Flex, VStack, Heading, HStack } from '@chakra-ui/react'

type FeedbacksInPostProps = {
  lang: string
}

export const FeedbacksInPost = ({ lang }: FeedbacksInPostProps) => {
  const { data, isLoading } = useFeedback()

  const { feedbackId: cookieFeedbackId } = parseCookies()

  if (isLoading || !data) return <SkeletonsLoading />

  const sortedFeedbackList = data.feedbackList.sort(({ feedbackId }) => {
    if (feedbackId === cookieFeedbackId) {
      return -1
    } else {
      return 0
    }
  })

  const isEqualFeedbackId = data.feedbackList.some(
    (feedback) => feedback.feedbackId === cookieFeedbackId
  )

  const { banMsg, altImage, feedbackTitle } = feedbacksInPostLang(lang)

  if (data?.isBanned)
    return (
      <Flex justify="center" w="full" pt={40}>
        <HStack rounded="xl" bg="gbdx.black" align="end" p={6} pb={14}>
          <Text color="red.300" fontSize={{ base: 'sm', md: 'md' }}>
            {banMsg}
          </Text>
          <NextImage src="/ban.png" alt={altImage} width={80} height={80} />
        </HStack>
      </Flex>
    )

  return (
    <Flex
      direction="column"
      w="full"
      gap={12}
      shadow="sm"
      justify="center"
      align="center"
      bg="blackAlpha.50"
      _light={{ bg: 'whiteAlpha.50' }}
    >
      <VStack w="full" p={{ base: 1, md: 8 }} spacing={16} align="center">
        {!isEqualFeedbackId && <InputsFeedbacks lang={lang} cookieFeedbackId={cookieFeedbackId} />}

        <HStack alignSelf="start" spacing={{ base: 8, md: 28 }}>
          <Heading fontFamily="heading" fontWeight="medium" fontSize="1.4rem">
            {feedbackTitle}
            <Text pl={2} fontSize="lg" fontWeight="hairline" as="span">
              {`(${data.totalFeedbacks})`}
            </Text>
          </Heading>

          <TotalFeedbacks feedbackLevelQdt={data.feedbackLevelQdt} />
        </HStack>

        <Box w="full" h=".4px" opacity=".4" bg="whiteAlpha.100" _light={{ bg: 'blackAlpha.100' }} />

        <VStack spacing={8} boxSize="full">
          {sortedFeedbackList.map(
            ({ _id, feedbackId, avatar, name, comment, likes, dislikes, createdAt, updatedAt }) => (
              <VStack key={_id.toString()} w="full" h="180px">
                <Comment
                  lang={lang}
                  feedbackId={feedbackId}
                  avatar={avatar}
                  name={name}
                  createdAt={createdAt}
                  updatedAt={updatedAt}
                  comment={comment}
                  likes={likes}
                  dislikes={dislikes}
                  cookieFeedbackId={cookieFeedbackId}
                />

                <Box
                  w="96%"
                  h=".1px"
                  bg="whiteAlpha.100"
                  opacity=".1"
                  _light={{
                    bg: 'blackAlpha.100',
                    opacity: '.4'
                  }}
                />
              </VStack>
            )
          )}
        </VStack>
      </VStack>
    </Flex>
  )
}
