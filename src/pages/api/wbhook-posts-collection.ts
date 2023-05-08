import { createClient } from '@services/prismicio'
import { dbConnect, db } from '@services/db-connect'
import { createPostsCollections } from '@database/controllers/create-posts-collections'

import { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req

  const { type: webhookType, documents: documentTypes, secret } = body

  const prismicClient = createClient()
  const apiSecret = process.env.PRISMIC_WEBHOOK_SECRET
  const isDocumentWebhook = webhookType === 'api-update' && Boolean(documentTypes.length)

  try {
    if (method !== 'POST') {
      res.setHeader('Allow', ['POST'])
      return res.status(405).end(`Method ${method} Not Allowed`)
    }

    await dbConnect()

    if (secret !== apiSecret) return res.status(401).json({ message: 'Invalid webhook token' })
    if (!isDocumentWebhook) return res.status(400).json({ message: 'Invalid webhook body' })

    const documents = await prismicClient.getAllByIDs(documentTypes, {
      lang: '*'
    })
    const isPostDocument = documents.some((doc) => doc.type === 'post')

    if (!isPostDocument)
      return res.status(404).json({
        message: `There is no document of type "post" (prismic blog in prismic changes)`
      })

    if (isPostDocument) await createPostsCollections({ db, prismicClient })

    return res.status(201).json({
      message: 'Creation | Update | Deletion of the post sucessfully perfomed'
    })
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export default handler
