import { api } from '@services/api'
import { useRouter } from 'next/router'

import { FaWindowClose } from 'react-icons/fa'
import {
  Button,
  useToast,
  IconButton,
  AlertDialog,
  useDisclosure,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogCloseButton
} from '@chakra-ui/react'

import { useRef } from 'react'

type CloseReportProps = {
  reportId: string
}

export const CloseReport = ({ reportId }: CloseReportProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()

  const toast = useToast({
    duration: 7000,
    position: 'top'
  })

  const cancelRef = useRef(null)

  async function handleDeleteSpam() {
    try {
      const {
        data: { message }
      } = await api.delete(`/admin/reports?reportId=${reportId}`)

      toast({
        title: message,
        description: 'Feedback has been deleted.',
        status: 'success'
      })

      router.push('/admin')
    } catch ({ response }: any) {
      const {
        data: { message }
      } = response

      toast({
        title: message,
        description: 'A server error ocurred while trying to delete.',
        status: 'error'
      })
    }
  }

  return (
    <>
      <IconButton
        variant="unstyled"
        size="sm"
        rounded="sm"
        icon={<FaWindowClose />}
        color="gbdx.white"
        aria-label="hidden infos"
        onClick={onOpen}
      />
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent bg="gbdx.white" fontFamily="body">
          <AlertDialogHeader>Do yout really want to delete this report?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>If accepted, report will be deleted from the feedback</AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme="green" flex={1} ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button flex={1} onClick={handleDeleteSpam} colorScheme="red" ml={4}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
