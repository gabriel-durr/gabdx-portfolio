import FeedbackModel from '@database/model/feedback-schema'

import { NextApiRequest, NextApiResponse } from 'next'

const getAllReports = async (res: NextApiResponse) => {
  try {
    const allReportsInFeedback = await FeedbackModel.aggregate([
      {
        $unwind: '$feedbackList'
      },
      {
        $match: {
          'feedbackList.reports.0': { $exists: true }
        }
      },
      {
        $project: {
          feedbackId: '$feedbackList.feedbackId',
          name: '$feedbackList.name',
          avatar: '$feedbackList.avatar',
          reports: '$feedbackList.reports'
        }
      }
    ])

    if (!allReportsInFeedback) return res.status(404).json({ message: 'No reports found on posts' })

    return res.status(200).json({ allReportsInFeedback })
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching feedbacks' })
  }
}

const closeReport = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req

  const { reportId } = query

  try {
    if (!reportId)
      return res.status(400).json({
        message: 'It is necessary to inform the feedbackId of the report'
      })

    await FeedbackModel.updateOne(
      { 'feedbackList.reports._id': reportId },
      {
        $pull: { 'feedbackList.$[].reports': { _id: reportId } }
      }
    )

    return res.json({ message: 'Feedback sucessfully deleted' })
  } catch (err) {
    return res.status(500).json({ message: 'Error deleting report' })
  }
}

export { getAllReports, closeReport }
