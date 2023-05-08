import { createClient } from '@services/prismicio'

import { NextApiRequest, NextApiResponse } from 'next'
import { setPreviewData, redirectToPreviewURL } from '@prismicio/next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = createClient({ req })

  try {
    await setPreviewData({ req, res })

    await redirectToPreviewURL({ req, res, client })
  } catch (err) {
    res.status(500).json({ err })
  }
}

export default handler
