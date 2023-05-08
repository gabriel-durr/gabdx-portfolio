import { Layout } from '@/layout'
import { About } from '@components/about'
import { Projects } from '@components/projects'
import { createClient } from '@services/prismicio'
import { layoutFormat } from '@utils/layout-formated'
import { SeoMetaData } from '@/components/seo-meta-data'
import { GbdxAssistant } from '@components/about/gbdx-assistant'

import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { Heading, Stack } from '@chakra-ui/react'

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>

const Home = ({ page, menuItems, footerData, seoData }: HomeProps) => {
  return (
    <Layout
      isGabdxImg
      menuItems={menuItems}
      altLangs={page.alternate_languages}
      footerData={footerData}
    >
      <SeoMetaData
        seoTitle={seoData.seoTitle}
        seoDescription={seoData.seoDescription}
        imagePreview={seoData.imagePreview}
      />

      <Stack as="main" spacing={20} w="full" maxW="container.lg" align="center" justify="center">
        <About page={page} />

        <Heading as="h2" variant="topicPrimary">
          {page.lang === 'pt-br' ? 'projetos e trabalhos' : 'projects and works'}
        </Heading>

        <Projects data={page.data} lang={page.lang} />
      </Stack>

      <GbdxAssistant />
    </Layout>
  )
}

export async function getStaticProps({ locale, previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData })

  const page = await client.getByUID('home', 'home', {
    lang: locale
  })

  const menu = await client.getSingle('menu', { lang: locale })
  const footer = await client.getSingle('footer', { lang: locale })

  const seoData = {
    seoTitle: page.data.seoTitle,
    seoDescription: page.data.seoDescription,
    imagePreview: page.data.imagePreview
  }

  const { menuItems, footerData } = layoutFormat({ menu, footer })

  return {
    props: {
      page,
      seoData,
      menuItems,
      footerData
    }
  }
}

export default Home
