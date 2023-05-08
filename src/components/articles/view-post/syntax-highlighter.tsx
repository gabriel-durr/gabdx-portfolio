import { Prism } from 'react-syntax-highlighter'
import style from 'react-syntax-highlighter/dist/cjs/styles/prism/synthwave84'

import { IoCopyOutline, IoCopySharp } from 'react-icons/io5'

import { Stack, Image, useClipboard, IconButton, useBoolean, useMediaQuery } from '@chakra-ui/react'

type SyntaxHighlighterProps = {
  code: string
}

export const SyntaxHighlighter = ({ code }: SyntaxHighlighterProps) => {
  const [isHover, setHover] = useBoolean(false)
  const { hasCopied, onCopy } = useClipboard(code)
  const [isSmallerThan1280] = useMediaQuery('(max-width: 768px)')

  return (
    <Stack
      w={{ base: '100vw', lg: 'full' }}
      pos="relative"
      onMouseEnter={!isSmallerThan1280 ? setHover.on : undefined}
      onMouseLeave={!isSmallerThan1280 ? setHover.off : undefined}
    >
      {(isHover || isSmallerThan1280) && (
        <IconButton
          pos="absolute"
          right={6}
          top={6}
          variant="unstyled"
          icon={hasCopied ? <IoCopySharp /> : <IoCopyOutline />}
          size="100%"
          fontSize={{ base: '2xl', md: '3xl' }}
          color="gbdx.white"
          aria-label={hasCopied ? 'copiado' : 'copiar'}
          onClick={onCopy}
        />
      )}

      <Prism
        language="jsx"
        style={style}
        customStyle={{
          padding: 28,
          fontSize: '0.875rem',
          scrollbarWidth: 'thin'
        }}
      >
        {code}
      </Prism>

      <Image
        pos="absolute"
        right={4}
        bottom={6}
        w={8}
        rounded="full"
        src="/gd-logo.png"
        alt="gbdx-logo"
        bg="whiteAlpha.900"
        pointerEvents="none"
      />
    </Stack>
  )
}
