import { api } from '@services/api'
import { UnbanLocation } from '../unban-location'

import { Types } from 'mongoose'
import { useRouter } from 'next/router'
import { SiAdblock } from 'react-icons/si'
import { RiLayout2Fill } from 'react-icons/ri'
import { FaEyeSlash, FaEye } from 'react-icons/fa'

import { useState } from 'react'
import {
  Tab,
  Text,
  Icon,
  Image,
  Input,
  Stack,
  VStack,
  Heading,
  useToast,
  TabPanel,
  FormLabel,
  IconButton,
  ButtonGroup,
  useBoolean,
  InputGroup,
  FormControl,
  SkeletonText,
  AbsoluteCenter,
  FormErrorMessage,
  InputRightElement
} from '@chakra-ui/react'

export type BanLocationType = {
  _id: Types.ObjectId
  userIp: string
  reason: string
}

type TabActionsPainelProps = {
  allBans: BanLocationType[]
}

export const TabActions = () => (
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
    <Icon fontSize="xl" as={RiLayout2Fill} />
    <Text fontWeight="medium" fontSize=".9rem">
      Actions
    </Text>
  </Tab>
)

export const TabActionsPainel = ({ allBans }: TabActionsPainelProps) => {
  const [value, setValue] = useState('')

  const isEmptyValue = value.length === 0
  const isMinValue = value.length > 0 && value.length < 8

  const sevenSeconds = 7 * 1000
  const toast = useToast({
    duration: sevenSeconds,
    position: 'top'
  })
  const router = useRouter()
  const [isVisible, setVisble] = useBoolean()

  async function handleAddBan() {
    if (isMinValue) return

    try {
      const {
        data: { message }
      } = await api.post('/admin/ban', {
        userIp: value,
        reason: 'Mod Ban'
      })

      toast({
        description: 'Sucessfully banned location',
        title: message,
        status: 'success'
      })

      router.push('/admin')
    } catch ({ response }: any) {
      const {
        data: { message }
      } = response

      toast({
        title: message,
        description: 'A server error occurred while trying to ban the location',
        status: 'error'
      })
    }
  }

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
        <Stack align="start" spacing={12} p={24}>
          <FormControl w="400px" isInvalid={isMinValue}>
            <FormLabel fontSize="lg" color="light.400" fontFamily="heading">
              Ban location
            </FormLabel>

            <InputGroup>
              <Input
                value={value}
                pr={16}
                onChange={({ target }) => setValue(target.value)}
                variant="gdxInput"
                placeholder="Enter the hash of the location"
              />

              <InputRightElement>
                <IconButton
                  isDisabled={isEmptyValue}
                  display="flex"
                  variant="unstyled"
                  icon={<SiAdblock />}
                  fontSize={20}
                  aria-label="asd"
                  onClick={handleAddBan}
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{isMinValue && 'The hash must have 8 characters'}</FormErrorMessage>
          </FormControl>

          <Heading color="light.400" fontFamily="body" fontSize="md">
            Banned locations
          </Heading>

          {allBans.map(({ _id, userIp, reason }) => (
            <VStack
              key={_id.toString()}
              w="500px"
              h="160px"
              pos="relative"
              bg="whiteAlpha.50"
              p={4}
            >
              <ButtonGroup pos="absolute" top={2} right={2}>
                <UnbanLocation idLocation={_id.toString()} />
                <IconButton
                  bg="whiteAlpha.50"
                  rounded="sm"
                  fontSize={20}
                  icon={isVisible ? <FaEye /> : <FaEyeSlash />}
                  aria-label="Visualizar / Oculatar infos"
                  onClick={setVisble.toggle}
                />
              </ButtonGroup>

              {isVisible ? (
                <VStack align="start" h="full" spacing={2} p={4}>
                  <Text fontWeight="bold">
                    Location Hash
                    <Text>{userIp}</Text>
                  </Text>
                  <Text fontWeight="bold">
                    Reason for Ban:
                    <Text as="span" px={2} fontWeight="normal">
                      {reason}
                    </Text>
                  </Text>
                </VStack>
              ) : (
                <VStack align="start" spacing={2} boxSize="full" p={4}>
                  {[1, 2].map((skeleton) => (
                    <SkeletonText
                      key={skeleton}
                      startColor="white"
                      w={skeleton === 1 ? '60%' : '100%'}
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
        </Stack>
      </AbsoluteCenter>
    </TabPanel>
  )
}
