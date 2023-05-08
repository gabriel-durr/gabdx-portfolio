import { dbConnect } from '@services/db-connect'
import { createReport } from '@database/controllers/feedbacks-ctrls/reports-ctrls'

import { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    headers: { authorization }
  } = req

  try {
    const feedbackId = authorization?.split(' ')[1]

    if (!feedbackId) return res.status(400).json({ message: 'Feedback is required' })

    await dbConnect()

    if (method === 'POST') return await createReport(req, res)

    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${method} Not Allowed`)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export default handler
