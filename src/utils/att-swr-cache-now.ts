import { FeedbacksData, UpdatedFeedbackType } from '@hooks/use-feedbacks'

type DataApiFeedback = {
  data: FeedbacksData
}

type ChangeTheLikeNowType = DataApiFeedback & {
  isLike: boolean
  feedbackTo: string
}

type ChangeTheDislikeNowType = DataApiFeedback & {
  isDislike: boolean
  feedbackTo: string
}

type UpdatedFeedbackNowType = DataApiFeedback & {
  updatedData: UpdatedFeedbackType
  feedbackId: string
}

type RemoveFeedbackNowType = DataApiFeedback & {
  feedbackId: string
}

const UpdatedFeedbackNow = ({ data, updatedData, feedbackId }: UpdatedFeedbackNowType) => {
  const updatedFeedbackList = data.feedbackList.map((feedback) => {
    if (feedback._id.toString() === feedbackId) {
      return {
        ...feedback,
        ...updatedData
      }
    }
    return feedback
  })

  const updatedFeedbackData: FeedbacksData = {
    ...data,
    feedbackList: updatedFeedbackList || []
  }

  return updatedFeedbackData
}

const removeFeedbackNow = ({ data, feedbackId }: RemoveFeedbackNowType) => {
  const updatedFeedbackList = data.feedbackList.filter(
    (feedback) => feedback._id.toString() !== feedbackId
  )

  const updatedFeedbackData: FeedbacksData = {
    ...data,
    feedbackList: updatedFeedbackList || []
  }

  return updatedFeedbackData
}

const changeTheLikeNow = ({ data, isLike, feedbackTo }: ChangeTheLikeNowType) => {
  const updatedFeedbackList = data.feedbackList.map((feedback) => {
    if (feedback._id.toString() === feedbackTo) {
      return {
        ...feedback,
        like: {
          isLike
        }
      }
    }
    return feedback
  })

  const updatedData: FeedbacksData = {
    ...data,
    feedbackList: updatedFeedbackList || []
  }

  return updatedData
}

const changeTheDislikeNow = ({ data, isDislike, feedbackTo }: ChangeTheDislikeNowType) => {
  const updatedFeedbackList = data.feedbackList.map((feedback) => {
    if (feedback._id.toString() === feedbackTo) {
      return {
        ...feedback,
        dislike: {
          isDislike
        }
      }
    }
    return feedback
  })

  const updatedData: FeedbacksData = {
    ...data,
    feedbackList: updatedFeedbackList || []
  }

  return updatedData
}

export { changeTheLikeNow, changeTheDislikeNow, UpdatedFeedbackNow, removeFeedbackNow }
