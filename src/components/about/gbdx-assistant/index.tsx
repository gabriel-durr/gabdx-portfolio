import dynamic from 'next/dynamic'

import {
  Modal,
  Image,
  ModalBody,
  ModalHeader,
  ModalContent,
  useDisclosure,
  ModalCloseButton
} from '@chakra-ui/react'

const Chat = dynamic(() => import('./chat').then((mod) => mod.Chat), {
  ssr: false
})

export const GbdxAssistant = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      {!isOpen && (
        <Image
          pos="fixed"
          right={6}
          bottom={12}
          boxSize={{ base: '58px', md: '78px' }}
          cursor="pointer"
          alt="ia button"
          src="/gbdx-history.svg"
          onClick={onOpen}
        />
      )}

      <Modal size="sm" isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
        <ModalContent pos="fixed" right={{ base: 0, md: 2 }} bottom="-4%" bg="transparent">
          <ModalHeader bg="gray.100" fontSize="md" color="gray.900">
            GBDX - Assistant{' '}
          </ModalHeader>
          <ModalCloseButton
            bg="gbdx.redClose"
            size="sm"
            color="gbdx.white"
            border="1px solid"
            borderColor="gbdx.borderGray"
            _hover={{
              bg: 'red',
              transition: 'all .2s ease-in-out'
            }}
          />
          <ModalBody bg="gray.50" p={2}>
            <Chat />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
