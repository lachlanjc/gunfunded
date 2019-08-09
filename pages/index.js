import { Heading, Flex, Box, Text, Link as A } from 'rebass'

const Page = () => (
    <Box
      as="header"
      sx={{
        py: [4, 5],
        px: 2,
        textAlign: 'center'
      }}
    >
      <Heading as="h1" sx={{ fontSize: [5, 6] }}>
        Gun Funded
      </Heading>
    </Box>
)

export default Page
