import NextImage from 'next/image'

import { AspectRatio } from '@chakra-ui/react'

type ImageProps = {
  src: string
  alt: string
}

export const CardImage = ({ src, alt }: ImageProps) => {
  return (
    <AspectRatio
      w="full"
      ratio={1.85 / 1}
      position="relative"
      borderBottomWidth="1px"
      borderColor="gray.700"
      _light={{ borderColor: 'gray.100' }}
    >
      <NextImage
        src={src}
        fill
        alt={`Imagem do projeto: ${alt}`}
        sizes="(max-width: 600px) 100vw, (max-width: 960px) 20vw"
      />
    </AspectRatio>
  )
}
