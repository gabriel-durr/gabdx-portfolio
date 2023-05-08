import NextLink from 'next/link'

import { Stack, Link, Text, Image, Box } from '@chakra-ui/react'

type DropDownItemProps = {
  size: string
  label: string
  href: string
  src: string
  alt: string
  linkColor: string
}

export const DropDownItem = ({ size, src, alt, href, label, linkColor }: DropDownItemProps) => {
  return (
    <Link as={NextLink} href={href} target="_blank" display="block" py={1}>
      <Stack direction="row" align="center" justify="start" spacing={{ base: 2, md: 4 }}>
        <Box boxSize="28px" display="flex" justifyContent="center">
          <Image src={src} alt={alt} w={{ base: `calc(${size} - 4.8px)`, md: size }} />
        </Box>

        <Text
          fontFamily="body"
          color="gray.900"
          lineHeight="shorter"
          fontWeight="medium"
          textTransform="uppercase"
          fontSize={['.72rem', '.84rem']}
          _hover={{ color: linkColor }}
        >
          {label}
        </Text>
      </Stack>
    </Link>
  )
}
