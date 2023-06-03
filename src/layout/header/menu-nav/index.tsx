import { getStaticProps } from '@/pages'
import { DropDownMenu } from './drop-down-menu'

import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { InferGetStaticPropsType } from 'next'

import { HStack, Link, useColorModeValue } from '@chakra-ui/react'

export type MenuNavProps = Pick<InferGetStaticPropsType<typeof getStaticProps>, 'menuItems'>

export const MenuNav = ({ menuItems }: MenuNavProps) => {
  const router = useRouter()
  const colorPathMode = useColorModeValue('#DAA520', '#ffc32b')

  return (
    <HStack
      spacing={4}
      fontFamily="heading"
      color="gray.400"
      transform={{ base: undefined, md: 'scaleY(.98)' }}
      textTransform="uppercase"
      fontSize={{ base: '.82rem', md: 16 }}
    >
      <Link
        as={NextLink}
        href="/"
        whiteSpace="nowrap"
        color={router.asPath === '/' ? colorPathMode : undefined}
      >
        {menuItems.about}
      </Link>

      <Link
        as={NextLink}
        href="/posts"
        color={router.asPath === '/posts' ? colorPathMode : undefined}
      >
        {menuItems.posts}
      </Link>

      <DropDownMenu menuItems={menuItems} />
    </HStack>
  )
}
