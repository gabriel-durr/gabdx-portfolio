import { Greeting } from './greeting'
import { AboutContentDataProps } from '.'
import { TechsAnimation } from './techs-animation'

import { motion } from 'framer-motion'

import { Box, Text, VStack } from '@chakra-ui/react'

type AboutContentProps = {
  aboutContentData: AboutContentDataProps
  lang: string
}

export const AboutContent = ({ aboutContentData, lang }: AboutContentProps) => {
  return (
    <VStack
      as={motion.div}
      position="relative"
      w="full"
      mt={{ base: '0px', md: '10px' }}
      justify="center"
      maxW="800px"
      opacity={0}
      initial={{
        opacity: 0,
        translateX: 30
      }}
      animate={{
        opacity: 1,
        translateX: 0,
        transition: {
          duration: 1
        }
      }}
      borderBottom="1px"
      borderColor="whiteAlpha.500"
      borderStyle="dotted"
      _light={{ borderColor: 'blackAlpha.500' }}
    >
      <VStack w="full" align="flex-start" spacing={1}>
        <Box>
          <Greeting lang={lang} />
          <Text fontFamily="number" mb={8} fontSize={16}>
            {aboutContentData.description}
          </Text>
        </Box>
        <TechsAnimation />
      </VStack>
    </VStack>
  )
}
