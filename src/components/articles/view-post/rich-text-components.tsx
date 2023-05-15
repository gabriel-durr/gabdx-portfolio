import { CopyCode } from './copy-code'
import { SyntaxHighlighter } from './syntax-highlighter'

import NextLink from 'next/link'
import NextImage from 'next/image'
import { JSXMapSerializer } from '@prismicio/react'
import { AiTwotoneThunderbolt } from 'react-icons/ai'

import { Box, List, Link, Text, Heading, ListItem, ListIcon } from '@chakra-ui/react'

export const rickTextComponents: JSXMapSerializer = {
  heading3: ({ children }) => (
    <Heading as="h3" variant="postSecondary" py={12}>
      {children}
    </Heading>
  ),

  paragraph: ({ children }) => (
    <Text mb="40px" pb={1} textAlign="justify" fontSize="subText">
      {children}
    </Text>
  ),
  preformatted: ({ text, node }) => {
    let isFirstSpaceText = node.text.startsWith('\n')

    let findFirstSpace = node.text.indexOf('\n')
    let firstTextSpace = node.text.substring(findFirstSpace + 1)

    return isFirstSpaceText ? <SyntaxHighlighter code={firstTextSpace} /> : <CopyCode code={text} />
  },

  image: ({ node }) => (
    <Box pos="relative" py={8}>
      <NextImage
        src={node?.url ?? ''}
        alt={node?.alt ?? ''}
        width={node.dimensions?.width ?? 1080}
        height={node.dimensions.height}
        style={{ objectFit: 'cover' }}
      />
    </Box>
  ),

  listItem: ({ children }) => (
    <List my={14}>
      <ListItem fontFamily="heading">
        <ListIcon as={AiTwotoneThunderbolt} color="gbdx.sunny" />
        {children}
      </ListItem>
    </List>
  ),

  hyperlink: ({ node, text }) => (
    <Link
      as={NextLink}
      href={node.data?.url ?? ''}
      target="_blank"
      color="red.300"
      borderBottom="1px inset"
      borderBottomColor="whiteAlpha.200"
      _light={{
        color: 'red.600',
        borderBottomColor: 'gray.50'
      }}
    >
      {text}
    </Link>
  )
}
