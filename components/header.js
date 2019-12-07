import { useColorMode } from 'theme-ui'
import { Box, Container, Heading } from '@theme-ui/components'

export default ({ centered = false, title, desc, children, ...props }) => {
  const [mode] = useColorMode()
  return (
    <Box
      as="header"
      sx={{
        bg: mode === 'dark' ? 'darkless' : 'red',
        pt: 4,
        pb: [4, 5],
        px: [2, 3],
        textAlign: centered && 'center'
      }}
    >
      <Container>
        <Heading
          as="h1"
          variant="title"
          sx={{ color: mode === 'dark' ? 'red' : 'white' }}
          children={title}
        />
        {desc && (
          <Heading
            as="h2"
            variant="subtitle"
            sx={{
              mt: 3,
              color: 'snow',
              maxWidth: 576,
              mx: centered ? 'auto' : null
            }}
            children={desc}
          />
        )}
        {children}
      </Container>
    </Box>
  )
}
