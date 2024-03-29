import { AboutContentDataProps } from '.'
import { CloudDown } from '@animations/cloud-down'

import NextLink from 'next/link'

import { Text, Image, Link } from '@chakra-ui/react'

type CurriculumProps = Pick<AboutContentDataProps, 'curriculum'>

export const Curriculum = ({ curriculum }: CurriculumProps) => {
  return (
    <Link
      as={NextLink}
      role="link"
      href={curriculum}
      pos="relative"
      w={{ base: '72px', md: '80px' }}
      target="_blank"
      fontSize=".7rem"
      _hover={{
        fontWeight: 'bolder',
        color: 'gbdx.satinOrange'
      }}
    >
      <Text color="gbdx.satinOrange" fontWeight="bold" pos="absolute" right={4} top={-1}>
        CV
      </Text>
      <Image src="/curriculo.svg" w="100%" alt="Curriculum Download" />
      <CloudDown />
    </Link>
  )
}
