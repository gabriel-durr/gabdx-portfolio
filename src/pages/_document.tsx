import theme from '@theme'
import { Html, Head, Main, NextScript } from 'next/document'

import { ColorModeScript } from '@chakra-ui/react'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
