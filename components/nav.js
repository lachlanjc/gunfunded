/** @jsx jsx */
import {
  jsx,
  useColorMode,
  Box,
  Container,
  IconButton,
  Text,
  NavLink
} from 'theme-ui'
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
        py: 3
      }}
      key="nav"
    >
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          a: {
            fontSize: 1,
            color: mode === 'dark' ? 'red' : 'white',
            textDecoration: 'none',
            mr: [3, 4],
            ':focus,:hover': { color: mode === 'dark' ? 'red' : 'white' }
          }
        }}
      >
        <Link href="/" passHref>
          <Text
            as="a"
            variant="logo"
            sx={{
              flex: '1 1 auto'
            }}
          >
            Gun&nbsp;Funded
          </Text>
        </Link>
        <Link href="/states" passHref>
          <NavLink>States</NavLink>
        </Link>
        <Link href="/contributors" passHref>
          <NavLink>PACs</NavLink>
        </Link>
        <Link href="/about" passHref>
          <NavLink>About</NavLink>
        </Link>
        <ColorSwitcher />
      </Container>
    </Box>
  )
}
