import { Content } from '@prismicio/client'
import { getTimeGreeting } from '@utils/get-time-greeting'

import { motion } from 'framer-motion'
import { Cursor } from 'react-simple-typewriter'

import { useEffect, useState } from 'react'
import { Text } from '@chakra-ui/react'

type GreetingProps = Pick<Content.HomeDocument, 'lang'>

export const Greeting = ({ lang }: GreetingProps) => {
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const currentTime = new Date().getHours()
    const timeGreeting = getTimeGreeting(currentTime, lang)
    setGreeting(timeGreeting)
  }, [lang])

  return (
    <Text
      as={motion.p}
      my={4}
      fontWeight="bold"
      color="goldenrod"
      textShadow="0 0 22px #4b30c4"
      fontSize={{ base: 14, md: 'subText' }}
      _light={{
        textShadow: '0 0 22px #ffee10'
      }}
    >
      {greeting}

      <Cursor cursorStyle="⚡" />
    </Text>
  )
}
