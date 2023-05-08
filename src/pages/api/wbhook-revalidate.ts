import { linkResolver, createClient } from '@services/prismicio'

import * as prismicH from '@prismicio/helpers'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { type: webhookType, documents: documentTypes, secret } = req.body

  const apiSecret = process.env.PRISMIC_WEBHOOK_SECRET

  const isDocumentWebhook = webhookType === 'api-update' && documentTypes.length > 0

  try {
    if (secret !== apiSecret) return res.status(401).json({ message: 'Invalid webhook token' })

    if (!isDocumentWebhook) return res.status(400).json({ message: 'Invalid webhook body' })

    const prismicClient = createClient()

    const documents = await prismicClient.getAllByIDs(documentTypes, {
      lang: '*'
    })
    const documentUrls = documents.map((document) => prismicH.asLink(document, linkResolver))

    await Promise.all(documentUrls.map(async (url) => await res.revalidate(url!)))

    return res.json({ revalidated: true })
  } catch (error) {
    console.error(error)

    return res.status(500).json({ message: 'Error revalidating documents' })
  }
}
