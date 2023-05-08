import { Template } from './template'
import { Providers } from './providers'

import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Gabriel Dürr Portfólio',
  description: 'Gabriel Dürr Portfólio'
}

export default function RootLayout({ children }: Record<'children', ReactNode>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Template>{children}</Template>
        </Providers>
      </body>
    </html>
  )
}
