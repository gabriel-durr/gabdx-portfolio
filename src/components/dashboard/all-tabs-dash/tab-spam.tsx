import { DeleteSpam } from '../delete-spam'

import { RiSpamLine } from 'react-icons/ri'
import { FaEyeSlash, FaEye } from 'react-icons/fa'

import {
  Tab,
  Box,
  Text,
  Flex,
  Icon,
  VStack,
  Heading,
  TabPanel,
  useBoolean,
  ButtonGroup,
  IconButton,
  SkeletonText,
  AbsoluteCenter
} from '@chakra-ui/react'

export type SpamFeedback = {
  userIp: string
  allIdLocation: string[]
  isSpamFeedback: boolean
}

type TabSpamPainelProps = {
  spamFeedbacks: SpamFeedback[]
}

export const TabSpam = () => (
  <Tab
    rounded="sm"
    display="flex"
    justifyContent="start"
    px={12}
    gap={2}
    _selected={{
      bg: 'whiteAlpha.400',
      color: 'cyan.400',
      shadow: 'sm',
      borderLeft: '1px solid cyan'
    }}
  >
    <Icon fontSize="xl" as={RiSpamLine} />
    <Text fontWeight="medium" fontSize=".9rem">
      Spam
    </Text>
  </Tab>
)

export const TabSpamPainel = ({ spamFeedbacks }: TabSpamPainelProps) => {
  const [isVisible, setVisble] = useBoolean()

  return (
    <TabPanel>
      <AbsoluteCenter
        pos="absolute"
        display="flex"
        gap={12}
        flexDir="column"
        alignItems="center"
        h="90%"
        w="container.lg"
      >
        <Flex boxSize="full" p={28} direction="column" align="center" overflowY="auto">
          {spamFeedbacks.map((spam, key) => (
            <VStack
              key={spam.allIdLocation[key]}
              pos="relative"
              align="start"
              rounded="sm"
              p={4}
              boxShadow="inset 0 0 4px 1px white"
              w="500px"
              h="260px"
            >
              <ButtonGroup pos="absolute" right={2}>
                <IconButton
                  bg="whiteAlpha.50"
                  rounded="sm"
                  fontSize={20}
                  icon={isVisible ? <FaEye /> : <FaEyeSlash />}
                  aria-label="Visualizar / Oculatar infos"
                  onClick={setVisble.toggle}
                />

                <DeleteSpam idsFeedbackDelete={spam.allIdLocation} />
              </ButtonGroup>

              {isVisible ? (
                <VStack align="start" spacing={4}>
                  <Text w="78%" overflow="hidden">
                    {`Existem ${spam.allIdLocation.length} feedbacks com a mesma localização`}
                  </Text>

                  <Text>ID de cada feedback:</Text>
                  <Box h="70px" overflowY="auto" w="full">
                    {spam.allIdLocation.map((id) => (
                      <Text key={id}>{id}</Text>
                    ))}
                  </Box>

                  <Text>{`Hash da localização: ${spam.userIp}`}</Text>
                </VStack>
              ) : (
                <VStack spacing={8}>
                  {[1, 2, 3].map((skeleton) => (
                    <SkeletonText
                      key={skeleton}
                      startColor="white"
                      w="300px"
                      sx={{
                        '& > div': {
                          animation: 'none !important'
                        }
                      }}
                    />
                  ))}
                </VStack>
              )}
            </VStack>
          ))}
        </Flex>
      </AbsoluteCenter>
    </TabPanel>
  )
}
