import { Box, Heading } from '@theme-ui/components'
import Search from '../components/search'

export default () => (
  <Box as="main" sx={{ bg: 'background' }}>
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
        Find Your Rep
      </Heading>
    </Box>
    <Box as="article" variant="container" sx={{ py: [3, 4] }}>
      <Search />
    </Box>
  </Box>
)
