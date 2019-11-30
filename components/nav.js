/** @jsx jsx */
import { jsx, Styled, useColorMode } from 'theme-ui'
import {
  Flex,
  Box,
  Text,
  Link as A,
  IconButton,
  NavLink
} from '@theme-ui/components'
import Link from 'next/link'
import { Moon } from 'react-feather'

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
      <Moon size={24} />
    </IconButton>
  )
}

export default () => {
  const [mode] = useColorMode()
  return (
    <Box
      as="nav"
      sx={{
        bg: mode === 'dark' ? 'darkless' : 'red',
        color: 'nav',
        textAlign: 'center',
        px: 2,
        py: 3
      }}
      key="nav"
    >
      <Flex variant="container" sx={{ alignItems: 'center' }}>
        <Link href="/">
          <a sx={{ color: 'inherit', fontSize: 1, fontWeight: 'bold' }}>
            Gun Funded
          </a>
        </Link>
        <ColorSwitcher sx={{ ml: 'auto' }} />
      </Flex>
    </Box>
  )
}
