import { encrypt, decrypt } from '@utils/crypt-hash'
import FeedbackModel, { FeedbackUser } from '@database/model/feedback-schema'

import { v4 as uuidv4 } from 'uuid'
import { setCookie, destroyCookie } from 'nookies'

import { NextApiRequest, NextApiResponse } from 'next'

type BodyDataUpdateFeedback = Partial<FeedbackUser>
type BodyDataCreateFeedback = Omit<FeedbackUser, 'userIp'>

const getFeedback = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, socket } = req

  const { postId } = query
  const userIp = socket.remoteAddress
  const authHeader = req.headers.authorization
  const feedbackId = authHeader?.split(' ')[1]

  try {
    if (!userIp || !feedbackId) return res.status(422).json({ message: 'Missing required data' })

    const projection = {
      'feedbackList.feedbackId': 1,
      'feedbackList.name': 1,
      'feedbackList.userIp': 1,
      'feedbackList.createdAt': 1,
      'feedbackList.avatar': 1
    }

    const feedbackExists = await FeedbackModel.findOne(
      {
        'feedbackList.feedbackId': feedbackId
      },
      projection
    )

    if (!feedbackExists)
      return res.status(404).json({
        message: 'Feedback does not exist the list in any post'
      })

    const [feedback] = feedbackExists.feedbackList

    return res.status(200).json(feedback)
  } catch (err) {
    console.error(err)

    res.status(404).json({ message: 'Error get this feedback' })
  }
}

const createFeedback = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, query, socket } = req

  const { postId } = query
  const userIp = socket.remoteAddress
  const authHeader = req.headers.authorization
  const feedbackId = authHeader?.split(' ')[1]

  const { feedbackLevel, name, comment } = body as BodyDataCreateFeedback

  try {
    if (!userIp || !postId) return res.status(422).json({ message: 'Missing required data' })

    if ((!feedbackLevel || !name || !comment) && !feedbackId)
      return res.status(400).json({ message: 'Some required fields are missing' })

    const postCollection = await FeedbackModel.findOne({ postId })

    if (!postCollection) return res.status(404).json({ message: 'Post collection not found' })

    const userFeedback = postCollection.feedbackList.find(
      (f) => f.feedbackId === feedbackId && decrypt(f.userIp) === userIp
    )

    if (userFeedback) return res.status(400).json({ message: 'Feedback already exists' })

    const newFeedbackId = uuidv4()
    const hashIp = encrypt(userIp)

    if (feedbackId) {
      const originalFeedbackOnSomePostId = await FeedbackModel.findOne({
        'feedbackList.feedbackId': feedbackId
      })

      const originalFeedback = originalFeedbackOnSomePostId?.feedbackList.find(
        (f) => f.feedbackId === feedbackId
      )

      if (originalFeedback) {
        postCollection.feedbackList.push({
          feedbackLevel,
          comment,
          userIp: originalFeedback.userIp,
          name: originalFeedback.name,
          avatar: originalFeedback.avatar,
          feedbackId: originalFeedback.feedbackId
        })
      }
    } else {
      postCollection.feedbackList.push({
        feedbackId: newFeedbackId,
        userIp: hashIp,
        feedbackLevel,
        comment,
        name
      })

      setCookie({ res }, 'feedbackId', newFeedbackId, {
        maxAge: new Date('August 17 2030'),
        path: '/',
        sameSite: true
      })
    }

    await postCollection.save()

    return res.status(201).json({ message: 'Feedback created successfully' })
  } catch (err) {
    console.error(err)

    return res.status(400).json({
      message: 'Creation of the feedback unsuccessfully'
    })
  }
}

const updateFeedback = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, query, socket } = req

  const { postId } = query
  const userIp = socket.remoteAddress
  const updatedFields = body as BodyDataUpdateFeedback

  const authHeader = req.headers.authorization
  const feedbackId = authHeader?.split(' ')[1]

  try {
    if (!userIp || !postId || !authHeader)
      return res.status(422).json({ message: 'Missing required data' })

    const postCollection = await FeedbackModel.findOne({ postId })

    if (!postCollection) return res.status(404).json({ message: 'Post collection not found' })

    const userFeedback = postCollection.feedbackList.find(
      (f) => f.feedbackId === feedbackId && decrypt(f.userIp) === userIp
    )

    if (!userFeedback) return res.status(404).json({ message: 'Feedback not found' })

    Object.assign(userFeedback, updatedFields)

    await postCollection.save()

    return res.status(200).json({ userFeedback })
  } catch (err) {
    console.error(err)

    return res.status(400).json({ message: 'Update of the feedback unsuccessfully' })
  }
}

const deleteFeedback = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, socket } = req

  const { postId } = query
  const userIp = socket.remoteAddress
  const authHeader = req.headers.authorization
  const feedbackId = authHeader?.split(' ')[1]

  try {
    if (!userIp || !postId || !authHeader)
      return res.status(422).json({ message: 'Missing required data' })

    const postCollection = await FeedbackModel.findOne({ postId })

    if (!postCollection) return res.status(404).json({ message: 'Post collection not found' })

    const yourFeedback = postCollection.feedbackList.find(
      (f) => f.feedbackId === feedbackId && decrypt(f.userIp) === userIp
    )

    if (!yourFeedback) return res.status(404).json({ message: 'Feedback not found' })

    const filter = { postId }
    const update = {
      $pull: { feedbackList: { userIp: yourFeedback.userIp } }
    }

    const deletedFeedback = await FeedbackModel.findOneAndUpdate(filter, update, {
      new: true
    })

    if (!deletedFeedback) return res.status(404).json({ message: 'Feedback not found' })

    const feedbackExistsOnPost = await FeedbackModel.findOne({
      'feedbackList.feedbackId': feedbackId
    })

    const isFeedbackExist = Boolean(feedbackExistsOnPost)

    if (!isFeedbackExist) destroyCookie({ res }, 'feedbackId', { path: '/' })

    return res.status(200).json({ message: 'Feedback successfully deleted' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Error deleting feedback' })
  }
}

export { getFeedback, createFeedback, updateFeedback, deleteFeedback }
