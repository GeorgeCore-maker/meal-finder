import { Container, SkeletonText } from '@chakra-ui/react'

function RecipeModalSkeleton() {
  return (
    <Container>
        <SkeletonText spacing={4} mt="4" mb="5" noOfLines={1} skeletonHeight={8}/>
        <SkeletonText spacing={4} noOfLines={1} skeletonHeight={280} borderRadius={200}/>
        <SkeletonText spacing={4} noOfLines={5} />
    </Container>
  )
}

export default RecipeModalSkeleton