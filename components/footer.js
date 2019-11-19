import { Flex, Box, Text, Link as A } from '@theme-ui/components'
import Icon from '../components/icon'

export default () => (
  <Box as="footer" sx={{ bg: 'sunken', textAlign: 'center', px: 2, py: 3 }}>
    <Flex sx={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text sx={{ color: 'secondary' }}>
        Made by{' '}
        <A
          href="https://twitter.com/lachlanjc"
          target="_blank"
          sx={{ color: 'blue' }}
        >
          @lachlanjc
        </A>
        , 2019.
      </Text>
      <Icon glyph="like-fill" sx={{ color: 'red', ml: 1 }} />
    </Flex>
  </Box>
)
