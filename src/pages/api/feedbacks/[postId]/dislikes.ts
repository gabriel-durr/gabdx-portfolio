import { dbConnect } from '@services/db-connect'
import { addDislike, removeDislike } from '@database/controllers/feedbacks-ctrls/dislikes-ctrls'

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

    switch (method) {
      case 'POST':
        return await addDislike(req, res)

      case 'DELETE':
        return await removeDislike(req, res)

      default:
        res.setHeader('Allow', ['POST', 'DELETE'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export default handler
