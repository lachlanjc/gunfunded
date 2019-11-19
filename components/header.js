/** @jsx jsx */
import { jsx, Styled, useColorMode } from 'theme-ui'
import { Flex, Box, Text, Link as A, IconButton, NavLink } from '@theme-ui/components'
import Link from 'next/link'
import Icon from '../components/icon'

const ColorSwitcher = props => {
  const [mode, setMode] = useColorMode()
  return (
    <IconButton
      {...props}
      onClick={e => setMode(mode === 'dark' ? 'light' : 'dark')}
      title="Cycle Color Mode"
      sx={{
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
    </IconButton>
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
      <Link href="/">
        <NavLink sx={{ color: 'inherit', fontSize: 1 }}>Gun Funded</NavLink>
      </Link>
      <ColorSwitcher sx={{ ml: 'auto' }} />
    </Flex>
  </Box>
)
