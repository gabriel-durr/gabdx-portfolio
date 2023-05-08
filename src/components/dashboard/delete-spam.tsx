import { api } from '@services/api'

import { FaTrash } from 'react-icons/fa'
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

type DeleteSpamProps = {
  idsFeedbackDelete: string[]
}

export const DeleteSpam = ({ idsFeedbackDelete }: DeleteSpamProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast({
    duration: 7000,
    position: 'top'
  })

  const cancelRef = useRef(null)

  async function handleDeleteSpam() {
    try {
      const {
        data: { message }
      } = await api.post(`/admin/spam`, {
        idsFeedbackSpam: idsFeedbackDelete
      })

      toast({
        title: message,
        description: 'All location-related feedback has been deleted.',
        status: 'success'
      })
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
        bg="whiteAlpha.50"
        fontSize={16}
        rounded="sm"
        icon={<FaTrash />}
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
          <AlertDialogHeader>Do you really want to delete SPAM</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            If accepted, all feedbacks related to the adress will be deleted from Posts.
          </AlertDialogBody>
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
