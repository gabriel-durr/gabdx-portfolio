import { getStaticProps } from '@/pages'

import { RiGithubLine, RiInstagramLine, RiLinkedinBoxLine } from 'react-icons/ri'

import NextLink from 'next/link'
import { InferGetStaticPropsType } from 'next'

import {
  Box,
  Text,
  Icon,
  Flex,
  Link,
  Stack,
  Image,
  HStack,
  useColorModeValue
} from '@chakra-ui/react'

type FooterProps = Pick<InferGetStaticPropsType<typeof getStaticProps>, 'footerData'>

export const Footer = ({ footerData }: FooterProps) => {
  const heartCreditsMode = useColorModeValue('🤍', '🖤')

  return (
    <Flex
      p="4rem"
      w="100vw"
      h="110px"
      align="center"
      justify="center"
      color="gray.900"
      bg="gbdx.white"
      _light={{ bg: 'gbdx.black', color: 'gray.100' }}
    >
      <Stack
        direction={['column', 'column', 'column', 'row']}
        w={['90%', '90%', '90%', '70%']}
        justify="space-between"
        align="center"
      >
        <Box rounded="full" p={2} alignSelf={['flex-end', 'flex-end', 'flex-end', 'center']}>
          <Image
            src="/gd-logo.png"
            w={{ base: '2rem', md: '2.375rem', lg: '4.375rem' }}
            alt="my logo"
          />
        </Box>
        <Text
          order={[1, 1, 0, 0]}
          whiteSpace="nowrap"
          fontSize={['.62rem', '.84rem']}
        >{`${footerData.credits}  ${heartCreditsMode}`}</Text>

        <HStack justify="flex-end" spacing="2">
          <Link as={NextLink} href={footerData.linkedinLink} target="_blank">
            <Icon boxSize={[7, 8]} rounded="full" aria-label="LinkedIn" as={RiLinkedinBoxLine} />
          </Link>

          <Link as={NextLink} href={footerData.githubLink} target="_blank">
            <Icon boxSize={[7, 8]} rounded="full" aria-label="Search database" as={RiGithubLine} />
          </Link>

          <Link as={NextLink} href={footerData.instagramLink} target="_blank">
            <Icon
              boxSize={[7, 8]}
              rounded="full"
              as={RiInstagramLine}
              aria-label="Search database"
            />
          </Link>
        </HStack>
      </Stack>
    </Flex>
  )
}
