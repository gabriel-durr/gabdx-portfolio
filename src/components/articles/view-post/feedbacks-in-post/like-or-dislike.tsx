import { Tada } from '@animations/tada'
import { likeOrDislikeLang } from '@utils/lang-formatter'
import { useFeedback, FeedbackList } from '@hooks/use-feedbacks'

import { AiFillLike, AiFillDislike, AiOutlineLike, AiOutlineDislike } from 'react-icons/ai'

import { useState } from 'react'

import { ButtonGroup, IconButton, useToast } from '@chakra-ui/react'

type LikeOrDislikeProps = Pick<FeedbackList, 'feedbackId' | 'likes' | 'dislikes'> & {
  lang: string
}

export const LikeOrDislike = ({ lang, feedbackId, likes, dislikes }: LikeOrDislikeProps) => {
  const [isClickedLike, setIsClickedLike] = useState(false)

  const { addLike, removeLike, addDislike, removeDislike } = useFeedback()

  const sevenSeconds = 7 * 1000
  const toast = useToast({
    isClosable: true,
    position: 'top',
    duration: sevenSeconds
  })

  const { likeLang, dislikeLang } = likeOrDislikeLang(lang)

  async function handleLike(isLike: boolean, feedbackId: string) {
    try {
      isLike ? await removeLike(feedbackId) : await addLike(feedbackId)

      if (!likes.isLike) {
        setIsClickedLike(true)

        await new Promise((resolve) => setTimeout(resolve, 1400))

        setIsClickedLike(false)
      }
    } catch ({ response }: any) {
      const isFeedbackRequired = response.status === 400

      toast({
        title: isFeedbackRequired ? likeLang.requireFeedbackMsg : likeLang.errorServer,
        status: 'error'
      })
    }
  }

  async function handleDislike(isDislike: boolean, feedbackId: string) {
    try {
      isDislike ? await removeDislike(feedbackId) : await addDislike(feedbackId)
    } catch ({ response }: any) {
      const isFeedbackRequired = response.status === 400

      toast({
        title: isFeedbackRequired ? dislikeLang.requireFeedbackMsg : dislikeLang.errorServer,
        status: 'error'
      })
    }
  }

  return (
    <ButtonGroup pos="relative" gap={4}>
      <IconButton
        variant="unstyled"
        display="flex"
        gap={1}
        size="sm"
        fontSize="lg"
        aria-label="like button"
        _after={{
          content: `'(${likes.likeQdt})'`,
          fontWeight: 'medium'
        }}
        icon={likes.isLike ? <AiFillLike /> : <AiOutlineLike />}
        onClick={() => handleLike(likes.isLike, feedbackId)}
      />

      {isClickedLike && <Tada />}

      <IconButton
        variant="unstyled"
        display="flex"
        gap={1}
        size="sm"
        fontSize="lg"
        aria-label="Dislike button"
        _after={{
          content: `'(${dislikes.dislikeQdt})'`,
          fontWeight: 'medium'
        }}
        icon={dislikes.isDislike ? <AiFillDislike /> : <AiOutlineDislike />}
        onClick={() => handleDislike(dislikes.isDislike, feedbackId)}
      />
    </ButtonGroup>
  )
}
