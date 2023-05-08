import { ViewPostProps } from '.'

import NextImage from 'next/image'

import { Box } from '@chakra-ui/react'

type BannerProps = Pick<ViewPostProps['postData'], 'image'>

export const Banner = ({ image }: BannerProps) => {
  return (
    <Box
      pos="relative"
      w="full"
      h={{ base: '12rem', md: '20rem', lg: '21.25rem' }}
      border="dotted 1px"
      borderColor="rgba(254,254,255,.6)"
      p="0 0 .5rem 0"
      backdropFilter="auto"
      backdropBlur="4px"
      rounded="lg"
      _light={{
        bg: 'rgba(25,25,25,.1)',
        borderColor: 'rgba(25,25,25,.6)'
      }}
    >
      <NextImage
        fill
        src={image?.url!}
        alt={image.alt ?? ''}
        style={{ objectFit: 'cover' }}
        sizes="(max-width: 600px) 100vw, (max-width: 960px) 40vw"
      />
    </Box>
  )
}
