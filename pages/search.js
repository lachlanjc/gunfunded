import { Box, Heading } from '@theme-ui/components'
import Header from '../components/header'
import Search from '../components/search'

const Page = ({ address }) => (
  <Box as="main" sx={{ bg: 'background' }}>
    <Header title="Find Your Rep" centeredHeader />
    <Box as="article" variant="container" sx={{ py: [3, 4] }}>
      <Search defaultAddress={address} />
    </Box>
  </Box>
)

Page.getInitialProps = req => {
  const address = req.query.address || ''
  return { address }
}

export default Page
