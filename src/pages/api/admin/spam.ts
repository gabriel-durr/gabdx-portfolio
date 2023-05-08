import { dbConnect } from '@services/db-connect'
import { authOptions } from '../auth/[...nextauth]'
import {
  getAllFeedbacksSpam,
  removeAllFeedbackSpam
} from '@database/controllers/admin-ctrls/spam-ctrls'

import { getServerSession } from 'next-auth/next'
import { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  try {
    const session = await getServerSession(req, res, authOptions)

    if (!session) return res.status(401).json({ message: 'Unouthorized' })

    await dbConnect()

    switch (method) {
      case 'GET':
        return await getAllFeedbacksSpam(res)

      case 'POST':
        return await removeAllFeedbackSpam(req, res)

      default:
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (error) {
    console.error(error)

    return res.status(500).json({ message: 'Internal server error' })
  }
}

export default handler
