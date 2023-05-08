import { Text, useBoolean, Button, VStack } from '@chakra-ui/react'

type FeedCommnetProps = {
  comment: string
}

export const FeedComment = ({ comment }: FeedCommnetProps) => {
  const [isComment, setComment] = useBoolean()

  const commentManipulet = isComment ? comment : `${comment.slice(0, 224)}...`

  return (
    <VStack w="400px" h="120px">
      <Text
        w="full"
        h="120px"
        fontSize=".9rem"
        overflowY={isComment ? 'scroll' : 'hidden'}
      >{`comment: ${commentManipulet}`}</Text>

      <Button variant="unstyled" onClick={setComment.toggle} size="sm" colorScheme="blue">
        {isComment ? 'hide' : 'view more'}
      </Button>
    </VStack>
  )
}
