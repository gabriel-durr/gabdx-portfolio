import { VStack, HStack, Skeleton, SkeletonText, SkeletonCircle } from '@chakra-ui/react'

export const SkeletonsLoading = () => {
  return (
    <VStack boxSize="full" spacing={8} padding={8} boxShadow="sm">
      <Skeleton height="40px" fadeDuration={4} />

      <HStack>
        <SkeletonCircle fadeDuration={4} size="10" />
        <SkeletonCircle fadeDuration={4} size="10" />
        <SkeletonCircle fadeDuration={4} size="10" />
        <SkeletonCircle fadeDuration={4} size="10" />
        <SkeletonCircle fadeDuration={4} size="10" />
      </HStack>

      <SkeletonText w="full" mt="4" noOfLines={4} spacing={4} skeletonHeight={2} />
      <SkeletonText w="full" mt="4" noOfLines={4} spacing={4} skeletonHeight={2} />
      <SkeletonText w="full" mt="4" noOfLines={4} spacing={4} skeletonHeight={2} />

      <Skeleton w="full" h="40px" />

      <Skeleton w="full" h="40px" />
    </VStack>
  )
}
