import { ViewPostProps } from '.'

import NextLink from 'next/link'
import NextImage from 'next/image'

import { Stack, Box, VStack, Heading, Link } from '@chakra-ui/react'

type LatestPostsProps = Pick<ViewPostProps['postData'], 'latestPosts' | 'lang'>

export const LatestPosts = ({ latestPosts, lang }: LatestPostsProps) => {
  const isBrLang = lang === 'pt-br'

  return (
    <VStack w="full" align="start" spacing={12}>
      <Heading as="h5" variant="postSecondary">
        {isBrLang ? 'postagens recentes' : 'recent posts'}
      </Heading>

      <Stack
        direction={{ base: 'column', md: 'row' }}
        w="full"
        justify="center"
        spacing={{ base: 6, md: 16, lg: 20 }}
        color="gbdx.white"
      >
        {latestPosts.map(({ id, data, uid }) => (
          <Link
            key={id}
            as={NextLink}
            display="flex"
            p={2}
            shadow="sm"
            color="gbdx.white"
            flexDir="column"
            alignItems="center"
            href={`/posts/${uid}`}
            _light={{ color: 'gbdx.black' }}
          >
            <Heading
              as="h6"
              maxW="240px"
              noOfLines={1}
              fontSize={16}
              w="full"
              h="min"
              mb={2}
              overflow="hidden"
            >
              {data.title}
            </Heading>
            <Box pos="relative" w="240px" h="140px" border="4px solid black">
              <NextImage
                src={data.image?.url ?? ''}
                alt={data.image?.alt ?? ''}
                fill
                sizes="(max-width: 768px) 100vw,(max-width: 1200px) 80vw,33vw"
                style={{ objectFit: 'cover' }}
              />
            </Box>
          </Link>
        ))}
      </Stack>
    </VStack>
  )
}
