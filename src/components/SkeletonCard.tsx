import { Box, Card, CardBody, CardFooter, Divider, SkeletonText } from '@chakra-ui/react';

function SkeletonCard() {
    return (
        <Card boxShadow='lg'>
            <CardBody>
                <SkeletonText mt="1" noOfLines={1} spacing='4' skeletonHeight='220' />
                <SkeletonText mt='4' noOfLines={2} spacing='4' skeletonHeight='4' />
            </CardBody>
            <Divider />
            <CardFooter>
                <Box width="100%">
                    <SkeletonText mt='4' noOfLines={1} spacing='4' skeletonHeight='4' />
                </Box>
            </CardFooter>
        </Card>
    )
}

export default SkeletonCard