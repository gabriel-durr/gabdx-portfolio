import { api } from '@services/api'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]'

import { VscSignOut } from 'react-icons/vsc'
import { signOut, useSession } from 'next-auth/react'
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

import { Box, Icon, Text, Flex, VStack, Button, Divider } from '@chakra-ui/react'
import { Dashboard } from '@/components/dashboard'

type AdminProps = InferGetServerSidePropsType<typeof getServerSideProps>

const Admin = ({
  allBans,
  spamFeedbacks,
  feedbackListOfPosts,
  allReportsInFeedback
}: AdminProps) => {
  const { data: session, status, update } = useSession()

  return (
    <Flex
      pos="relative"
      w="100vw"
      h="100vh"
      justify="start"
      fontFamily="body"
      bg="gbdx.black"
      color="light.600"
      align="center"
      gap={2}
    >
      <VStack as="nav" w="14%" h="full" py={12} justify="space-between">
        <Dashboard
          allBans={allBans}
          status={status}
          spamFeedbacks={spamFeedbacks}
          feedbackListOfPosts={feedbackListOfPosts}
          allReportsInFeedback={allReportsInFeedback}
        />

        <Button
          variant="unstyled"
          display="flex"
          rounded="sm"
          bg="red.400"
          w="80%"
          h={10}
          gap={2}
          aria-label="Signout button"
          onClick={() => signOut({ redirect: true, callbackUrl: '/auth-admin' })}
        >
          <Icon fontSize="xl" as={VscSignOut} />
          <Text fontSize=".9rem"> Logout</Text>
        </Button>
      </VStack>
      <Divider orientation="vertical" h="94%" />

      <Box
        pos="absolute"
        right={20}
        bottom={20}
        zIndex="1"
        boxSize="550px"
        userSelect="none"
        pointerEvents="none"
        boxShadow="10px 10px 100px 50px black inset"
        filter="grayscale(100%)"
        borderRadius="50%"
        bgImage="/sky-stars.png"
        bgRepeat="no-repeat"
        bgBlendMode="luminosity"
        bgSize="cover"
        bgPos="center"
      />
    </Flex>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res
}: GetServerSidePropsContext) => {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/sign-adm',
        permanent: false
      }
    }
  }

  const { data: spamFeedbacks } = await api.get('/admin/spam', {
    headers: {
      cookie: req.headers.cookie
    }
  })

  const {
    data: { feedbackListOfPosts }
  } = await api.get('/admin/feedbacks', {
    headers: {
      cookie: req.headers.cookie
    }
  })

  const {
    data: { allReportsInFeedback }
  } = await api.get('/admin/reports', {
    headers: {
      cookie: req.headers.cookie
    }
  })

  const {
    data: { allBans }
  } = await api.get('/admin/ban', {
    headers: {
      cookie: req.headers.cookie
    }
  })

  return {
    props: {
      allBans,
      spamFeedbacks,
      feedbackListOfPosts,
      allReportsInFeedback
    }
  }
}

export default Admin
