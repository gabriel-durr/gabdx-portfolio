'use client'

import { Header } from './header'
import { Footer } from './footer'
import { createClient } from '@services/prismicio'
import { layoutFormat } from '@utils/layout-formated'

import { ReactNode } from 'react'
import { Flex } from '@chakra-ui/react'

const getLayoutData = async () => {
  const locale = 'pt-br'
  const previewData = ''

  //TODO ESPERAR ATT PRISMIC APP FOLDER, é necessário locale para i118n e PreviewData do Prismic

  const client = createClient({ previewData })

  const menu = await client.getSingle('menu', { lang: locale })
  const footer = await client.getSingle('footer', { lang: locale })

  const altLangs = menu.alternate_languages
  const { menuItems, footerData } = layoutFormat({ menu, footer })

  return {
    altLangs,
    menuItems,
    footerData
  }
}

export const Template = ({ children }: Record<'children', ReactNode>) => {
  // const { menuItems, altLangs, footerData } = await getLayoutData()

  return (
    <>
      {/* <Header altLangs={altLangs} menuItems={menuItems} /> */}

      <Flex as="main" pb="17rem" minH="100vh" minW="100vw" pt="9.7rem" justify="center">
        {children}
      </Flex>
      {/* 
      <Footer footerData={footerData} /> */}
    </>
  )
}
