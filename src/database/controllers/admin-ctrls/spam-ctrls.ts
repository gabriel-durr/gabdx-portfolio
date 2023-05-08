import { decrypt } from '@utils/crypt-hash'
import FeedbackModel from '@database/model/feedback-schema'

import { NextApiRequest, NextApiResponse } from 'next'

type FeedbackSpamType = Record<
  string,
  { userIp: string; isSpamFeedback: boolean; allIdLocation: string[] }
>

const getAllFeedbacksSpam = async (res: NextApiResponse) => {
  try {
    const feedbackList = await FeedbackModel.find().select('feedbackList')

    if (!feedbackList) return res.status(404).json({ message: 'No feedback list found' })

    const isAllFeedbacksLocationSpam = Object.values(
      feedbackList.reduce((acc, { feedbackList }) => {
        feedbackList.forEach(({ feedbackId, userIp }) => {
          const locationDecrypt = decrypt(userIp)
          const userIpData = acc[locationDecrypt]

          if (userIpData) {
            userIpData.isSpamFeedback = true
            userIpData.allIdLocation.push(feedbackId)
          } else {
            acc[locationDecrypt] = {
              userIp,
              isSpamFeedback: false,
              allIdLocation: [feedbackId]
            }
          }
        })
        return acc
      }, {} as FeedbackSpamType)
    ).filter(({ isSpamFeedback }) => isSpamFeedback === true)

    return res.status(200).json(isAllFeedbacksLocationSpam)
  } catch (err) {
    return res.status(404).json({ message: 'Error fetching feedbacks spam' })
  }
}

const removeAllFeedbackSpam = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req

  const { idsFeedbackSpam } = body

  try {
    if (!idsFeedbackSpam.length)
      return res.status(400).json({ messsage: 'There is no feedbackId in the list' })

    const result = await FeedbackModel.updateMany(
      { 'feedbackList.feedbackId': { $in: idsFeedbackSpam } },
      {
        $pull: {
          feedbackList: { feedbackId: { $in: idsFeedbackSpam } }
        }
      }
    )

    if (result.modifiedCount === 0)
      return res.status(400).json({ message: 'No feedback has been deleted' })

    return res.json({ message: 'Feedback sucessfully deleted' })
  } catch (err) {
    return res.status(500).json({ message: 'Error deleting feedback spam' })
  }
}

export { getAllFeedbacksSpam, removeAllFeedbackSpam }
