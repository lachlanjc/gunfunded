/** @jsx jsx */
import { jsx, Styled, useColorMode } from 'theme-ui'
import { Flex, Box, Text, Link as A } from 'rebass'
import Icon from '../components/icon'

const ColorSwitcher = props => {
  const [mode, setMode] = useColorMode()
  return (
    <button
      {...props}
      onClick={e => setMode(mode === 'dark' ? 'light' : 'dark')}
      title="Cycle Color Mode"
      sx={{
        display: 'inline-block',
        appearance: 'none',
        bg: 'transparent',
        color: 'inherit',
        p: 1,
        m: 0,
        border: 0,
        borderRadius: 9999,
        transition: 'box-shadow .125s ease-in-out',
        ...props.sx,
        ':hover,:focus': {
          color: 'accent',
          boxShadow: '0 0 0 3px',
          outline: 'none'
        }
      }}
    >
      <svg
        viewBox="0 0 32 32"
        width="24"
        height="24"
        fill="currentcolor"
        sx={{
          display: 'block'
        }}
      >
        <circle
          cx="16"
          cy="16"
          r="14"
          fill="none"
          stroke="currentcolor"
          strokeWidth="4"
        />
        <path d="M 16 0 A 16 16 0 0 0 16 32 z" />
      </svg>
    </button>
  )
}

export default () => (
  <Box as="header" sx={{ bg: 'primary', textAlign: 'center', px: 2, py: 3 }}>
    <Flex
      variant="container"
      sx={{
        color: 'white',
        alignItems: 'center'
      }}
    >
      <Icon glyph="payment-docs" size={36} sx={{ mr: 1, mb: -2 }} />
      <Text sx={{ fontWeight: 'bold', fontSize: 1 }}>Gun Funded</Text>
      <ColorSwitcher sx={{ ml: 'auto' }} />
    </Flex>
  </Box>
)
