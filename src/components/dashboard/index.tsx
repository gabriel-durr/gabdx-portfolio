import { AllTabsDash } from './all-tabs-dash'
import { SpamFeedback } from './all-tabs-dash/tab-spam'
import { BanLocationType } from './all-tabs-dash/tab-actions'
import { AllReportsInFeedbackType } from './all-tabs-dash/tab-reports'
import { FeedbackListOfPostsTypes } from './all-tabs-dash/tab-feedbacks'

import { GrStatusGoodSmall } from 'react-icons/gr'
import { Text, Icon, Stack, HStack, VStack, Avatar, Heading } from '@chakra-ui/react'

export type DashboardProps = {
  allBans: BanLocationType[]
  spamFeedbacks: SpamFeedback[]
  feedbackListOfPosts: FeedbackListOfPostsTypes[]
  allReportsInFeedback: AllReportsInFeedbackType[]
  status: 'authenticated' | 'loading' | 'unauthenticated'
}

export const Dashboard = ({
  allBans,
  status,
  spamFeedbacks,
  feedbackListOfPosts,
  allReportsInFeedback
}: DashboardProps) => {
  let colorStatus =
    (status === 'loading' && 'yellow') ||
    (status === 'authenticated' && 'greenyellow') ||
    (status === 'unauthenticated' && 'red.400') ||
    'greenyellow'

  return (
    <Stack w="full" align="center" spacing={12}>
      <VStack>
        <Avatar name="Gabriel Dürr" src="/avatar-post.jpg" boxSize="40px" borderRadius="full" />
        <HStack fontSize="xs">
          <Heading fontSize="xs" fontFamily="number">
            Gabdx
            <Text as="span" px={1} color="cyan">
              ADM
            </Text>
          </Heading>

          <HStack spacing={1}>
            <Text as="span">Status</Text>

            <Icon fontSize="x-small" color={colorStatus} as={GrStatusGoodSmall} />
          </HStack>
        </HStack>
      </VStack>

      <AllTabsDash
        allBans={allBans}
        spamFeedback={spamFeedbacks}
        feedbackListOfPosts={feedbackListOfPosts}
        allReportsInFeedback={allReportsInFeedback}
      />
    </Stack>
  )
}
