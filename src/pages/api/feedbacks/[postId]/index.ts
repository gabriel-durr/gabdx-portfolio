import { decrypt } from '@utils/crypt-hash'
import { dbConnect } from '@services/db-connect'
import {
  getFeedback,
  createFeedback,
  updateFeedback,
  deleteFeedback
} from '@database/controllers/feedbacks-ctrls'
import BanLocationModel from '@database/model/ban-location-schema'

import { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, socket } = req
  const userIp = socket.remoteAddress

  try {
    await dbConnect()

    const allBanLocations = await BanLocationModel.find({})

    const isBanned = allBanLocations.some((ban) => decrypt(ban.userIp) === userIp)

    if (isBanned)
      return res.status(403).json({ message: 'you are banned, not be able acess the api' })

    switch (method) {
      case 'GET':
        return await getFeedback(req, res)

      case 'POST':
        return await createFeedback(req, res)

      case 'PUT':
        return await updateFeedback(req, res)

      case 'DELETE':
        return await deleteFeedback(req, res)

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (err) {
    console.error(err)

    res.status(500).json('Internal server error')
  }
}

export default handler
