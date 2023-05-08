import FeedbackModel from '@database/model/feedback-schema'

import { NextApiRequest, NextApiResponse } from 'next'

type RequestBody = {
  feedbackTo: string
}

const addDislike = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, query } = req

  const { postId } = query
  const { feedbackTo } = body as RequestBody

  const authHeader = req.headers.authorization
  const feedbackId = authHeader?.split(' ')[1]

  try {
    if (!postId || !feedbackTo || !feedbackId)
      return res.status(422).json({ message: 'Missing required data' })

    const postCollection = await FeedbackModel.findOne({ postId })

    if (!postCollection) return res.status(404).json({ message: 'Post collection not found' })

    const feedback = postCollection?.feedbackList.find((f) => f.feedbackId === feedbackTo)

    if (!feedback) return res.status(404).json({ message: 'Feedback not found' })

    const likes = feedback.likes || []
    const dislikes = feedback.dislikes || []

    const yourDislikeOnFeedback = dislikes.some((dislike) => dislike === feedbackId)
    const yourLikeOnFeedback = likes.some((like) => like === feedbackId)

    if (yourDislikeOnFeedback) {
      return res.status(422).json({ message: 'Dislike already exists for this feedback' })
    }

    const updatedDislikes = [...dislikes, feedbackId]
    const updatedLikes = yourLikeOnFeedback ? likes.filter((like) => like !== feedbackId) : likes

    feedback.dislikes = updatedDislikes
    feedback.likes = updatedLikes

    await postCollection.save()

    return res.status(201).json({ message: 'Dislike successfully added' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Error saving your dislike' })
  }
}

const removeDislike = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req

  const { postId, feedbackTo } = query

  const authHeader = req.headers.authorization
  const feedbackId = authHeader?.split(' ')[1]

  try {
    if (!postId || !feedbackTo || !feedbackId)
      return res.status(422).json({ message: 'Missing required data' })

    const postCollection = await FeedbackModel.findOne({ postId })

    if (!postCollection) return res.status(404).json({ message: 'Post collection not found' })

    const dislikesUserToFeedback = postCollection.feedbackList.find(
      (f) => f.feedbackId === feedbackTo
    )

    if (!dislikesUserToFeedback) return res.status(404).json({ message: 'Feedback not found' })

    const removeToDislike = dislikesUserToFeedback.dislikes?.filter(
      (dislike) => dislike !== feedbackId
    )

    if (removeToDislike?.length === dislikesUserToFeedback.dislikes?.length)
      return res.status(404).json({ message: 'Dislike not found' })

    dislikesUserToFeedback.dislikes = removeToDislike

    await postCollection.save()

    return res.status(204).json({ message: 'Dislike removed successfully' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Error removing dislike' })
  }
}

export { addDislike, removeDislike }
