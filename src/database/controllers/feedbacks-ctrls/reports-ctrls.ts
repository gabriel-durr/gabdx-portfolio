import FeedbackModel from '@database/model/feedback-schema'

import { NextApiRequest, NextApiResponse } from 'next'

type RequestBody = {
  reporterTo: string
  reportedBy_Id: string
  reportedByName: string
  typeOfReport: string
}

const createReport = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, query } = req

  const authHeader = req.headers.authorization
  const feedbackId = authHeader?.split(' ')[1]

  const { postId } = query
  const { reportedByName, reporterTo, typeOfReport } = body as RequestBody

  const requiredProps = ['reportedByName', 'reporterTo', 'typeOfReport']

  const allPropsExist = requiredProps.every((prop) => body.hasOwnProperty(prop))

  try {
    if (!allPropsExist || !postId || !feedbackId)
      return res.status(422).json({ message: 'Missing required data' })

    const postCollection = await FeedbackModel.findOne({ postId })

    if (!postCollection) return res.status(404).json({ message: 'Post not found' })

    const feedbackReported = postCollection?.feedbackList.find((f) => f.feedbackId === reporterTo)

    if (!feedbackReported) return res.status(404).json({ message: 'Feedback reported not found' })

    const maxYourReportsOnFeedback =
      feedbackReported?.reports?.filter((r) => r.reportedBy_Id === feedbackId).length === 2

    if (maxYourReportsOnFeedback)
      return res.status(429).json({
        message: 'You cannot create more reports for this feedback'
      })

    feedbackReported.reports?.push({
      reportedByName,
      reportedBy_Id: feedbackId,
      typeOfReport
    })

    await postCollection.save()

    return res.status(201).json({ message: 'Report sucessfully created' })
  } catch (err) {
    console.error(err)

    return res.status(500).json({ message: 'Error creating report' })
  }
}

export { createReport }
