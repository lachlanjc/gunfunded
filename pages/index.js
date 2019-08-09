import { Heading, Flex, Box, Text, Link as A } from 'rebass'
import Icon from '../components/icon'
import Footer from '../components/footer'

const Page = () => (
  <Box as="main" sx={{ bg: 'snow' }}>
    <Box
      as="header"
      sx={{
        bg: 'red',
        color: 'white',
        py: [4, 5],
        px: 2,
        textAlign: 'center'
      }}
    >
      <Heading as="h1" sx={{ fontSize: [5, 6] }}>
        Gun Funded
      </Heading>
    </Box>
    <Footer />
  </Box>
)

export default Page
