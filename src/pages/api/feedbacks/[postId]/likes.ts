import { dbConnect } from '@services/db-connect'
import { addLike, removeLike } from '@database/controllers/feedbacks-ctrls/likes-ctrls'

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
        return await addLike(req, res)

      case 'DELETE':
        return await removeLike(req, res)

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
