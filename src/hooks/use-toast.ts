import { useToast as useToastChakra, UseToastOptions } from '@chakra-ui/react'

type toastExectProps = {
  title: string
  description?: string
  status?: UseToastOptions['status']
}

export const useToast = () => {
  const teenSeconds = 10 * 1000

  const toast = useToastChakra({
    position: 'top',
    duration: teenSeconds,
    isClosable: true
  })

  const toastExec = ({ title, description, status = 'success' }: toastExectProps) => {
    const emojiStatus = status === 'success' ? '🎉🎉🎉' : '😵‍💫'

    toast({
      title: `${title} ${emojiStatus}`,
      description: description,
      status: status
    })
  }

  return { toastExec }
}
