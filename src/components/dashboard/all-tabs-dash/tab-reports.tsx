import { CloseReport } from '../close-report'

import { Types } from 'mongoose'
import { MdSimCardAlert } from 'react-icons/md'

import {
  Tab,
  Icon,
  Flex,
  Text,
  Stack,
  Avatar,
  VStack,
  HStack,
  Heading,
  TabPanel,
  AbsoluteCenter
} from '@chakra-ui/react'

export type AllReportsInFeedbackType = {
  _id: Types.ObjectId
  name: string
  avatar: string
  reports: {
    _id: Types.ObjectId
    reportedBy_Id: string
    reportedByName: string
    typeOfReport: string
  }[]
}

type TabReportsPainelProps = {
  allReportsInFeedback: AllReportsInFeedbackType[]
}

export const TabReports = () => (
  <Tab
    display="flex"
    rounded="sm"
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
    <Icon fontSize="xl" as={MdSimCardAlert} />
    <Text fontSize=".9rem" fontWeight="medium">
      Reports
    </Text>
  </Tab>
)

export const TabReportsPainel = ({ allReportsInFeedback }: TabReportsPainelProps) => {
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
        <Flex
          boxSize="full"
          direction="column"
          align="center"
          gap={8}
          p={24}
          overflowY="auto"
          sx={{
            '&::-webkit-scrollbar': {
              w: 0,
              display: 'none'
            }
          }}
        >
          {allReportsInFeedback.map((feedbackReport) => (
            <Stack key={feedbackReport._id.toString()} spacing={4} p={4}>
              <HStack spacing={4}>
                <Avatar size="xs" name={feedbackReport.name} src={feedbackReport.avatar} />
                <Text color="gbdx.sun">{feedbackReport.name}</Text>

                <Heading fontSize="sm" textTransform="uppercase" color="red.400">
                  Reports_
                </Heading>
              </HStack>

              <Stack align="start" overflowY="auto" h="204px" spacing={4}>
                {feedbackReport.reports.map((report) => (
                  <VStack key={report._id.toString()} align="start" p={4} bg="#2d1d1d10">
                    <HStack w="full" bg="red.600" px={2} justify="space-between">
                      <Text fontWeight="bold">
                        Motivo:
                        <Text as="span" color="red.100" px={2}>
                          {report.typeOfReport}
                        </Text>
                      </Text>

                      <CloseReport reportId={report._id.toString()} />
                    </HStack>
                    <Text fontWeight="bold">
                      Reportado por:
                      <Text as="span" fontWeight="normal" px={2}>
                        {report.reportedByName}
                      </Text>
                    </Text>
                    <Text fontWeight="bold">
                      ID de quem reportou:
                      <Text as="span" fontWeight="normal" px={2}>
                        {report.reportedBy_Id}
                      </Text>
                    </Text>
                  </VStack>
                ))}
              </Stack>
            </Stack>
          ))}
        </Flex>
      </AbsoluteCenter>
    </TabPanel>
  )
}
