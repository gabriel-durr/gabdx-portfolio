import * as prismic from '@prismicio/client'
import * as prismicNext from '@prismicio/next'

import sm from '@root/slicemachine.config.json'

export const repositoryName = prismic.getRepositoryName(sm.apiEndpoint)

export function linkResolver(doc: any) {
  switch (doc.type) {
    case 'home':
      return `/${doc.lang}`
    case 'postindex':
      return `/${doc.lang}/posts`
    case 'post':
      return `/${doc.lang}/posts/${doc.uid}`
    default:
      return '/'
  }
}

export function createClient({ previewData, req, ...config }: prismicNext.CreateClientConfig = {}) {
  const client = prismic.createClient(sm.apiEndpoint, {
    ...config,
    accessToken: process.env.PRISMIC_ACCESS_KEY
  })

  prismicNext.enableAutoPreviews({ client, previewData, req })

  return client
}
