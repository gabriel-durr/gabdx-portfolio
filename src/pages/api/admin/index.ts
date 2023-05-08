import { dbConnect } from '@services/db-connect'
import { authOptions } from '../auth/[...nextauth]'

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
        return res.status(200).json({ ok: true })

      case 'POST':
        return res.status(200).json({ deletado: true })

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
