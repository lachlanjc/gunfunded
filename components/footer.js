import { Flex, Box, Text, Link as A } from 'rebass'
import Icon from '../components/icon'

export default () => (
  <Box as="footer" sx={{ bg: 'smoke', textAlign: 'center', px: 2, py: 3 }}>
    <Flex sx={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text sx={{ color: 'slate' }}>
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