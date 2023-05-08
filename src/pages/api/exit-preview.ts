import { exitPreview } from '@prismicio/next'

import { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await exitPreview({ res, req })
  } catch (err) {
    res.status(500).json({ err })
  }
}

export default handler
