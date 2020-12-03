import Content from './footer.mdx'
import { Flex, Box } from 'theme-ui'

const Footer = () => (
  <Box
    as="footer"
    sx={{ bg: 'sunken', textAlign: 'center', px: 2, py: [3, 4], mt: [4, 5],
        p: { color: 'muted' },
        a: { color: 'accent', ':first-of-type': { fontWeight: 'bold' } }
      }}
    >
      <Content />
  </Box>
)

export default Footer
