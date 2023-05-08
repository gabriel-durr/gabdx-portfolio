'use client'

import theme from '@theme'
import { linkResolver, repositoryName } from '@services/prismicio'

import NextLink from 'next/link'
import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

import { PrismicPreview } from '@prismicio/next'
import { PrismicProvider } from '@prismicio/react'

import { ChakraProvider } from '@chakra-ui/react'
import { ReactNode } from 'react'

type ProvidersProps = {
  children: ReactNode
}

export const Providers = ({ children }: ProvidersProps) => (
  <SessionProvider>
    <PrismicProvider
      linkResolver={linkResolver}
      internalLinkComponent={({ href, children, locale, ...props }: any) => (
        <NextLink href={href} locale={locale} {...props}>
          {children}
        </NextLink>
      )}
    >
      <PrismicPreview repositoryName={repositoryName}>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </PrismicPreview>
    </PrismicProvider>
  </SessionProvider>
)
