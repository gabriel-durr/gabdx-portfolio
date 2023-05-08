import { dbConnect } from '@services/db-connect'
import { authOptions } from '../auth/[...nextauth]'
import {
  getAllBans,
  addBanLocation,
  removeBanLocation
} from '@database/controllers/admin-ctrls/ban-ctrls'

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
        return await getAllBans(res)

      case 'POST':
        return await addBanLocation(req, res)

      case 'DELETE':
        return await removeBanLocation(req, res)

      default:
        res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (error) {
    console.error(error)

    return res.status(500).json({ message: 'Internal server error' })
  }
}

export default handler
